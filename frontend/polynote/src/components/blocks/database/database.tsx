import { Button, Dropdown, DropdownProps, Form, MenuProps, Select, SelectProps, Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import React, { HTMLAttributes, ReactNode, TdHTMLAttributes, useEffect, useRef, useState } from 'react';
import { EditableCell } from './editableCell';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { EditableHeader } from './editableHeader';
export type TableDataType = 'TEXT' | 'CHECKBOX' | 'DATE' | 'NUMBER';

export interface ExtendedColumnType {
  key: string;
  name: string;
  // The data type should be used to tell how to render the database
  dataType: TableDataType;
}

// Since we don't know what kind of data type is given by the user, assume a string
export interface DataRow {
  key: string;
  [dataKey: string]: string;
}

export function DatabaseBlock() {
  /* The type any is used since we don't know the user input */

  // Describe how columns are rendered
  const [columns, setColumns] = useState<ExtendedColumnType[]>([]);
  // Actual data
  const [data, setData] = useState<DataRow[]>([]);

  /** Find the index of a given column key */
  function findColumnIndex(key: string) {
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].key == key) return i;
    }

    console.warn({ columns, key });
    throw Error('No column index has been found !');
  }

  /** Delete the column given a key */
  function deleteColumn(key: string) {
    const index = findColumnIndex(key);
    setColumns((previousColumns) => {
      return [...previousColumns.slice(0, index), ...previousColumns.slice(index + 1)];
    });
  }

  /** Find the index of a given row key */
  function findRowIndex(key: string) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key == key) return i;
    }

    console.warn({ data, key });
    throw Error('No row index has been found !');
  }

  /** Delete the row with a given a key */
  function deleteRow(key: string) {
    const index = findRowIndex(key);
    setData((previousData) => {
      return [...previousData.slice(0, index), ...previousData.slice(index + 1)];
    });
  }

  /** Add a row with no data */
  function addRow(insertKey: string) {
    const index = findRowIndex(insertKey);
    setData((previousData) => {
      return [
        ...previousData.slice(0, index + 1),
        {
          key: Date.now().toString(),
        },
        ...previousData.slice(index + 1),
      ];
    });
  }

  /** Save the cell data */
  function saveCellData(data: any, rowKey: string, columnKey: string) {
    setData((previousData) => {
      const rowIndex = findRowIndex(rowKey);
      return [
        ...previousData.slice(0, rowIndex),
        {
          ...previousData[rowIndex],
          [columns[findColumnIndex(columnKey)].name]: data,
        },
        ...previousData.slice(rowIndex + 1),
      ];
    });
  }

  /** Triggered when the dropdown selects a new choice */
  function changeColumnType(key: string, newType: TableDataType) {
    const index = findColumnIndex(key);
    // Nuke the data in the column
    setData((previousData) => {
      return previousData.map((value) => {
        return { ...value, [columns[index].name]: '' };
      });
    });

    setColumns((previousColumns) => {
      return [
        ...previousColumns.slice(0, index),
        {
          ...previousColumns[index],
          dataType: newType,
        },
        ...previousColumns.slice(index + 1),
      ];
    });
  }

  /** Add a column with the provided type */
  function addColumn(insertKey: string, name: string, dataType: TableDataType) {
    // FIXME don't rely on user input

    const index = columns.length > 0 ? findColumnIndex(insertKey) : 0;

    const columnKey = Date.now().toString();

    setColumns((previousColumns) => {
      return [
        ...previousColumns.slice(0, index + 1),
        {
          dataType: dataType,
          name: name,
          key: columnKey,
        },
        ...previousColumns.slice(index + 1),
      ];
    });

    // Initialize empty data for the cell
    setData((previousData) => {
      return previousData.map((value) => {
        return { ...value, [name]: '' };
      });
    });
  }

  // Load some dummy data
  useEffect(() => {
    setColumns([]);
    setData([]);
    addColumn('beautifulColumnKey', 'TESTLESGENS', 'TEXT');
    setData([
      {
        key: '1',
        TESTLESGENS: 'Hello there',
        DEFAULT: 'THIS IS DEFAULT TEXT',
      },
    ]);
  }, []);

  // Displayed headers
  const headers = columns.map((column) => {
    return (
      <EditableHeader
        addColumn={() => addColumn(column.key, `DEFAULT_${Date.now()}`, 'TEXT')}
        deleteColumn={() => deleteColumn(column.key)}
        changeColumnType={(newType) => changeColumnType(column.key, newType)}
        inputType={column.dataType}
        name={column.name}
        key={column.key}
      />
    );
  });

  // Displayed rows

  const rows = data.map((row) => {
    return (
      <tr key={row.key}>
        {columns.map((column, index) => {
          return (
            <EditableCell
              handleSave={(data) => saveCellData(data, row.key, column.key)}
              inputData={row[column.name]}
              inputType={column.dataType}
              key={index}
            />
          );
        })}

        {/* ADD/DELETE buttons */}
        <td style={{ padding: 0 }}>
          <Button type='text' icon={<PlusOutlined />} onClick={() => addRow(row.key)} />
          <Button type='text' icon={<DeleteOutlined />} onClick={() => deleteRow(row.key)} />
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
    // <Table
    //   components={{
    //     body: {
    //       cell: EditableCell,
    //       row: EditableRow,
    //     },
    //   }}
    //   bordered
    //   dataSource={data}
    //   columns={columns}
    //   rowClassName='editable-row'
    //   pagination={{}}
    // />
  );
  // return (
  //   <div>
  //     <button
  //       onClick={() => {
  //         addColumn(findColumnIndex(columns[0].key), `DEFAULT ${Date.now()}`, 'TEXT');
  //       }}
  //     >
  //       fdp
  //     </button>
  //     {columns.map((col) => {
  //       return <p>{col.dataIndex}</p>;
  //     })}
  //   </div>
  // );
}
