import { Button, Image as img, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import PolyLogo from '../../assets/polynote_logo.png';
import { accountState } from '../../stores/account_store';
import { logout } from '../../utils/api';

//export interface BasicHeaderOptions {}

export const BasicHeader: React.FC = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useRecoilState(accountState);

  async function handleLogout() {
    await logout();
    setClaims(undefined);
    navigate('/');
  }

  function logoutSection() {
    if (claims) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Paragraph style={{ marginBottom: 0 }}>{claims?.email.split('@')[0]}</Paragraph>
          <Button type='primary' onClick={handleLogout}>
            Logout
          </Button>
        </div>
      );
    }
  }

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        background: '#FFFFFF',
      }}
    >
      <Link
        to='/'
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src={PolyLogo}
          alt='Polynotes logo'
          style={{
            height: '3rem',
            width: 'auto',
          }}
        />

        <Title>Polynotes</Title>
        {/* No no, the test part is important. We have a V0 after all. */}
        <Paragraph>TEST</Paragraph>
      </Link>
      {logoutSection()}
    </Header>
  );
};
