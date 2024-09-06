import React from 'react'
import ScareCrow from '../assets/scareCrow.png'
import { Link } from 'react-router-dom'
import './styles/Error.css'
const ErrorPage = () => {
  return (
    <div className='all'>
       <h1 className="nav">404 Not found</h1>
       <div className="display">
      <div className="display__img">
        <img src={ScareCrow} alt="404-Scarecrow" />
      </div>
      <div className="display__content">
        <h2 className="display__content--info">I have bad news for you</h2>
        <p className="display__content--text">
          The page you are looking for might be temporarily
          unavailable or you are accessing something you shouldn't
        </p>
        <Link  to="/"><div className="btn">Back to homepage</div></Link>
      </div>
    </div>
    </div>
  )
}

export default ErrorPage
