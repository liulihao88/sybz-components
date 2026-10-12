import { createCanvas, loadImage } from '@napi-rs/canvas'
import { createWorker, PSM } from 'tesseract.js'

const CAPTCHA_PATTERN = /^[A-Z0-9]{4}$/

export async function recognizeCaptcha(source, { flexibleLength = false } = {}) {
  const image = await loadImage(source)
  const { width, height } = image
  const input = createCanvas(width, height)
  const context = input.getContext('2d')
  context.drawImage(image, 0, 0, width, height)
  const pixels = context.getImageData(0, 0, width, height)
  const mask = new Uint8Array(width * height)
  const blueMask = flexibleLength ? new Uint8Array(mask.length) : undefined
  for (let index = 0; index < mask.length; index += 1) {
    const offset = index * 4
    const red = pixels.data[offset]
    const green = pixels.data[offset + 1]
    const blue = pixels.data[offset + 2]
    const brightness = red * 0.299 + green * 0.587 + blue * 0.114
    mask[index] = brightness > 150 ? 1 : 0
    if (blueMask) blueMask[index] = blue > red + 16 && blue > green + 8 && red < 205 && green < 215 ? 1 : 0
  }
  const scale = 4
  const padding = 12
  const render = (foreground, opening = true) => {
    const pixelsToDraw = opening ? dilate(erode(foreground, width, height), width, height) : foreground
    const output = createCanvas(width * scale + padding * 2, height * scale + padding * 2)
    const outputContext = output.getContext('2d')
    outputContext.fillStyle = '#fff'
    outputContext.fillRect(0, 0, output.width, output.height)
    outputContext.fillStyle = '#000'
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (pixelsToDraw[y * width + x]) outputContext.fillRect(padding + x * scale, padding + y * scale, scale, scale)
      }
    }
    return output.toBuffer('image/png')
  }
  const renderOriginal = () => {
    const output = createCanvas(width * scale + padding * 2, height * scale + padding * 2)
    const outputContext = output.getContext('2d')
    outputContext.fillStyle = '#fff'
    outputContext.fillRect(0, 0, output.width, output.height)
    outputContext.drawImage(image, padding, padding, width * scale, height * scale)
    return output.toBuffer('image/png')
  }

  const worker = await createWorker('eng')
  try {
    await worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      tessedit_pageseg_mode: PSM.SINGLE_WORD,
    })
    let lastText = ''
    const candidates = blueMask ? [render(mask), renderOriginal(), render(blueMask, false)] : [render(mask)]
    for (const candidate of candidates) {
      const { data } = await worker.recognize(candidate)
      lastText = data.text
      const result = data.text.toUpperCase().replace(/[^A-Z0-9]/g, '')
      if (flexibleLength ? /^[A-Z0-9]{3,8}$/.test(result) : CAPTCHA_PATTERN.test(result)) return result
    }
    throw new Error(`验证码识别结果无效：${JSON.stringify(lastText)}`)
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
