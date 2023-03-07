import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import type * as CSS from 'csstype';
import React from 'react';
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

export function DragBlock() {
  const wrapperStyle: CSS.Properties = {
    display: 'flex',
  };

  const dragStyle: CSS.Properties = {
    width: '1rem',
    height: '1rem',
    top: '0.3rem',
    margin: '0.2rem',
    backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16"><path fill-opacity="0.2" d="M4 14c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM2 6C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>')`,
  };

  const contentStyle: CSS.Properties = {
    flex: '1 1 auto',
  };

  return (
    <NodeViewWrapper style={wrapperStyle}>
      <div style={dragStyle} contentEditable={false} draggable={true} data-drag-handle />
      <NodeViewContent style={contentStyle} contentEditable={true}></NodeViewContent>
    </NodeViewWrapper>
  );
}

export default Node.create({
  name: 'dragBlock',

  group: 'drag',

  content: 'block*',

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'drag-block',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['drag-block', mergeAttributes(HTMLAttributes, { 'data-type': 'draggable-item' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DragBlock);
  },
});
