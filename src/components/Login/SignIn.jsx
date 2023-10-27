import React, { useState } from 'react';
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import './SignIn.css';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//function to send otp using api
export const sendOtp = async(phNo) =>{
    try{
        let data = await axios.post('https://dev.api.goongoonalo.com/v1/auth/login',{
        phoneNumber: `+${phNo}`
    })

    if(data.status == 200){
        toast.success(data.data.message); //showing success toast if request sucessfully sent
        return data.data;
    }

    }catch(error){
        toast.error(error);
    }
}


function SignIn() {

    const navigate = useNavigate();

    const [phoneNo, setPhoneNo] = useState(null);

    //sending requestId and mobileNo. for verification page for otp verification
    const sendDataForVerification = (variable1, variable2) => {
       
        const queryParams = new URLSearchParams({
          requestId: variable1,
          phoneNo: variable2,
        });
    
        navigate(`/verify-otp?${queryParams.toString()}`);
      };

    const submitHandler = async(e) =>{
        e.preventDefault();

        if(!phoneNo || (phoneNo.toString()).length < 12){
            toast.error("Enter a valid phone no") //showing error toast if not valid phone no

        }else {

            const response = await sendOtp(phoneNo); //sending otp if a valid phone no
            sendDataForVerification(response.requestId, phoneNo);
            // console.log(response)
        }
        
    }
    const handleOnChange = (value, country) => {
        setPhoneNo(value);
      };

    return (
        <div className='signInContainer'>
            <form>
                <h1>Sign In</h1>
                <p>Please enter your mobile number to login. We will send an OTP to verify your number.</p>
                <div className="inputPhone">
                    <ReactPhoneInput
                        defaultCountry="in"
                        inputClass="phone-input"
                        inputProps={{
                            required: true,
                        }}

                        onChange={handleOnChange}

                        containerClass='containerCl'
                        buttonClass='btnCl'
                        searchClass='searchCl'

                        buttonStyle={{ backgroundColor: '#fff', borderRight: 'none', width: '50px', paddingLeft: '10px', borderRadius: '8px'}}
                        containerStyle={{ width: '50px'}}
                        inputStyle={{paddingLeft: '60px'}}

                        country={"in"}
                        placeholder='Phone number'
                    />
                </div>
                <button onClick={submitHandler}>Sign In</button>
            </form>
        </div>
    )
}

export default SignIn