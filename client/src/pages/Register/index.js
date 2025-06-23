import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex justify-center h-screen items-center ">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">PROMOVES-REGISTER</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "please input your name!" }]}
          >
            <input type="text" id="name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "please input your Email!" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "please input your passWord!" }]}
          >
            <input type="password" id="password" />
          </Form.Item>
          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="REGISTER" type="submit" />
            <Link to="/login">Already have an account? login </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
