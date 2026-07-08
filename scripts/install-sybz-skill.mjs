#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const sourceDir = resolve(rootDir, 'skills/sybz-components')
const homeDir = process.env.HOME || process.env.USERPROFILE

if (!homeDir) {
  console.error('Cannot resolve home directory. Set HOME or USERPROFILE first.')
  process.exit(1)
}

const targetRoot = process.argv[2] ? resolve(process.argv[2]) : resolve(homeDir, '.codex/skills')
const targetDir = resolve(targetRoot, 'sybz-components')

if (!existsSync(sourceDir)) {
  console.error(`Skill source not found: ${sourceDir}`)
  process.exit(1)
}

mkdirSync(targetRoot, { recursive: true })
rmSync(targetDir, { recursive: true, force: true })
cpSync(sourceDir, targetDir, { recursive: true })

console.log(`Installed sybz-components skill to ${targetDir}`)
