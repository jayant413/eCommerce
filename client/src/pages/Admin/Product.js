import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Product = () => {
    const [products, setProducts] = useState([]);

    // get all Products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something wrent wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout title={"Dashboard - All Product List"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 " >
                        <h2>All Product List</h2>
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => {
                                return (
                                    <Link key={p._id} to={`/dashboard/admin/update-product/${p.slug}`} className="product-link m-2">
                                        <div className="card" style={{ width: "18rem" }} >
                                            <img src={`/api/v1/product/get-product-photo/${p._id}`} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-text">
                                                    {p.description.substring(0, 60)}...
                                                </p>
                                                <a href="#" className="btn btn-primary">
                                                    Update Product Details
                                                </a>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );
};

export default Product;
