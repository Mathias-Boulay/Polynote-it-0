import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { Editor } from '../components/editor';

export function EditorPage() {
  return (
    <Layout>
      <Content>
        <Editor></Editor>
      </Content>
    </Layout>
  );
}
