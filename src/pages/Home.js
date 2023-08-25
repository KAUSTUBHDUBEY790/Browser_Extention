import React from 'react'
import './Home.css'
import { useBrowser } from '../context/browser-context'

function Home() {
  const {browserdispatch} = useBrowser();
  const handleSubmit=(event)=>{
    event.preventDefault();
  }
  const handleevent=(event)=>{
    if(event.key==="Enter"  && event.target.value.length>0)
    {
      browserdispatch({
        type:"NAME",
        payload:event.target.value
      })
      localStorage.setItem("name",event.target.value);
    }
  }
  return (
    <div className='home-container d-flex direction-column align-center gap-lg'>
   <h1 className='main-heading'>Browser Extention</h1>
   <div className='user-detils d-flex direction-column gap'>
    <span className='heading-1'>Hello whats your name?</span>
    <form onSubmit={handleSubmit}>
    <input required className='input' onKeyPress={handleevent}/>
    </form>
   </div>
   </div>
  )
}

export default Home
