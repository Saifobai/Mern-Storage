import React, { useState } from "react";
import ProductForm from "../../components/productForm/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });
  const [productImg, setProductImg] = useState("");
  const [showImg, setShowImg] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, category, quantity, price } = product;

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImgChange = (e) => {
    setProductImg(e.target.files[0]);
    setShowImg(URL.createObjectURL(e.target.files[0]));
  };

  const skuGeneration = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", skuGeneration(category));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", productImg);

    console.log(...formData);

    await dispatch(createProduct(formData));
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}

      <h2 className=""> Add new product</h2>
      <ProductForm
        product={product}
        productImg={productImg}
        showImg={showImg}
        description={description}
        setDescription={setDescription}
        handelInputChanged={handelInputChange}
        handleImgChange={handleImgChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
