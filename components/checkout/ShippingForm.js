import React from "react";
import { Form, Input, Button } from "antd";
import { AiOutlineRight, AiOutlineShopping } from "react-icons/ai";

const ShippingForm = ({
  onChange,
  fields,
  setStep,
  goNextPage,
  goPreviousPage,
}) => {
  const validateMessages = {
    required: "${label} is required!",
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
      onFinish={goNextPage}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      // validateMessages={validateMessages}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input receiver's name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          { required: true, message: "Please input receiver's phone number!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: "Please input your city!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Postcode"
        name="postcode"
        rules={[{ required: true, message: "Please input your postcode!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Please input your country!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 16,
        }}
      >
        <Button type="text" htmlType="submit">
          Continue &rarr;
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ShippingForm;
