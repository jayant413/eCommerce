import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../../Components/Layouts/Layout'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import '../../styles/AuthStyles.css'

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [answer, setAnswer] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post(`/api/v1/auth/register`, { name, email, password, phone, address, answer })
    try {
      if (res && res.data.success) {
        toast.success(res.data.message)
        navigate("/login");
      }
    } catch (error) {
      toast.success(res.data.error)
    }
  }

  useEffect(() => {
    console.log(process.env.REACT_APP_API)
  }, [])

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Register</h1>
          <div className="mb-3">
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required id="exampleInputName" placeholder="Enter your name" />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required id="exampleInputEmail" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required id="exampleInputPassword" placeholder="Enter your password" />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required id="exampleInputPhone" placeholder="Enter your phone" />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required id="exampleInputAddress" placeholder="Enter your address" />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)} required id="exampleInputAddress" placeholder="What is your favorite sports" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </div>
    </Layout>
  )
}

export default Register
