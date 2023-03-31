import { Checkbox, DatePicker, Form, Input, InputNumber, InputRef } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DataType } from 'csstype';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { TableDataType } from './database';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  inputData: string;
  inputType: TableDataType;

  handleSave: (data: string) => void;
}

/** Provide the appropriate input node to interact with a given data type */
function getInputNode(
  inputType: TableDataType,
  reference: React.RefObject<any>,
  save: () => void
): JSX.Element | undefined {
  switch (inputType) {
    case 'TEXT':
      return <Input ref={reference} onPressEnter={save} onBlur={save} />;
    case 'CHECKBOX':
      return <Checkbox ref={reference} onChange={save} />;
    case 'DATE':
      return <DatePicker ref={reference} onBlur={save} onChange={save} />;
    case 'NUMBER':
      return <InputNumber ref={reference} onBlur={save} onPressEnter={save} />;
    default:
      console.error(`Unsupported data type: ${inputType}`);
      break;
  }
}

/** Normalize the output to a simple string, should be parsable to the other way around */
function normalizeOutput(inputType: TableDataType, data: any): string {
  switch (inputType) {
    case 'TEXT':
    case 'CHECKBOX':
    case 'NUMBER':
      return data;
    case 'DATE':
      return data.$d.toISOString();
  }
  return '';
}

export const EditableCell: React.FC<EditableCellProps> = (props) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [form] = useForm();
  const dataIndex = Date.now().toString();

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => setEditing(!editing);

  /** Emit a save event after normalizing the input data */
  const save = async () => {
    console.log(form.getFieldsValue());
    const outputValue = normalizeOutput(props.inputType, form.getFieldValue(dataIndex));
    if (outputValue == undefined) return;

    console.log(`save: ${outputValue}`);
    props.handleSave(outputValue);
    toggleEdit();
  };

  const inputNode = getInputNode(props.inputType, inputRef, save)!;

  // TODO break free from the form system ?
  return (
    <td>
      {editing ? (
        <Form form={form}>
          <Form.Item
            //valuePropName='checked'
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input !`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        </Form>
      ) : (
        <div className='editable-cell-value-wrap' style={{ paddingRight: 24 }} onClick={toggleEdit}>
          {props.inputData}
          {/* For anyone wondering, this is to workaround the onClick that does not trigger on fully empty divs */}
          {'\u2800'}
        </div>
      )}
    </td>
  );
};
