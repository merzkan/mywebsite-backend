const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
    {
    title: { 
      type: String,
      required: true, 
    },
    category: { 
        type: String,
        required: true, 
    },
    coverImageUrl: { 
        type: String,
        default: '/logo.png'
    },
    author: {
        name: { type: String, required: true },
        role: { type: String, }, 
        initials: { type: String, required: true, default: 'Y' }, 
        _id: false 
        },
    summary: { 
        type: String,
        required: true, 
    },
    content: { 
        type: String,
        required: true, 
    },
    isPublished: {
        type: Boolean,
        default: true, 
    },
    readingTime:{
        type: String,
    },
    },{timestamps: true, } 
);


const Blog = mongoose.model("Blog",BlogSchema);

module.exports = Blog;