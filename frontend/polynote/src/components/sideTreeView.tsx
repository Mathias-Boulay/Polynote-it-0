import Sider from 'antd/es/layout/Sider';
import { DataNode, EventDataNode } from 'antd/es/tree';
import ForwardDirectoryTree from 'antd/es/tree/DirectoryTree';
import React, { Key } from 'react';
import { DocumentMetadata } from '../models/document_metadata';
import { buildTree } from '../utils/tree';

/** Component options */
export interface SideTreeViewOptions {
  data: DocumentMetadata[];
  displayLeaf: boolean;
  onFolderSelected: (subFolderPath: string) => void;
}

export const SideTreeView: React.FC<SideTreeViewOptions> = (props) => {
  function handleOnExpand(
    path: Key[],
    info: {
      node: EventDataNode<DataNode>;
      expanded: boolean;
      nativeEvent: MouseEvent;
    }
  ) {
    console.log({ path, info });
    //FIXME the library gives back a broken path object !
    props.onFolderSelected('/' + path.join('/'));
  }

  return <ForwardDirectoryTree onExpand={handleOnExpand} treeData={buildTree(props.data, props.displayLeaf)} />;
};
