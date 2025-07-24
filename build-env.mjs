import fs from 'fs'
import { ip } from 'address'

let envTemplate = fs.readFileSync(`${process.cwd()}/.env.template`, 'utf-8')
envTemplate = envTemplate.replace(/<OWN_IP>/g, ip())
fs.writeFileSync(`${process.cwd()}/.env`, envTemplate)
