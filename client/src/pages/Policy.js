import React from "react";
import Layout from "../Components/Layouts/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "60%" }}
          />
        </div>
        <div className="col-md-4">
          <p style={{ textAlign: "justify" }}>At MobiMart, we are committed to protecting the privacy and security of our users. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you use our ecommerce app. By accessing or using our app, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.</p>
          <br />
          <p>As it is just for project purpose don't pay with your real debit or credit card.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
