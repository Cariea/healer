import { Router } from 'express'
import { addCron } from '../actions/add'

export const router = Router()

router.get('/test', (req, res) => {
    res.status(200).json({message: 'todo piola'})
})

router.post('/test2',addCron)

export default router