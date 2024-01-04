import { cronJobsFolderPath, cronJobsJson } from '../config/path'
import fs from 'fs'

export function validateFolder (): void {
  if (!fs.existsSync(cronJobsFolderPath)) {
    fs.mkdirSync(cronJobsFolderPath, { recursive: true })
  }
  if (!fs.existsSync(cronJobsJson)) {
    const jobs = {
      cronJobs: []
    }
    fs.writeFileSync(
      cronJobsJson,
      JSON.stringify(jobs),
      'utf-8'
    )
  }
}
