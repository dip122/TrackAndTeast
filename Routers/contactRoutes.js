const express = require('express');
const { requireSignIn } = require('../Middlewares/authMiddlewares');
const { contactUsController, GetcontactsController, DeleteContactsController } = require('../Controllers/ContactController');
const router = express.Router();

router.post('/contact-us',requireSignIn,contactUsController)
router.get('/getcontact',requireSignIn,GetcontactsController);
router.delete('/delete-contact/:id',requireSignIn,DeleteContactsController);

module.exports = router;