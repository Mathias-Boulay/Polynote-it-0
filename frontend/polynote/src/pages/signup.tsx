import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { SignupForm } from '../components/signupForm';

export function SignupPage() {
  return (
    <Layout>
      <Content>
        <SignupForm />
      </Content>
    </Layout>
  );
}
