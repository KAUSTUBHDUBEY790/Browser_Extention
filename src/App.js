import './App.css';
import { images } from "./db/images";
import Home from './pages/Home';
import Task from './pages/Task';
import { useBrowser } from './context/browser-context';
import { useEffect } from 'react';
const index = Math.floor(Math.random()*images.length);
const image = images[index].image;
function App() {
  const {name,browserdispatch} = useBrowser();
  useEffect(()=>{
    const username= localStorage.getItem("name");
    browserdispatch({
      type:"NAME",
      payload:username
    })
  },[])
  return (
    <div className="app" style={{backgroundImage:`url("${image}")`}}>
      {name?<Task/>:<Home/>}
    </div>
  );
}

export default App;
