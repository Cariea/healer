import { Request, Response } from 'express'
import { CronJob, manageDatabase } from '../utils/manageDatabase'
export function addCron (req: Request, res: Response): void {
  try {
    const { url, config } = req.body
    const data: CronJob = {
      url,
      config
    }
    const jobs = manageDatabase(data)

    res.status(200).json(jobs)
  } catch (error) {
    console.log(error)
  }
}
