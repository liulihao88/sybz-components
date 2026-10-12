import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createCanvas } from '@napi-rs/canvas'
import { recognizeCaptcha } from '../src/recognize-captcha.mjs'

const captcha = ({ background, text, line }) => {
  const canvas = createCanvas(132, 42)
  const context = canvas.getContext('2d')
  context.fillStyle = background
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = line
  context.lineWidth = 1
  context.beginPath()
  context.moveTo(2, 33)
  context.lineTo(129, 8)
  context.stroke()
  context.fillStyle = text
  context.font = '26px Arial'
  context.fillText('KGE6', 19, 30)
  return canvas.toBuffer('image/png')
}

test('原有深色验证码仍按四位识别', async () => {
  const image = captcha({ background: '#ffffff', text: '#1b1b1b', line: '#ffffff' })
  assert.equal(await recognizeCaptcha(image), 'KGE6')
})

test('浅蓝背景和干扰线的验证码可在自定义网站识别', async () => {
  const image = captcha({ background: '#eef2ff', text: '#879fd1', line: '#c2cdef' })
  assert.equal(await recognizeCaptcha(image, { flexibleLength: true }), 'KGE6')
})
