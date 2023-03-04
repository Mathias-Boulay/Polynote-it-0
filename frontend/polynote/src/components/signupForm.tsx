import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';

export function SignupForm() {
  const onFinish = (form: any) => {
    console.log(form);
  };

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 800 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='off'
    >
      <Form.Item
        label='Nickname'
        name='nickname'
        rules={[{ required: true, min: 8, max: 25, message: 'Please enter a username', type: 'string' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please enter a password!', min: 8, whitespace: false, type: 'string' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label='Retype Password'
        name='password-validation'
        rules={[{ required: true, message: 'Please enter a password!', min: 8, whitespace: false, type: 'string' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name='tos' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
