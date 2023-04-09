import { List } from 'antd';

import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentMetadata } from '../models/document_metadata';

export interface RecentFilesOptions {
  data: DocumentMetadata[];
}

export const RecentFiles: React.FC<RecentFilesOptions> = (props) => {
  return (
    <section style={{ margin: '1rem' }}>
      <Title level={3}>Recent files</Title>
      <List
        bordered
        grid={{ gutter: 16, column: 5 }}
        dataSource={props.data}
        renderItem={(item) => (
          <List.Item>
            <Link
              to={`/editor/${item._id}`}
              style={{ aspectRatio: '1/1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              {item.name}
            </Link>
          </List.Item>
        )}
      />
    </section>
  );

  return <Paragraph>FIXME: implement recent files</Paragraph>;
};
