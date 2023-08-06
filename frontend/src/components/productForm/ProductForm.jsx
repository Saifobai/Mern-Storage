import React from "react";
import "./productForm.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../card/Card";

const ProductForm = ({
  product,
  productImg,
  showImg,
  description,
  setDescription,
  handelInputChanged,
  handleImgChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImgChange(e)}
              className="product-image-input" // Added class for styling
            />
            {showImg !== null ? (
              <div className="product-image-preview">
                {" "}
                {/* Added class for styling */}
                <img
                  src={showImg}
                  alt="..."
                  className="product-preview-image"
                />{" "}
                {/* Added class for styling */}
              </div>
            ) : (
              <p>No image set for this product</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={product?.name}
            onChange={handelInputChanged}
            className="product-input" // Added class for styling
          />

          <label>Product Category:</label>
          <input
            type="text"
            name="category" // Corrected the name attribute
            placeholder="Product category"
            value={product?.category}
            onChange={handelInputChanged}
            className="product-input" // Added class for styling
          />

          <label>Product Price:</label>
          <input
            type="text"
            name="price"
            placeholder="Product price"
            value={product?.price}
            onChange={handelInputChanged}
            className="product-input" // Added class for styling
          />

          <label>Product Quantity:</label>
          <input
            type="text"
            name="quantity"
            placeholder="Product quantity"
            value={product?.quantity}
            onChange={handelInputChanged}
            className="product-input" // Added class for styling
          />
          <label>Product:description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
            className="product-description-editor" // Added class for styling
          />
          <div>
            <button type="submit" className="btn btn__save">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
