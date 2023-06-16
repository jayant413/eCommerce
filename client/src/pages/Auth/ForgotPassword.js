import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../../Components/Layouts/Layout'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../styles/AuthStyles.css'


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [answer, setAnswer] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post(`/api/v1/auth/forgot-password`, { email, newPassword, answer })
    try {
      if (res && res.data.success) {
        toast.success(res.data.message)

        navigate("/login");
      }
    } catch (error) {
      toast.success(res.data.error)
    }
  }

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">RESET PASSWORD</h1>
          <div className="mb-3">
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required id="exampleInputEmail" placeholder="Enter your email..." />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required id="exampleInputPassword" placeholder="Enter your new password..." />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)} required id="exampleInputAnswer" placeholder="
          Enter your favorite sports..." />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">RESET</button>
          </div>
        </form>

      </div>
    </Layout>
  )
}

export default ForgotPassword
