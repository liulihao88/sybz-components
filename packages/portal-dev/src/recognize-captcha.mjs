import { createCanvas, loadImage } from '@napi-rs/canvas'
import { createWorker, PSM } from 'tesseract.js'

const CAPTCHA_PATTERN = /^[A-Z0-9]{4}$/

export async function recognizeCaptcha(source) {
  const image = await loadImage(source)
  const { width, height } = image
  const input = createCanvas(width, height)
  const context = input.getContext('2d')
  context.drawImage(image, 0, 0, width, height)
  const pixels = context.getImageData(0, 0, width, height)
  const mask = new Uint8Array(width * height)
  for (let index = 0; index < mask.length; index += 1) {
    const offset = index * 4
    const brightness = pixels.data[offset] * 0.299 + pixels.data[offset + 1] * 0.587 + pixels.data[offset + 2] * 0.114
    mask[index] = brightness > 150 ? 1 : 0
  }
  const opened = dilate(erode(mask, width, height), width, height)
  const scale = 4
  const padding = 12
  const output = createCanvas(width * scale + padding * 2, height * scale + padding * 2)
  const outputContext = output.getContext('2d')
  outputContext.fillStyle = '#fff'
  outputContext.fillRect(0, 0, output.width, output.height)
  outputContext.fillStyle = '#000'
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (opened[y * width + x]) outputContext.fillRect(padding + x * scale, padding + y * scale, scale, scale)
    }
  }

  const worker = await createWorker('eng')
  try {
    await worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      tessedit_pageseg_mode: PSM.SINGLE_WORD,
    })
    const { data } = await worker.recognize(output.toBuffer('image/png'))
    const result = data.text.toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (!CAPTCHA_PATTERN.test(result)) throw new Error(`验证码识别结果无效：${JSON.stringify(data.text)}`)
    return result
  } finally {
    await worker.terminate()
  }
}

const erode = (mask, width, height) => {
  const result = new Uint8Array(mask.length)
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x
      result[index] =
        mask[index] && mask[index - 1] && mask[index + 1] && mask[index - width] && mask[index + width] ? 1 : 0
    }
  }
  return result
}

const dilate = (mask, width, height) => {
  const result = new Uint8Array(mask.length)
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x
      result[index] =
        mask[index] || mask[index - 1] || mask[index + 1] || mask[index - width] || mask[index + width] ? 1 : 0
    }
  }
  return result
}
