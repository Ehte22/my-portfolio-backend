const router = require('express').Router()
const adminController = require('../controllers/adminController')
const { protectedRoute } = require('../utils/protected')

router
    .get('/get-projects', adminController.getProjects)
    .post('/add-project', protectedRoute, adminController.addProject)
    .put('/update-project/:id', protectedRoute, adminController.updateProject)
    .delete('/delete-project/:id', protectedRoute, adminController.deleteProject)

    .get('/get-skills', adminController.getSkills)
    .post('/add-skill', protectedRoute, adminController.addSkill)
    .put('/update-skill/:id', protectedRoute, adminController.updateSkill)
    .delete('/delete-skill/:id', protectedRoute, adminController.deleteSkill)

module.exports = router