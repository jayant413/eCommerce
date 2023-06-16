import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {Toaster} from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children , title , description ,keywords,author}) => {
  return (
    <div>
      <HelmetProvider>

      <Helmet>
        <meta charSet='utf-8'/>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      </HelmetProvider>
      <Header/>
      <main style={{minHeight : '72vh'}}>
      <Toaster/>
      {children}
      </main>
      <Footer/>
    </div>
  )
}


Layout.defaultProps ={
  title : "Ecommerce app - shop now",
  description : "mern stack project",
  keywords : "mern, react , node, mongodb",
  author : "JS_yt"
}

export default Layout
