import React from "react";
import Layout from "../Components/Layouts/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2 " style={{ textAlign: "justify" }}>
            An ecommerce website is a website that facilitates the buying and selling of goods and services online. Here are some important details to consider when building an ecommerce website:

            Platform: Choose a suitable ecommerce platform such as Shopify, Magento, WooCommerce, etc. that suits your business needs.

            Domain name and hosting: Register a domain name and choose a hosting plan that meets your requirements.

            Design and User Experience (UX): Create a user-friendly design and layout that is easy to navigate, visually appealing, and provides a seamless shopping experience for customers.

            Products and Catalogue: Create an inventory of products that you want to sell on your ecommerce website. Organize them into categories and subcategories for easy navigation.

            Payment Gateway: Integrate a secure payment gateway that supports multiple payment methods such as credit cards, debit cards, e-wallets, and net banking.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
