import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../../context/cart'
import useCategory from '../../Hooks/useCategory'
import { setAuthData } from '../../store/slices/auth'
// import SearchInput from '../Form/SearchInput'
import { Badge } from 'antd'
import { BiSearch } from 'react-icons/bi'
import { AiOutlineMenu } from 'react-icons/ai'
import { HiArrowCircleDown, HiArrowCircleRight } from 'react-icons/hi'
import "./styles/Header.scss"
import axios from 'axios'
import { setSearch } from '../../store/slices/search'

const NavMenu = ({ cart, categories, authData }) => {
  const [showCat, setShowCat] = useState(false)
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setAuthData({
      user: null, token: ''
    }))
    localStorage.removeItem('auth')
    toast.success("Logout Successfully")
  }
  return (
    <ul >
      <li>
        <NavLink to="/" className="nv-right-link">
          Home
        </NavLink>
      </li>
      <li>
        <span className="nv-right-link-cat" onClick={() => { setShowCat(!showCat) }}>
          Categories <HiArrowCircleDown className="nv-right-link-cat-icon" />
          <HiArrowCircleRight className="nv-right-link-cat-icon-mob" />
          {showCat ? <ul>
            <li>
              <NavLink to="/categories"
                className="nv-right-link-cats">
                All Categories
              </NavLink>
            </li>
            {categories?.map((c, i) => (
              <li key={i}>
                <Link
                  className="nv-right-link-cats"
                  to={`/category/${c.slug}`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul> : ""}
        </span>
      </li>
      {!authData.user ? (
        <><li>
          <NavLink to="/register" className="nv-right-link">
            Register
          </NavLink>
        </li>
          <li >
            <NavLink to="/login" className="nv-right-link">
              LogIn
            </NavLink>
          </li>
        </>
      ) : (<> <li >
        <NavLink to="/login" className="nv-right-link" onClick={handleLogout}>
          LogOut
        </NavLink>
      </li></>)}
      <li >
        <Badge count={cart?.length} showZero>
          <NavLink to="/cart" className='nv-right-link'>
            Cart
          </NavLink>
        </Badge>
      </li>
    </ul>
  )
}

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [cart] = useCart();
  const authData = useSelector((state) => state.authS)
  const categories = useCategory();
  const dispatch = useDispatch();


  // const handleLogout = () => {
  //   dispatch(setAuthData({
  //     user: null, token: ''
  //   }))
  //   localStorage.removeItem('auth')
  //   toast.success("Logout Successfully")
  // }

  const values = useSelector((state) => state.search)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.keyword === "") return;
    try {
      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`
      );
      dispatch(setSearch({ keyword: values.keyword, results: data }));
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="nv">
        <div className={` ${mobileMenu ? "nv-right-mobileview" : "nv-right-mobileview-hide"}`}>
          <NavMenu cart={cart} categories={categories} authData={authData} />
        </div>
        <div className="nv-left" onClick={() => { dispatch(setSearch({ keyword: "", results: [] })) }}>
          <Link to="/" className="nv-left-logo" >MobiMart</Link>
        </div>
        <form className="nv-search" role="search" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search here"
            value={values.keyword}
            onChange={(e) => dispatch(setSearch({ keyword: e.target.value, results: values.results }))} />
          <button><BiSearch className="nv-search-logo" type='' /></button>
        </form>

        <div className={" nv-right "}>
          <NavMenu cart={cart} categories={categories} authData={authData} />
        </div>
        <NavLink className="nv-right-profile" to={`/dashboard/${authData?.user?.role === 1 ? "admin" : "user"}`}>
          <img src="https://www.defineinternational.com/wp-content/uploads/2014/06/dummy-profile.png" alt="" className="nv-right-profile-img" />
        </NavLink>
        <button className="nv-right-mobilemenu" onClick={() => setMobileMenu(!mobileMenu)}>
          <AiOutlineMenu />
        </button>

      </div>

      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand " to="/">🛒 eCommerce App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink className="nav-link " to="/">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c, i) => (
                    <li key={i}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {
                !authData.user ? (<>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                </>) : (

                  <>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        style={{ border: "none" }}
                      >
                        {authData?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            to={`/dashboard/${authData?.user?.role === 1 ? "admin" : "user"
                              }
                          `}
                            className="dropdown-item"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="dropdown-item"
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                )
              }
              <li className="nav-item">
                <Badge count={cart?.length} showZero>

                  <NavLink className="nav-link" to="/cart">Cart</NavLink>
                </Badge>

              </li>
            </ul>
          </div>
        </div>
      </nav> */}


    </>
  )
}

export default Header
{/* <Avatar shape="square" size="large" /> */ }