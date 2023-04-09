import { Layout, notification, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { BasicHeader } from '../components/headers/BasicHeader';
import { LoginForm } from '../components/loginForm';
import { JwtClaims } from '../models/jwt_claims';
import { LoginBody } from '../models/login_user';
import { accountState } from '../stores/account_store';
import { login } from '../utils/api';

export function LoginPage() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [claims, setClaims] = useRecoilState(accountState);

  /**Login and store the claims  */
  async function handleLogin(data: LoginBody) {
    const claims = await login(data.email, data.password);
    if (claims == undefined) {
      api.open({
        message: 'Error',
        description: 'Username or password is wrong',
        duration: 0,
        placement: 'bottomRight',
      });
      return;
    }
    console.log(claims);
    setClaims(claims);
    navigate('/home');
  }

  return (
    <>
      {contextHolder}
      <Layout>
        <BasicHeader />
        <Content>
          <Typography>
            <Title>Login</Title>
            <Link to='/signup'>Don't have an account ? Sign up</Link>
          </Typography>

          <LoginForm onFinish={handleLogin}></LoginForm>
        </Content>
      </Layout>
    </>
  );
}
