import React, { useEffect } from 'react'
import SongsComp from '../components/Home/Main';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function Home() {
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = sessionStorage.getItem('authenticated');
        if(!auth){
            navigate("/login")
        }
    },[])
  return (
    <div>
        <SongsComp />
    </div>
  )
}

export default Home