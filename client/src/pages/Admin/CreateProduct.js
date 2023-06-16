import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("photo", photo);

      const { data } = axios.post("/api/v1/product/create-product", productData);

      if (data?.success) {
        toast.success("Product created successfully");
        // navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3 "
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => {
                  return (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  );
                })}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-11">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
                <div className="mb-3 col-md-11">
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter product name"
                    calssName="form-control "
                    style={{
                      width: "100%",
                      border: "solid 1px gray",
                      borderRadius: "6px",
                      padding: "6px",
                      outline: "none",
                    }}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3 col-md-11">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Enter product description"
                    calssName="form-control "
                    style={{
                      width: "100%",
                      border: "solid 1px gray",
                      borderRadius: "6px",
                      padding: "6px",
                      outline: "none",
                    }}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3 col-md-11">
                  <input
                    type="number"
                    value={price}
                    placeholder="Enter produt price"
                    calssName="form-control "
                    style={{
                      width: "100%",
                      border: "solid 1px gray",
                      borderRadius: "6px",
                      padding: "6px",
                      outline: "none",
                    }}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3 col-md-11">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Enter produt quantity"
                    calssName="form-control "
                    style={{
                      width: "100%",
                      border: "solid 1px gray",
                      borderRadius: "6px",
                      padding: "6px",
                      outline: "none",
                    }}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3 col-md-11">
                  <input
                    type="text"
                    value={category}
                    disabled
                    placeholder="Enter product category"
                    calssName="form-control "
                    style={{
                      width: "100%",
                      border: "solid 1px gray",
                      borderRadius: "6px",
                      padding: "6px",
                      outline: "none",
                    }}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3 col-md-11 ">
                  <Select
                    size="large"
                    defaultValue="disabled"
                    style={{ cursor: "pointer" }}
                    calssName="form-select mb-3 "
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    options={[
                      { value: "0", label: "No" },
                      { value: "1", label: "Yes" },
                      { value: "disabled", label: "Choose shipping" },
                    ]}
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleCreate}>
                    <Link to="/dashboard/admin/products"
                      style={{ color: "white", textDecoration: "none" }}>
                      CREATE PRODUCT
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
