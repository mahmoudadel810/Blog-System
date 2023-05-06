import { Router } from 'express';
import * as blogcontroller from './blog.Controller.js'
import Auth from '../../middelWares/Auth.js';

const router = Router();



router.post('/addblog', Auth(), blogcontroller.addblog);
router.put('/updateBlog', Auth(), blogcontroller.updateBlog)
router.delete('/deleteblog', Auth(), blogcontroller.Deleteblog);
router.get('/getAllProductsWithOwners', blogcontroller.getAllProductsWithOwners)
router.get('/getblog/:_id', Auth(), blogcontroller.getblogById)







export default router;