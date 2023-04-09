import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';
import { LoginBody } from '../models/login_user';

export interface LoginFormOptions {
  onFinish: (data: LoginBody) => void;
}

export const LoginForm: React.FC<LoginFormOptions> = (props) => {
  const onFinish = async (values: any) => {
    console.log(values);
    props.onFinish({
      email: values['email'],
      password: values['password'],
    });
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
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!', min: 8, whitespace: false, type: 'string' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
