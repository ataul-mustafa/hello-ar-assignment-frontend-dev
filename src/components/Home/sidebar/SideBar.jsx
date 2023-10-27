import React from 'react'
import dashboardIcon from '../../../assets/dashboard.png'
import logoutIcon from '../../../assets/logout.png'
import './SideBar.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function SideBar() {
    const navigate = useNavigate();


    const logoutbtn = () =>{
        sessionStorage.clear();
        navigate('/login')
        toast.success("Logged out successfully");
    }
  return (
    <div className='sideBarWrapper'>
        <div className="upper">
            <h1>LOGO</h1>
            <div className="option">
                <img src={dashboardIcon} alt="" />
                <p>Songs</p>
            </div>
        </div>
        <div className="lower">
            <img src={logoutIcon} alt="logout" />
            <h2 onClick={logoutbtn}>Logout</h2>
        </div>
    </div>
  )
}

export default SideBar