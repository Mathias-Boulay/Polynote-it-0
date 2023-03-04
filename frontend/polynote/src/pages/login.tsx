import { Layout, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';

import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/loginForm';

export function LoginPage() {
  return (
    <Layout>
      <Content>
        <Typography>
          <Title>Login</Title>
          <Link to='/signup'>Don't have an account ? Sign up</Link>
        </Typography>

        <LoginForm></LoginForm>
      </Content>
    </Layout>
  );
}
