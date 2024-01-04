import fs from 'fs'
import { cronJobsJson } from '../config/path'

export interface CronJob {
  url: string
  config: string
}

export function manageDatabase (data: CronJob): CronJob[] {
  try {
    if (!fs.existsSync(cronJobsJson)) {
      // Si el archivo no existe, crearlo y agregar la nueva data
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
        // Si el archivo está vacío, inicializarlo con la nueva data
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
