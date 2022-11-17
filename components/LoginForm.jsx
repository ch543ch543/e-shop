import React, { useEffect } from "react";
import { Button, Form, Input, notification } from "antd";
import Link from "next/link";
import axios from "axios";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";

const LoginForm = () => {
  const router = useRouter();
  const { userInfo, setUserInfo, setUserName } = useStateContext();

  useEffect(() => {
    if (userInfo) {
      router.push("/");
      setUserName(userInfo.name);
    }
  }, [router, userInfo]);
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };
  const submitHandler = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      setUserInfo(data);
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push("/");
    } catch (err) {
      console.log("register failed", err);
      openNotification("top");
    }
  };
  const openNotification = (placement) => {
    notification.info({
      message: `Wrong email or password.`,
      placement,
    });
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={submitHandler}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateMessages={validateMessages}
        requiredMark={false}
      >
        <Form.Item
          label="EMAIL"
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
          label="PASSWORD"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            LOGIN
          </Button>
          <div className="registerBtn">
            or{" "}
            <Link href={`/register`} passHref>
              <a className="main-dark-color">Register now!</a>
            </Link>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
