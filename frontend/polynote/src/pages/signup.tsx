import { Layout, notification } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { useNavigate } from 'react-router';
import { BasicHeader } from '../components/headers/BasicHeader';
import { SignupForm } from '../components/signupForm';
import { CreateUserBody } from '../models/create_user';
import { signUp } from '../utils/api';

export function SignupPage() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  /** Trye to create the user and update the UI accordingly */
  async function signUpUi(data: CreateUserBody) {
    console.log(data);
    const result = await signUp(data);
    if (result) {
      navigate('/validate');
      return;
    }

    // Else, an error of some kind happened I guess
    api.open({
      message: 'Error',
      description: 'An unexpected Error happened, try again later',
      duration: 0,
      placement: 'bottomRight',
    });
  }

  return (
    <>
      {contextHolder}
      <Layout>
        <BasicHeader />
        <Content>
          <SignupForm onFinish={signUpUi} />
        </Content>
      </Layout>
    </>
  );
}
