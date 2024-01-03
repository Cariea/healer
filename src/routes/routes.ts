import { Router } from 'express'
import { addCron } from '../actions/add'
import { deleteCron } from '../actions/delete'
import { getAll } from '../actions/get'

export const router = Router()

router.get('/test', (req, res) => {
    res.status(200).json({message: 'todo piola'})
})

router.get('/get', getAll)
router.post('/add',addCron)
router.delete('/delete', deleteCron)
export default router