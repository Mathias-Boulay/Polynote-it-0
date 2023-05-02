import { List } from 'antd';
import { DataNode } from 'antd/es/tree';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentMetadata } from '../models/document_metadata';
import { buildTree } from '../utils/tree';

export interface MainFileViewOptions {
  data: DocumentMetadata[];
  currentPath: string;
  onFolderSelected: (subFolderPath: string) => void;
}

/** Traverse to the node to display */
function traverseToCurrentPath(data: DataNode[], currentPath: string) {
  let currentNodes: DataNode[] = data;
  const subFolders = currentPath.split('/').slice(1);
  if (subFolders.length == 0 || subFolders[0] == '') {
    currentNodes = data;
  } else {
    for (const subFolder of subFolders) {
      const index = currentNodes.findIndex((node) => node.key == subFolder);
      if (index == -1) throw new DOMException('Incorrect path !');
      currentNodes = currentNodes[index].children!;
    }
  }
  return currentNodes;
}

/** Display the main file view */
export const MainFileView: React.FC<MainFileViewOptions> = (props) => {
  const nodesToShow = traverseToCurrentPath(buildTree(props.data), props.currentPath);

  /** Build the path object to pass up */
  function handleFolderSelected(subFolder: string) {
    if (props.currentPath == '/') {
      return '/' + subFolder;
    } else {
      return props.currentPath + '/' + subFolder;
    }
  }

  /** Render the item according to the document metadata */
  function renderItem(node: DataNode) {
    if (node.children && node.children.length > 0) {
      return (
        <List.Item>
          <Paragraph onClick={() => props.onFolderSelected(handleFolderSelected(node.key.toString()))}>
            Folder: {node.title as string} - Size: {node.children.length} files
          </Paragraph>
        </List.Item>
      );
    }

    return (
      <List.Item>
        <Link to={`/editor/${node.key}`}>
          <Paragraph>File: {node.title as string}</Paragraph>
        </Link>
      </List.Item>
    );
  }

  return (
    <section style={{ margin: '1rem' }}>
      <Title level={3}>Main file view</Title>
      <List bordered dataSource={nodesToShow} renderItem={renderItem} />
    </section>
  );
};
