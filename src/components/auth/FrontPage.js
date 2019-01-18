import React from 'react'
import { Link } from 'react-router-dom'
import './FrontPage.css'

const FrontPage = (props) => {
  return (
    <div className="frontpage">
      <Link to='/signin' className="btn btn-primary btn-block">Sign In</Link>
      <Link to='/signup' className="btn btn-primary btn-block">Sign Up</Link>
    </div>
  )
}

export default FrontPage
