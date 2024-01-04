import { Request, Response } from 'express'
import { cronJobsJson } from '../config/path'
import fs from 'fs'
import { CronJob } from '../utils/manageDatabase'
export const getAll = (req: Request, res: Response): any => {
  try {
    if (fs.existsSync(cronJobsJson)) {
      const currentDatabase = fs.readFileSync(cronJobsJson, 'utf-8')
      if (currentDatabase === '') {
        return res.status(404).json({ message: 'No hay configuraciones para mostrar' })
      }
      const parsedDatabase: { cronJobs: CronJob[] } = JSON.parse(currentDatabase)
      return res.status(200).json(parsedDatabase.cronJobs)
    } else {
      return res.status(404).json({ message: 'No hay configuraciones para mostrar' })
    }
  } catch (error) {
    console.log(error)
  }
}
