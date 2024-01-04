/* eslint-disable @typescript-eslint/no-floating-promises */
import cron from 'node-cron'
import { cronJobsJson } from './config/path'
import fs from 'fs'
import { CronJob } from './utils/manageDatabase'
import { configs } from './utils/consts'

export const operator = {
  config1: operatorF('1'),
  config2: operatorF('2'),
  config3: operatorF('3'),
  config4: operatorF('4'),
  config5: operatorF('5'),
  config6: operatorF('6')
}

export function operatorF (config: string): void {
  cron.schedule(configs[config], () => {
    const file = fs.readFileSync(cronJobsJson, 'utf-8')
    const parsedDatabase: { cronJobs: CronJob[] } = JSON.parse(file)
    try {
      for (const job of parsedDatabase.cronJobs) {
        if (job.config === config) {
          console.log(`Ejecutandose config ${config}`)
          fetch(job.url)
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
}
