import React, { ReactChild, ReactElement } from 'react';
import { Form, Input, InputNumber, Radio } from 'antd';
import { CategoryFeeTypes } from '../../../commons/interface/schemas/Category';

interface CategoryFormUpdateProps {
  editable: boolean;
  dataIndex: string;
  fieldName: string;
  record: any;
  index: number;
  submitting: boolean;
  children: ReactChild;
}

export default function CategoryFormUpdate(props: CategoryFormUpdateProps): ReactElement {
  const { editable, submitting, dataIndex, fieldName, index, record, children, ...restProps } = props;
  const inputNode: any = {
    name: <Input placeholder="Danh mục" />,
    estimate: <InputNumber className="w-100" placeholder="Dự kiến" min={0} />,
    fee: <InputNumber className="w-100" placeholder="Phí" min={0} />,
    feeType: (
      <Radio.Group
        className="ms-0"
        options={[
          { label: 'Số lượng', value: CategoryFeeTypes.AMOUNT },
          { label: 'Phần trăm', value: CategoryFeeTypes.PERCENT },
        ]}
      />
    ),
  };
  const rules: any = {
    name: [],
    estimate: [],
    fee: [],
    feeType: [],
  };
  return (
    <td {...restProps}>
      {editable ? (
        <Form.Item name={fieldName} rules={rules[fieldName]}>
          {inputNode[fieldName]}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}
