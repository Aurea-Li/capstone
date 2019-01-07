import React from 'react'
import { Link } from 'react-router-dom'

const FrontPage = (props) => {
  return (
    <div className="container">
      <Link to='/signin' className="btn btn-primary">Sign In</Link>
      <Link to='/signup' className="btn btn-primary">Sign Up</Link>
    </div>
  )
}

export default FrontPage
