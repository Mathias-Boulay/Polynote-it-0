import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreateUserBody } from '../models/create_user';

export interface SignUpOptions {
  onFinish: (data: CreateUserBody) => void;
}

export const SignupForm: React.FC<SignUpOptions> = (props) => {
  const [cguAccepted, setCguAccepted] = useState<boolean>(false);
  const [ageAccepted, setAgeAccepted] = useState<boolean>(false);

  const onFinish = (form: any) => {
    console.log(form);
    props.onFinish({
      username: form.nickname,
      email: form.email,
      password: form.password,
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
        <Checkbox onChange={(e) => setCguAccepted(e.target.checked)}>
          I accept the{' '}
          <Link to={'/tos'} target='_blank'>
            Terms Of Service
          </Link>
        </Checkbox>
      </Form.Item>

      <Form.Item name='age_restriction' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox onChange={(e) => setAgeAccepted(e.target.checked)}>I am 13+ years old</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit' disabled={!(cguAccepted && ageAccepted)}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
