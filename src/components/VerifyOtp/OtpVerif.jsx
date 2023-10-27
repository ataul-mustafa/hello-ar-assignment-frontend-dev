import React, { useState, useRef } from 'react';
import './OtpVerification.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { sendOtp } from '../Login/SignIn';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


const verifyOtp = async (phoneNo, requestId, OTP) => {
    let otp = `${OTP[0]}${OTP[1]}${OTP[2]}${OTP[3]}`;
    otp = otp.toString();
    console.log(phoneNo, requestId, otp);

    try {
        let resp = await axios.post('https://dev.api.goongoonalo.com/v1/auth/verify_otp', {
          phoneNumber: `+${phoneNo}`,
          requestId,
          otp: otp // Join the array to form a string
        });
      
        console.log(resp);
      } catch (error) {
        console.error(error.response); // Log the error response
      }
      
}



const OtpVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [verifData, setVerifData] = useState({
        requestId: '',
        phoneNo: '',
    })

    const [otp, setOtp] = useState(['', '', '', '']);
    const otpInputs = Array.from({ length: 4 }, (_, index) => useRef(null));

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const requestId = queryParams.get("requestId");
        const phoneNo = queryParams.get("phoneNo");

        // console.log(phoneNo, requestId)

        setVerifData({requestId, phoneNo})

    }, [])

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (isNaN(value)) return; // Allow only numeric input
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Move focus to the next input
        if (index < otpInputs.length - 1 && value !== '') {
            otpInputs[index + 1].current.focus();
        }
    };

    const resendOTP = async() => {
        const resp = await sendOtp(verifData.phoneNo);
        setVerifData({...verifData, requestId: resp.data.requestId})
    }

    const funOTPVerif = async(e)=>{
        e.preventDefault();
        await verifyOtp(verifData.phoneNo, verifData.requestId, otp)

        if(otp.join('') == '5678'){
            toast.success("Verified Successfully")
            sessionStorage.setItem('authenticated', true)
            navigate('/')
        } 
        else {
            toast.error("Please enter a valid otp")
        }
    }


    return (

        <div className='vefifContainer'>
            <form>
                <h1>OTP Verification</h1>
                <p>We have sent and OTP to +{verifData.phoneNo}. Please enter the code received to verify.</p>
                <div className="otp-container">
                    {otpInputs.map((inputRef, index) => (
                        <input
                            key={index}
                            ref={inputRef}
                            type="text"
                            maxLength="1"
                            value={otp[index]}
                            onChange={(e) => handleChange(e, index)}
                        />
                    ))}
                </div>
                <button onClick={funOTPVerif}>Verify</button>
                <h3 onClick={resendOTP}>Resend OTP</h3>
                <Link to={'/login'}>Use another number</Link>
            </form>
        </div>
    );
};

export default OtpVerification;
