import { Request, Response } from 'express'
import fs from 'fs'
import { cronJobsJson } from '../config/path'
import { CronJob } from '../utils/manageDatabase'
export const deleteCron = (req: Request, res: Response): any => {
  try {
    const { url } = req.query
    if (fs.existsSync(cronJobsJson)) {
      const currentDatabase = fs.readFileSync(cronJobsJson, 'utf-8')
      if (currentDatabase === '') {
        return res.status(404).json({ message: 'No hay configuraciones para eliminar para la URL ' })
      }
      const parsedDatabase: { cronJobs: CronJob[] } = JSON.parse(currentDatabase)

      const updatedDatabase = parsedDatabase.cronJobs.filter(job => job.url !== url)
      fs.writeFileSync(
        cronJobsJson,
        JSON.stringify({ cronJobs: updatedDatabase }),
        'utf-8'
      )
      console.log(updatedDatabase)
      return res.status(200).json({ message: `Configuración para la URL '${String(url)}' eliminada.` })
    } else {
      return res.status(404).json({ message: 'No hay configuraciones para eliminar para la URL ' })
    }
  } catch (error) {
    console.log(error)
  }
}
