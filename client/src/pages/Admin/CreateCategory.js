import React from 'react'
import { useState } from 'react'
import AdminMenu from '../../Components/Layouts/AdminMenu'
import Layout from '../../Components/Layouts/Layout'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useEffect } from 'react'
import CategoryForm from '../../Components/Form/CategoryForm'
import { Modal } from 'antd';

const CreateCategory = () => {

  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/v1/category/create-category', {
        name
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("")
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in input form')
    }
  }

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category")
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting category')
    }
  }

  // delete category
  const deleteCategory = async (id) => {
    try {
      const { data } = await axios
        .delete(`/api/v1/category/delete-category/${id}`)
      console.log(id)
      if (data?.success) {
        toast.success("category is deleted")
        getAllCategory();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong while deleting category')
    }
  }

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      console.log(e)
      const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName })
      if (data.success) {
        toast.success("Category name changed successfully")
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      };
    } catch (error) {
      toast.error('Something went wrong while updating category')
    }
  }

  useEffect(() => {
    getAllCategory();
  }, [])

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">

        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Manage Category</h2>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c, id) => {
                    return <tr key={id}>
                      <th scope="row">{id + 1}</th>
                      <td>{c?.name}</td>
                      <td>
                        <button className="btn btn-primary ms-2" onClick={() => {
                          setVisible(true); setUpdatedName(c?.name); setSelected(c)
                        }}>Edit</button>
                        <button className="btn btn-danger ms-2" onClick={() => { deleteCategory(c?._id) }}>Delete</button>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory