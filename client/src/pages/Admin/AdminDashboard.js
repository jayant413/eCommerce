import React from 'react'
import { useSelector } from 'react-redux'
import AdminMenu from '../../Components/Layouts/AdminMenu'
import Layout from '../../Components/Layouts/Layout'

const AdminDashboard = () => {

  const authData = useSelector((state => state.authS))

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin Name : {authData?.user?.name}</h3>
              <h3>Admin Email : {authData?.user?.email}</h3>
              <h3>Admin Contact : {authData?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard