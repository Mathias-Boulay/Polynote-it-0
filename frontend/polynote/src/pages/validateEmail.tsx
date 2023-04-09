import { Button, Layout, notification, Result, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { BasicHeader } from '../components/headers/BasicHeader';
import { validateEmail } from '../utils/api';

export function ValidateEmail() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [hasFinished, setHasFinished] = useState(false);
  const { emailValidationId } = useParams();

  useEffect(() => {
    if (!emailValidationId) return;

    validateEmail(emailValidationId).then((value) => {
      if (value) {
        setHasFinished(true);

        return;
      }
      // Yet more notifications
      api.open({
        message: 'Error',
        description: 'An unexpected Error happened, try again later',
        duration: 0,
        placement: 'bottomRight',
      });
    });
  }, []);

  // Rendering part
  const childNode = hasFinished ? (
    <Result
      status='success'
      title='Account verified'
      subTitle='Welcome to Polynotes !'
      extra={[
        <Button type='primary' key='console' onClick={() => navigate('/login')}>
          Go to Login Page
        </Button>,
      ]}
    />
  ) : (
    <Spin tip='Loading' size='large'>
      <div className='content' />
    </Spin>
  );

  return (
    <>
      {contextHolder}
      <Layout>
        <BasicHeader />
        <Content>{childNode}</Content>
      </Layout>
    </>
  );
}
