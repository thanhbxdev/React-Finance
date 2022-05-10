import { Category } from '../../../commons/interface/schemas/Category';
import { DatePicker, Form, Input, InputNumber, Select } from 'antd';
import React, { ReactChild } from 'react';
import { SourceCurrency } from '../../../commons/interface/schemas/Account';
import moment from 'moment';

interface ItemFormUpdateProps {
  categories: Category[];
  currencies: SourceCurrency[];
  editable: boolean;
  dataIndex: string;
  record: any;
  index: number;
  submitting: boolean;
  children: ReactChild;
}

function ItemFormUpdate(props: ItemFormUpdateProps) {
  const {
    submitting,
    categories = [],
    editable,
    dataIndex,
    record,
    index,
    children,
    currencies = [],
    ...restProps
  } = props;

  const timeInput = {
    element: (
      <DatePicker
        disabledDate={current => current < moment().startOf('month') || current > moment().endOf('month')}
        format="DD/MM/YYYY"
        placeholder="Ngày"
      />
    ),
    rules: [{ required: true }],
  };
  const priceInput = {
    element: <InputNumber placeholder="Tiền" min={0} />,
    rules: [],
  };
  const titleInput = { element: <Input placeholder="Mô tả" />, rules: [] };
  const categoryInput = {
    element: <Select placeholder="Danh mục" options={categories.map(i => ({ label: i.name, value: i._id }))} />,
    rules: [{ required: true }],
  };
  const currencyInput = {
    element: <Select placeholder="Nguồn" options={currencies.map(i => ({ label: i.name, value: i._id }))} />,
    rules: [{ required: true }],
  };

  let inputNode;
  let rules: any[] = [];

  switch (dataIndex) {
    case 'time': {
      inputNode = timeInput.element;
      rules = timeInput.rules;
      break;
    }
    case 'price': {
      inputNode = priceInput.element;
      rules = priceInput.rules;
      break;
    }
    case 'title': {
      inputNode = titleInput.element;
      rules = titleInput.rules;
      break;
    }
    case 'category': {
      inputNode = categoryInput.element;
      rules = categoryInput.rules;
      break;
    }
    default: {
      inputNode = currencyInput.element;
      rules = currencyInput.rules;
      break;
    }
  }

  return (
    <td {...restProps}>
      {editable ? (
        <Form.Item name={dataIndex} rules={rules}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}

export default ItemFormUpdate;
