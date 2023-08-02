const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpLoad");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;

    //validation
    if (!name || !sku || !category || !quantity || !price || !description) {
        res.status(400);
        throw new Error("Please fill all the field");
    }

    //Image Upload handler
    let fileData = {};
    if (req.file) {
        //upload to cloudinary
        let uploadedFile;

        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Storage App",
                resource_type: "image",
            });
        } catch (error) {
            res.status(500);
            throw new Error("image could not be uploaded");
        }

        fileData = {
            filename: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };
    }

    // create product
    const product = await Product.create({
        user: req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
    });
    res.status(201).json(product);
});

// get all the products
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user.id }).sort("-createdAt");
    res.status(200).json(products);
});

//get single product
const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    // if no product is found
    if (!product) {
        res.status(404);
        throw new Error("product not found");
    }

    // connect the product with user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    res.status(200).json(product);
});

// delete single product
const deleteSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    // if no product is found
    if (!product) {
        res.status(404);
        throw new Error("product not found");
    }

    // connect the product with user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    res.status(200).json({ message: "product deleted successfully" });
});

//update single product
const updateSingleProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;
    const { id } = req.params

    const product = await Product.findById(id);


    // if no product is found
    if (!product) {
        res.status(404);
        throw new Error("product not found");
    }

    // connect the product with user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }


    //Image Upload handler
    let fileData = {};
    if (req.file) {
        //upload to cloudinary
        let uploadedFile;

        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Storage App",
                resource_type: "image",
            });
        } catch (error) {
            res.status(500);
            throw new Error("image could not be uploaded");
        }

        fileData = {
            filename: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };
    }

    // update product

    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
            name,
            category,
            quantity,
            price,
            description,
            image: Object.keys(fileData).length === 0 ? product.image : fileData
        },
        {
            new: true,
            runValidators: true
        }
    )
    res.status(201).json(updatedProduct);


});

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteSingleProduct,
    updateSingleProduct,
};
