const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
    {
    title: { 
      type: String,
      required: true,
    },
    category: { 
      type: String,
      required: true,
    },
    summary: { 
      type: String,
      required: true, 
    },
    description: {
      type: String,
      required: true,
    },
    technologies: [
      {
        name: { type: String, required: true },
      },
    ],
    feature: [
      {
        name: { type: String, required: true },
      },
    ],
    liveDemoUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
      default:"https://github.com/merzkan",
    },
    isPublished: {
      type: Boolean,
      default: true, 
    },
    },{timestamps: true, } 
);


const Project = mongoose.model("Project",ProjectSchema);

module.exports = Project;