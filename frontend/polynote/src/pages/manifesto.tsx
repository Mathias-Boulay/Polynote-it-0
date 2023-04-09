import { Button, Layout, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { Link } from 'react-router-dom';
import { BasicHeader } from '../components/headers/BasicHeader';

export function ManifestoPage() {
  return (
    <main>
      <Layout>
        <BasicHeader />
        <Content>
          <Typography>
            <Title>Manifesto</Title>
            <Paragraph>
              At Polynotes, we believe note-taking should be empowering and creative. That's why we created Polynotes, a
              note-taking app that emphasizes its block editor. Blocks can contain text, images, files, links, and more,
              and you can mix and match them in any order without worrying about formatting. Polynotes also offers
              collaboration, sharing, and discovery features, while prioritizing privacy and security. Join us in our
              mission to empower individuals and communities through creative note-taking. Let's make note-taking great
              again with Polynotes!
            </Paragraph>
          </Typography>
          <Link to='login'>
            <Button type='primary' block>
              Start writing !
            </Button>
          </Link>
        </Content>
      </Layout>
    </main>
  );
}
