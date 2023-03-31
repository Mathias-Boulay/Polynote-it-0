import { Button, Select, SelectProps } from 'antd';
import React from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { TableDataType } from './database';

export interface EditableHeaderProps {
  name: string;
  inputType: TableDataType;

  addColumn: () => void;
  deleteColumn: () => void;
  changeColumnType: (newType: TableDataType) => void;
}

/* The item types for the dropdown */
const selectOptions: SelectProps[] = ['TEXT', 'CHECKBOX', 'DATE', 'NUMBER'].map((value) => {
  return {
    value: value,
    label: value,
  };
});

export function EditableHeader(props: EditableHeaderProps) {
  return (
    <th>
      <div>{props.name}</div>
      <div>
        <Button type='text' icon={<PlusOutlined />} onClick={props.addColumn} />
        <Button type='text' icon={<DeleteOutlined />} onClick={props.deleteColumn} />
        <Select
          defaultValue={props.inputType}
          style={{
            width: 120,
          }}
          options={selectOptions}
          onChange={props.changeColumnType}
        />
      </div>
    </th>
  );
}
