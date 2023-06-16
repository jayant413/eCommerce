import React, { useState, useEffect, } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";


const { Option } = Select;

const UpdateProduct = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("")

    const navigate = useNavigate();

    const { slug } = useParams();

    // get single product 
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${slug}`)
            setName(data.product.name)
            setId(data.product._id)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setDescription(data.product.description)
            setCategory(data.product.category._id)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }


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
        getSingleProduct();
    }, []);

    // create product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("category", category);
            photo && productData.append("photo", photo);

            const { data } = axios.put(`/api/v1/product/update-product/${id}`, productData);
            // console.log([...productData.entries()])
            if (data?.success) {
                toast.success("Product update successfully");
                // navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    // delete product 

    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ?");
            if (!answer) return;
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`)
            toast.success('Product deleted Successfully')
            navigate('/dashboard/admin/products')
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <Layout title={"Dashboard - Update Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
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
                                value={category}
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
                                {photo ?
                                    (<div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                    ) : (
                                        <div className="text-center">
                                            <img
                                                src={`/api/v1/product/get-product-photo/${id}`}
                                                alt="product_photo"
                                                height={"200px"}
                                                className="img img-responsive"
                                            />
                                        </div>)
                                }
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
                                        value={shipping ? "Yes" : "No"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary m-3" onClick={handleUpdate}>
                                        <Link to="/dashboard/admin/products"
                                            style={{ color: "white", textDecoration: "none" }}>
                                            UPDATE PRODUCT
                                        </Link>
                                    </button>
                                    <button className="btn btn-danger m-3" onClick={handleDelete}>
                                        <Link to="/dashboard/admin/products"
                                            style={{ color: "white", textDecoration: "none" }}>
                                            DELETE PRODUCT
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct