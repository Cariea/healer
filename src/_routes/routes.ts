import { Router, Request, Response } from 'express'
import { addCron } from '../actions/add'
import { deleteCron } from '../actions/delete'
import { getAll } from '../actions/get'

import { schemaGuard } from '../middleware/schemaGuard'
import { addSchema } from '../actions/add.schema'

export const router = Router()

router.get('/test', (req: Request, res: Response) => {
  console.log('test')
  res.status(200).json({ message: 'todo piola' })
})

router.get('/get', getAll)
router.post('/add', schemaGuard(addSchema), addCron)
router.delete('/delete', deleteCron)
export default router
