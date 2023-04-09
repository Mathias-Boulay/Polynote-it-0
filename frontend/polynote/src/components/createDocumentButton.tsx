import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { createDocument } from '../utils/api';

export const CreateDocumentButton: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  /** Verify the input then send it to the back-end */
  async function handleDocumentCreate() {
    const values = form.getFieldsValue();
    const errors = form.getFieldsError();

    if (!values['documentName'] || !values['documentPath']) return;
    for (const error of errors) {
      if (error.errors.length > 0) return;
    }

    const newDocument = await createDocument(values['documentName'], values['documentPath']);
    navigate(`/editor/${newDocument._id}`);
  }

  return (
    <>
      <Button onClick={() => setModalOpen(true)} type='primary' size='large' style={{ width: '100%' }}>
        + Create
      </Button>
      <Modal
        title='Create new document'
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => handleDocumentCreate()}
      >
        <Form form={form}>
          <Form.Item
            label='Document name'
            name='documentName'
            rules={[{ required: true, message: 'Please input a document name', type: 'string', min: 8 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Document path'
            name='documentPath'
            rules={[
              { required: true, message: 'Please input a document path', type: 'string', min: 8 },
              {
                validator(rule, value, callback) {
                  if (typeof value != 'string') {
                    callback('Wrong input type !');
                    return;
                  }

                  if (!value.startsWith('/')) {
                    callback('Root missing !');
                    return;
                  }

                  if (value.includes('//')) {
                    callback('Double slashes are not allowed');
                    return;
                  }

                  if (value.length > 1 && value.endsWith('/')) {
                    callback('End slashes are not allowed !');
                    return;
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
