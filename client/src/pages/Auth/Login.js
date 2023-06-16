import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../../Components/Layouts/Layout'
import Axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../styles/AuthStyles.css'
import { useDispatch } from 'react-redux'
import { setAuthData, } from '../../store/slices/auth'

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post(`/api/v1/auth/login`, { email, password })
    try {
      if (res && res.data.success) {
        toast.success(res.data.message)
        dispatch(setAuthData({
          user: res.data.user,
          token: res.data.token
        }))
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate(location.state || "/");
      }
    } catch (error) {
      toast.success(res.data.error)
    }
  }

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Log In</h1>
          <div className="mb-3">
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required id="exampleInputEmail" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required id="exampleInputPassword" placeholder="Enter your password" />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Log In</button>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => navigate("/forgot-password")}>Forgotten password </button>
        </form>

      </div>
    </Layout>
  )
}

export default Register
