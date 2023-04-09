import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { DataNode } from 'antd/es/tree';
import ForwardDirectoryTree from 'antd/es/tree/DirectoryTree';
import Paragraph from 'antd/es/typography/Paragraph';
import React, { useEffect, useState } from 'react';
import { CreateDocumentButton } from '../components/createDocumentButton';
import { BasicHeader } from '../components/headers/BasicHeader';
import { MainFileView } from '../components/mainFileView';
import { RecentFiles } from '../components/recentFiles';
import { SideTreeView } from '../components/sideTreeView';
import { DocumentMetadata } from '../models/document_metadata';
import { listDocuments } from '../utils/api';

export function Home() {
  const [currentPath, setCurrentPath] = useState('/');
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);

  useEffect(() => {
    listDocuments().then((value) => setDocuments(value));
  }, []);

  function navigateInto(subFolder: string) {
    let newPath = currentPath;
    if (currentPath == '/') newPath += subFolder;
    else newPath += '/' + subFolder;
    setCurrentPath(newPath);
  }

  function navigateParent() {
    setCurrentPath(currentPath.slice(0, currentPath.lastIndexOf('/')));
  }

  function handleCurrentPath(value: string) {
    console.log(value);
    setCurrentPath(value);
  }

  return (
    <Layout>
      <BasicHeader />
      <Layout>
        <Sider>
          <CreateDocumentButton />
          <SideTreeView data={documents} displayLeaf={false} onFolderSelected={handleCurrentPath} />
        </Sider>

        <Content>
          {/* //FIXME fetch the recent documents ! */}
          <RecentFiles data={documents} />
          <MainFileView data={documents} currentPath={currentPath} onFolderSelected={handleCurrentPath} />
        </Content>
      </Layout>
    </Layout>
  );
}
