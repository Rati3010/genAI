import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home-button'>
        <Link className='button' to={"/generate"}>Generate Text</Link>
        <Link className='button' to={"/summarize"}>Summarize</Link>
        <Link className='button' to={"/sentiment"}>Sentiment</Link>
    </div>
  )
}

export default Home