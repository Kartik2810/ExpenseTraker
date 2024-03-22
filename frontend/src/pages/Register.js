import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

function Register() {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    console.log(values);
    try {
      setSpinner(true);
      await axios.post("register", values);
      message.success("Register Successfully");
      navigate("/login");
    } catch (error) {
      setSpinner(false);
      console.log({ message: `error in register: ${error}` });
      message.error("something went wrong");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div>
        <h1 className="title">Expense Traker</h1>
      </div>
      <div className="register-content">
        <Form className="form" layout="vertical" onFinish={submitHandler}>
          {spinner && <Spinner />}
          <h1>Register form</h1>
          <FormItem className="input" label="Name" name="name">
            <Input type="name" />
          </FormItem>
          <FormItem className="input" label="Email" name="email">
            <Input type="email" />
          </FormItem>
          <FormItem className="input" label="Password" name="password">
            <Input type="password" />
          </FormItem>
          Already Register ?<Link to="/login"> Go To Login</Link>
          <div>
            <button className="btn btn-primary mt-3" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Register;
