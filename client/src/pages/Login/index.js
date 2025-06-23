import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      if (response.success) {
        dispatch(HideLoading());
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }

      // console.log(response);
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center h-screen items-center ">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">PROMOVIE-LOGIN</h1>
        <hr />

        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
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
            <Button fullWidth title="Login" type="submit" />
            <Link to="/register">Don't have an account? Register </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
