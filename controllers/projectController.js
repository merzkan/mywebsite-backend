const Project = require("../models/project");

const getProjects = async (req,res) => {
    try{
        const projects = await Project.find({});
        res.json(projects);
    }catch (error) {
    res.status(500).json({ 
            message: "Projeler getirelemedi.", 
            details: error.message 
        });
  }
}

const getProjectById = async (req,res) => {
    try{
        const project = await Project.findById(req.params.id);
        if(project){
            res.json(project);
        }else{
            res.status(404).json({message:"Proje bulunamadı."});
        }
    }catch(error){
        res.status(500).json({ 
            message: "Proje getirilemedi.", 
            details: error.message 
        });
    }
}

const createProject = async (req,res) => {
    try{
        const{title,category,description,technologies,summary,isPublished,liveDemoUrl, githubUrl, feature} = req.body;
        const project = new Project({ title,category,description,technologies,summary,liveDemoUrl,githubUrl,feature,isPublished});
        
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    }catch (error) {
        res.status(500).json({ 
            message: "Proje oluşturulurken bir hata oluştu.", 
            details: error.message 
        });
    }
    
}

const deleteProject = async (req,res) => {
    try {
        const project = await Project.findById(req.params.id)
        if(project){
            await Project.deleteOne({_id:req.params.id})
            res.json({ message: 'Proje başarıyla silindi' });
        }else {
            res.status(404).json({ message: 'Proje bulunamadı' });
        }

    } catch (error) {
        res.status(500).json({ 
            message: "Proje silinirken bir hata oluştu.", 
            details: error.message 
        });
    }
}
const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (updatedProject) {
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Proje bulunamadı' });
        }
    } catch (error) {
        res.status(500).json({ 
            message: "Proje güncellenirken bir hata oluştu.", 
            details: error.message 
        });
    }
}

module.exports = { 
    getProjects, 
    getProjectById,
    createProject,
    deleteProject,
    updateProject
};