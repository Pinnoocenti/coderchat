import {Router} from 'express'

const viewRouters = Router()

viewRouters.get('/', (req,res)=>{
    res.render('index')
})


export default viewRouters