import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../Components/Layouts/Layout'
import UserMenu from '../../Components/Layouts/UserMenu'

const Dashboard = () => {

  const authData = useSelector((state) => state.authS)

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Name : {authData?.user?.name}</h3>
              <h3>Email : {authData?.user?.email}</h3>
              <h3>Address : {authData?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
        
    </Layout>
  )
}

export default Dashboard
