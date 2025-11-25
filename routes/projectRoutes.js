const express =require("express");
const {getProjects, getProjectById, createProject, deleteProject, updateProject} = require("../controllers/projectController");
const {verifyTokenAndAdmin} = require("../middleware/verifyToken")

const router = express.Router();

router.route('/create').post(verifyTokenAndAdmin,createProject)
router.route('/').get(getProjects);

router.route('/:id')
    .get(getProjectById)    
    .put(verifyTokenAndAdmin,updateProject)
    .delete(verifyTokenAndAdmin,deleteProject);

module.exports = router;