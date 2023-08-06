

import axios from "axios";
import { toast } from 'react-toastify'

const BACKEND_URL = "http://localhost:5000";

const API_URL = `${BACKEND_URL}/api/products`


//create a new product
const createSingleProduct = async (formData) => {
    const response = await axios.post(API_URL, formData)
    return response.data
}

const productService = {
    createSingleProduct
}

export default productService