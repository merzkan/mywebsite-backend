const Blog = require("../models/blog");

const getBlogs = async (req,res) => {
    try{
        const Blogs = await Blog.find({});
        res.json(Blogs);
    }catch (error) {
    res.status(500).json({ 
            message: "Bloglar getirelemedi.", 
            details: error.message 
        });
  }
}

const getBlogById = async (req,res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(blog){
            res.json(blog);
        }else{
            res.status(404).json({message:"Blog bulunamadı."});
        }
    }catch(error){
        res.status(500).json({ 
            message: "Blog getirilemedi.", 
            details: error.message 
        });
    }
}

const createBlog = async (req,res) => {
    try{
        const { title, category, coverImageUrl, author, summary, content, isPublished, readingTime } = req.body;
        const blog = new Blog({ title, category, coverImageUrl, author, summary, content, isPublished, readingTime });
        
        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    }catch (error) {
        res.status(500).json({ 
            message: "Blog oluşturulurken bir hata oluştu.", 
            details: error.message 
        });
    }
    
}

const deleteBlog = async (req,res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if(blog){
            await blog.deleteOne({_id:req.params.id})
            res.json({ message: 'Blog başarıyla silindi' });
        }else {
            res.status(404).json({ message: 'Blog bulunamadı' });
        }

    } catch (error) {
        res.status(500).json({ 
            message: "Blog silinirken bir hata oluştu.", 
            details: error.message 
        });
    }
}

const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } 
        );

        if (updatedBlog) {
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog bulunamadı' });
        }

    } catch (error) {
        res.status(500).json({ 
            message: "Blog güncellenirken bir hata oluştu.", 
            details: error.message 
        });
    }
}

module.exports = { 
    getBlogs, 
    getBlogById,
    createBlog,
    deleteBlog,
    updateBlog
};