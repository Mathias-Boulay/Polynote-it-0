import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Header } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Paragraph';
import React, { useState } from 'react';

export interface DocumentHeaderOptions {
  documentName: string;
  onSave: () => void;
  onNameChanged: (newName: string) => void;
}

export const DocumentHeader: React.FC<DocumentHeaderOptions> = (props) => {
  const [form] = useForm();
  const [editing, setEditing] = useState(false);

  /** Validate and pass up the new name */
  function handleNewName() {
    const newName = form.getFieldValue('documentName');
    setEditing(false);
    if (!newName || newName.length < 8) return;

    props.onNameChanged(newName);
  }

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      {editing ? (
        <Form form={form}>
          <Form.Item name='documentName' rules={[{ required: true, min: 8, type: 'string' }]}>
            <Input onBlur={handleNewName} />
          </Form.Item>
        </Form>
      ) : (
        <div>
          <Title
            onClick={() => {
              setEditing(true);
            }}
            style={{ padding: 24, color: 'white' }}
          >
            {props.documentName}
          </Title>
        </div>
      )}

      <Button type='primary' size='large' onClick={() => props.onSave()}>
        Save {props.documentName}
      </Button>
    </Header>
  );
};
