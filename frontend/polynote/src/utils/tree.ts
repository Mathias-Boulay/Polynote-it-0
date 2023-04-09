/** Utility file related to inflating a flat document tree into a non-flat one  */

import { DataNode } from 'antd/es/tree';
import { DocumentMetadata } from '../models/document_metadata';

/** Create the folder structure and the leaf */
function createNode(dataNodes: DataNode[], path: string, name: string, _id: string, createLeaf: boolean) {
  //console.log({ dataNodes, path, name });
  // Now, with actual modification of the tree
  // I feel like I have created a messy adapter...

  if (path == '/' || path == '') {
    // We reached the leaf, add a children
    if (createLeaf) {
      dataNodes.push({ title: name, key: _id, isLeaf: true });
    }

    return;
  }

  const subFolderName = path.split('/')[1];

  const splitPath = path.split('/');
  splitPath.splice(1, 1);
  const subPath = splitPath.join('/');

  // Iterate over the nodes to see if it has been created already
  let index = dataNodes.findIndex((value) => value.key == subFolderName);
  if (index == -1) {
    // No block found, add one
    dataNodes.push({
      title: subFolderName,
      key: subFolderName,
      children: [],
    });
    index = dataNodes.length - 1;
  }

  // Go one level deeper
  createNode(dataNodes[index].children!, subPath, name, _id, createLeaf);

  return;
}

/** Turn the flat tree representation into a non-flat one */
export function buildTree(data: DocumentMetadata[], createLeafs = true): DataNode[] {
  const transformedData: DataNode[] = [];
  for (const documentMetadata of data) {
    createNode(transformedData, documentMetadata.path, documentMetadata.name, documentMetadata._id, createLeafs);
  }

  return transformedData;
}
