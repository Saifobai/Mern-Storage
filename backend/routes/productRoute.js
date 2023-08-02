

const express = require('express')
const { createProduct, getAllProducts, getSingleProduct, deleteSingleProduct, updateSingleProduct } = require('../controllers/productControllers')
const protect = require('../middleware/authMidleWare')
const router = express.Router()
const { upload } = require('../utils/fileUpLoad')


//create product
router.post('/', protect, upload.single("image"), createProduct)

//update single product
router.patch('/:id', protect, upload.single("image"), updateSingleProduct)

// get all the products
router.get('/', protect, getAllProducts)

//get single product
router.get('/:id', protect, getSingleProduct)

//delete single product
router.delete('/:id', protect, deleteSingleProduct)


module.exports = router