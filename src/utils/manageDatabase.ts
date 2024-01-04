import fs from 'fs'
import { cronJobsJson } from '../config/path'

export interface CronJob {
  url: string
  config: string
}

export function manageDatabase (data: CronJob): CronJob[] {
  try {
    if (!fs.existsSync(cronJobsJson)) {
      const jobs = {
        cronJobs: [data]
      }
      fs.writeFileSync(
        cronJobsJson,
        JSON.stringify(jobs),
        'utf-8'
      )
      return jobs.cronJobs
    } else {
      const currentDatabase = fs.readFileSync(cronJobsJson, 'utf-8')
      if (currentDatabase === '') {
        const jobs = {
          cronJobs: [data]
        }
        fs.writeFileSync(
          cronJobsJson,
          JSON.stringify(jobs),
          'utf-8'
        )
        return jobs.cronJobs
      }
      const parsedDatabase: { cronJobs: CronJob[] } = JSON.parse(currentDatabase)
      parsedDatabase.cronJobs.push(data)
      fs.writeFileSync(
        cronJobsJson,
        JSON.stringify(parsedDatabase),
        'utf-8'
      )
      return parsedDatabase.cronJobs
    }
  } catch (error) {
    console.error(error)
    return []
  }
}
