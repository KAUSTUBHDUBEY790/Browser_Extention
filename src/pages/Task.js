import './time.css'
import React, { Fragment, useEffect, useState } from 'react'
import { useBrowser } from '../context/browser-context';
import {quotes} from '../db/quotes'
import Todo from '../component/Todo';
import { codechef, geeks, gmail, google, leet, youtube } from './image/image';



<link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Raleway:wght@700&display=swap" rel="stylesheet"></link>
const index = Math.floor(Math.random()*quotes.length);
const quote = quotes[index].quote;
function Task() {
    const {time,message,name,task,browserdispatch} = useBrowser();
    const [ischecked,setchecked] = useState(false);
    const [istodo, setistodo] = useState(false);
    useEffect(()=>{
      const Task = localStorage.getItem("TASK");
      browserdispatch({
        type:"TASK",
        payload:Task
      })
    },[])
    useEffect(()=>{
      const checkstatus = localStorage.getItem("checked-status");
      checkstatus === "true" ?setchecked(true):setchecked(false);
    },[])
    useEffect(()=>{
        clock();
    },[time])
    
  const clock=()=>{
    const today = new Date();
    const hours = today.getHours();
    const min = today.getMinutes();
    const hour = hours<10? "0"+hours:hours;
    const minutes= min<10? "0"+min:min;
    const time = `${hour} : ${minutes}`;
    setTimeout(clock,1000);
    browserdispatch({
        type:"TIME",
        payload:time
    })
    browserdispatch({
      type:"MESSAGE",
      payload:hours
    })

  }
  const handlesubmit=(event)=>{
      event.preventDefault();
  }
  const handleevent=(event)=>{
    if(event.key==="Enter"  && event.target.value.length>0)
    {
      browserdispatch({
        type:"TASK",
        payload:event.target.value
      })
      localStorage.setItem("TASK",event.target.value);
      localStorage.setItem("data",new Date.getDate());
    }
  }
  const handlecompletetask=(event)=>{
    if(event.target.checked){
      setchecked(ischecked=>!ischecked)
    }
    else{
      setchecked(ischecked=>!ischecked)
    }
    localStorage.setItem("checked-status",!ischecked);
  }
  const handlecleartask=()=>{
    browserdispatch({
      type:"CLEAR",
    })
    setchecked(false);
    localStorage.removeItem("TASK");
    localStorage.removeItem("checked-status")

  }
  const handletodolist=()=>{
    setistodo(istodo=> !istodo);

  }
  
  return (
    <div className='task-container d-flex direction-column align-center gap'>
      <div className='link-container absolute align-center direction-column'>
        <ul className='links direction-column align-center'>
          <li>
            <a href='https://mail.google.com/'>
              <img src={gmail} className='link' alt='gmail'/>
            </a>
          </li>
          <li>
            <a href='https://www.google.com/'>
              <img src={google} className='link' alt='google'/>
            </a>
          </li>
          <li>
            <a href='https://www.youtube.com/'>
              <img src={youtube} className='link' alt='youtube'/>
            </a>
          </li>
          <li>
            <a href='https://leetcode.com/'>
              <img src={leet} className='link' alt='leetcode'/>
            </a>
          </li>
          <li>
            <a href='https://www.codechef.com/'>
              <img src={codechef} className='link' alt='codechef'/>
            </a>
          </li>
          <li>
            <a href='https://www.geeksforgeeks.org/' >
              <img src={geeks} className='link' alt='Geeksforgeeks'/>
            </a>
          </li>
        </ul>
      </div>
        <span className='time'>{time}</span>
        <span className='message'>{message},{name}</span>
        {name !==null && task===null? (       <Fragment>
          <spam className="focus-Q">Hey! So what's on the list today?</spam>
          <form onSubmit={handlesubmit}>
            <input required className='input tinput' onKeyPress={handleevent}/>
          </form>
        </Fragment>):(     <div className='user-task-container d-flex direction-column align-center gap-sm'>
          <span className='heading-2'>Today's focus</span>
          <div className='d-flex align-center'>
            
            <label className={`${ischecked? "strikethrough" : ""} heading-3 d-flex align-center gap-sm`}>
            <input className='check' type='checkbox' onChange={handlecompletetask} checked={ischecked}/>
              {task}
            </label>
            <button className='button' onClick={handlecleartask}><span class="material-symbols-outlined">
delete_forever
</span></button>
          </div>

        </div>)}
        <div className='quotescontainer'>
          <span className='heading-3' style={{fontFamily:"Dancing Script",fontSize:"1.75rem"}}>{quote}</span>

        </div>
        {istodo && <Todo/>}
        <div className='todobuttoncontainer absolute'>
              <button className='button cursor todobutton' onClick={handletodolist}><span class="material-symbols-outlined">
event_note
</span></button>
        </div>

 
    </div>
  )
}

export default Task