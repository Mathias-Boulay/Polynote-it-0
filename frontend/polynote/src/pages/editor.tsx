import { Layout, notification } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Editor } from '../components/editor';
import { BasicHeader } from '../components/headers/BasicHeader';
import { DocumentHeader } from '../components/headers/documentHeader';
import { Document } from '../models/document';
import { getDocument, saveDocument } from '../utils/api';

export function EditorPage() {
  const [api, contextHolder] = notification.useNotification();
  const { documentId } = useParams();
  const [userDocument, setDocument] = useState<Document>();
  // This state is separated to avoid updating the editor when not needed
  const [userDocumentData, setUserDocumentData] = useState<any>({});

  useEffect(() => {
    if (!documentId) return;
    getDocument(documentId).then((userDocument) => {
      setDocument(userDocument);
      setUserDocumentData(userDocument.data);
    });
  }, []);

  async function handleOnSave() {
    const result = await saveDocument(documentId!.includes('-') ? userDocument!.sharableLinkId : userDocument!._id, {
      ...(userDocument as Document),
      data: userDocumentData,
    });
    if (result) {
      api.open({
        message: 'Success',
        description: 'Your document was saved !',
        duration: 0,
        placement: 'bottomRight',
      });
      return;
    }

    api.open({
      message: 'Error',
      description: 'An unexpected error happened, try again later',
      duration: 0,
      placement: 'bottomRight',
    });
    return;
  }

  return (
    <>
      {contextHolder}
      <Layout>
        <BasicHeader />
        {userDocument != undefined ? (
          <>
            <DocumentHeader
              documentName={userDocument.name}
              onSave={handleOnSave}
              onNameChanged={(newName) =>
                setDocument((previousDocument) => {
                  return {
                    ...(previousDocument as Document),
                    name: newName,
                  };
                })
              }
            />
            <Content>
              <Editor documentData={userDocument.data} onChange={(newData) => setUserDocumentData(newData)}></Editor>
            </Content>
          </>
        ) : (
          <div></div>
        )}
      </Layout>
    </>
  );
}
