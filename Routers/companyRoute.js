const express = require('express');
const { createCompany, aggegarteCompany, aggregateCompanyPagination } = require('../Controllers/companyController.js');
const router = express.Router();



router.post('/add-company',createCompany);
router.get('/aggegrate-company',aggegarteCompany);
router.get('/aggerate-page-company',aggregateCompanyPagination);




module.exports = router