const express = require("express");
const router = express.Router();

const form_control = require("../controllers/formController");


router.get("/form" , form_control.fetchForms);

router.get("/form/:id" , form_control.fetchFormPer);

router.post("/form" , form_control.newForm);

router.put('/form/:id' , form_control.updateForm);

router.delete('/form/:id' , form_control.deleteForm);

module.exports = router;