import { Button, Layout, Result } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { useNavigate } from 'react-router';
import { BasicHeader } from '../components/headers/BasicHeader';

export function ValidationRequired() {
  const navigate = useNavigate();

  return (
    <Layout>
      <BasicHeader />
      <Content>
        <Result
          status='info'
          title='Email validation required'
          subTitle="You're almost there, take a look at your inbox !"
          extra={[
            <Button type='primary' key='console' onClick={() => navigate('/login')}>
              Go to Login Page
            </Button>,
          ]}
        />
      </Content>
    </Layout>
  );
}
