import React,{useEffect, useState} from 'react'
import { Form, Input, message } from "antd"
import FormItem from 'antd/es/form/FormItem';
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import Spinner from "../components/Spinner"

function Login() {
    const [spinner,setSpinner] = useState(false)
    const navigate = useNavigate()
    const submitHandler=async(values)=>{
        try {
            setSpinner(true)
            const {data} = await axios.post("login",values)
            message.success("login successfully..");
            localStorage.setItem("user",JSON.stringify(data))
            navigate("/")
        } catch (error) {
            setSpinner(false)
            console.log({message: `error in login: ${error.message}`})
            message.error("something went wrong")
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/")
        }
    },[navigate])
    return (
        <>
        <div>
            <h1 className='title'>Expense Traker</h1>
        </div>
            <div className='register-content'>
                
                <Form className='form' layout='vertical' onFinish={submitHandler}>
                    {spinner && <Spinner/>}
                    <h1>Login form</h1>
                    
                    <FormItem className='input' label="Email" name="email">
                        <Input type='email'/>
                    </FormItem>
                    <FormItem className='input' label="Password" name="password">
                        <Input type='password'/>
                    </FormItem>
                    Not a user?<Link to="/register">Go To Register</Link>
                    <div className="mt-3">
                    <button className='btn btn-primary' type='submit'>Login</button>
                    </div>
                </Form>
            </div>
            
        </>
    )
}

export default Login
