import React, { useEffect, useContext } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";

const RegisterForm = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useStateContext();

  useEffect(() => {
    if (userInfo) {
      router;
    }
  }, [router, userInfo]);
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };
  const submitHandler = async ({ name, email, password }) => {
    e.preventdefault();
    try {
      const { data } = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      setUserInfo(data);
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push("/");
    } catch (err) {
      console.log("register failed", err);
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      onFinish={submitHandler}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            warningOnly: true,
            message: "This is not an valid email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          {
            type: "string",
            min: 6,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
