const express =require("express");
const {getBlogs, getBlogById, createBlog, deleteBlog, updateBlog} = require("../controllers/blogController");
const {verifyTokenAndAdmin} = require("../middleware/verifyToken")

const router = express.Router();

router.route('/create').post(verifyTokenAndAdmin,createBlog)
router.route('/').get(getBlogs);

router.route('/:id')
    .get(getBlogById)    
    .put(verifyTokenAndAdmin,updateBlog)
    .delete(verifyTokenAndAdmin,deleteBlog);

module.exports = router;