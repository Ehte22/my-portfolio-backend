const asyncHandler = require('express-async-handler')
const Project = require('../models/Project')
const upload = require('../utils/upload')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { generateToken } = require('../utils/generateToken')
const cloudinary = require('../utils/uploadConfig')
const Skill = require('../models/Skill')

exports.getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find()
    res.status(200).json({ message: 'Projects Get Successfully', result: projects })
})

exports.addProject = asyncHandler(async (req, res) => {
    upload(req, res, async err => {
        const { title } = req.body

        const project = await Project.findOne({ title })
        if (project) {
            return res.status(400).json({ message: 'Project Already Exist' })
        }

        if (err) {
            return res.status(400).json({ message: err.message || 'Upload error' })
        }

        const { secure_url } = await cloudinary.uploader.upload(req.file.path)

        await Project.create({ ...req.body, image: secure_url })
        res.status(200).json({ message: 'Project Add Successfully' })
    })

})

exports.updateProject = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        const { id } = req.params

        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        let imageUrl

        if (req.file) {
            const file = req.file

            try {
                const publicId = project.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);

                const { secure_url } = await cloudinary.uploader.upload(file.path);

                imageUrl = secure_url;
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload new image', error: error.message });
            }
        }
        await Project.findByIdAndUpdate(
            id,
            { ...req.body, image: imageUrl },
        );

        res.status(200).json({ message: 'Project Update Successfully' });
    });

})

exports.deleteProject = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const project = await Project.findById(id);

    if (project.image) {
        const ImageId = project.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(ImageId);
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: 'Project Delete Successfully' })
})

exports.getSkills = asyncHandler(async (req, res) => {
    const skills = await Skill.find()
    res.status(200).json({ message: 'Skills Get Successfully', result: skills })
})

exports.addSkill = asyncHandler(async (req, res) => {
    const { skill } = req.body

    const isExist = await Skill.findOne({ skill })
    if (isExist) {
        return res.status(400).json({ message: 'Skill already exist' })
    }

    await Skill.create(req.body)

    res.status(200).json({ message: 'Skill Add Successfully' })
})

exports.updateSkill = asyncHandler(async (req, res) => {
    const { id } = req.params

    await Skill.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: 'Skill Update Successfully' })
})

exports.deleteSkill = asyncHandler(async (req, res) => {
    const { id } = req.params

    await Skill.findByIdAndDelete(id)
    res.status(200).json({ message: 'Skill Delete Successfully' })
})