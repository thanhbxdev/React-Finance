import React, { ReactElement, useState } from 'react';
import { Divider, Form, Space, Table, Typography } from 'antd';
import CategoryFormUpdate from './CategoryFormUpdate';
import CategoryFooterForm from './CategoryFooterForm';
import { Category, CategoryFeeTypes } from '../../../commons/interface/schemas/Category';
import { ColumnsType } from 'antd/es/table';
import useCategory from '../../../hooks/useCategory';
import CurrencyFormat from '../../../components/shared-components/CurrencyFormat';
import CategoryService from '../../../services/category.service';
import PercentFormat from '../../../components/shared-components/PercentFormat';

interface CategoryTableProps {
  type: 'INCOME' | 'EXPENSE';

  onChange(): void;
}

export default function CategoryTable(props: CategoryTableProps): ReactElement {
  const { type, onChange } = props;
  const [formTable] = Form.useForm();
  const [formFooter] = Form.useForm();
  const { loadCategories, incomeCategories, expenseCategories } = useCategory();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<{ name: string; estimate: number } | null>(null);

  const onEdit = (record: Category): void => {
    formTable.setFieldsValue({
      name: record.name,
      estimate: record.estimate,
      fee: record.fee,
      feeType: record.feeType,
    });
    setInitialValues({ name: record.name, estimate: record.estimate });
    setEditingId(record._id);
  };
  const onCancelEdit = () => {
    setSubmitting(false);
    setEditingId(null);
    formTable.resetFields();
    setInitialValues(null);
  };
  const handleFinish = async (values: any) => {
    if (editingId && JSON.stringify(initialValues) !== JSON.stringify(values)) {
      setSubmitting(true);
      const res = values.name
        ? await CategoryService.update(editingId, values)
        : await CategoryService.delete(editingId);
      if (res) {
        loadCategories();
        onCancelEdit();
        onChange();
      }
    } else {
      onCancelEdit();
    }
  };

  const columns = (categoryType: 'INCOME' | 'EXPENSE'): ColumnsType<Category> => {
    const categoriesType = categoryType === 'INCOME' ? incomeCategories : expenseCategories;
    const estimate = categoriesType.reduce((a, b) => a + b.estimate, 0);
    const reality = categoriesType.reduce((a, b) => a + b.total, 0);
    const difference = categoriesType.reduce((a, b) => a + b.difference, 0);
    return [
      {
        title: (
          <Space direction="vertical">
            <div />
            <Typography.Text type="secondary" italic>
              Tổng
            </Typography.Text>
          </Space>
        ),
        width: '25%',
        align: 'right',
        dataIndex: 'name',
        fieldName: 'name',
        render: (value: string, doc: Category) => (
          <Space>
            {doc.feeType === CategoryFeeTypes.PERCENT ? (
              <PercentFormat type="secondary" italic prefix="(" suffix=")" hidden={!doc.fee} value={doc.fee} />
            ) : (
              <CurrencyFormat type="secondary" italic prefix="(" suffix=")" hidden={!doc.fee} value={doc.fee} />
            )}
            <Typography>{value}</Typography>
          </Space>
        ),
      },
      {
        title: (
          <Space direction="vertical">
            <Typography.Text strong>Dự kiến</Typography.Text>
            <CurrencyFormat value={estimate} type="secondary" italic />
          </Space>
        ),
        width: '25%',
        align: 'right',
        dataIndex: 'estimate',
        fieldName: 'estimate',
        render: (value: number) => <CurrencyFormat value={value} />,
      },
      {
        title: (
          <Space direction="vertical">
            <Typography.Text strong>Thực tế</Typography.Text>
            <CurrencyFormat value={reality} type="secondary" italic />
          </Space>
        ),
        width: '25%',
        dataIndex: 'total',
        fieldName: 'fee',
        align: 'right',
        render: (value: number) => <CurrencyFormat value={value} />,
      },
      {
        title: (
          <Space direction="vertical">
            <Typography.Text strong>Chênh lệch</Typography.Text>
            <CurrencyFormat textSuccess value={difference} type="secondary" italic />
          </Space>
        ),
        width: '25%',
        dataIndex: 'difference',
        fieldName: 'feeType',
        align: 'right',
        render: (value: number) => <CurrencyFormat textSuccess value={value} />,
      },
    ].map((col: any) => {
      return {
        ...col,
        onCell: record => ({
          record,
          editable: editingId === record._id,
          fieldName: col.fieldName,
          dataIndex: col.dataIndex,
          title: col.title,
          submitting,
        }),
      };
    });
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      formTable.submit();
    }
  };

  return (
    <Form form={formTable} onFinish={handleFinish} onKeyDown={handleKeyDown} onBlur={onCancelEdit}>
      <Typography.Title level={3} className="text-orange">
        {type === 'INCOME' ? 'Thu nhập' : 'Chi phí'}
      </Typography.Title>
      <Divider />
      <Table
        components={{
          body: {
            cell: CategoryFormUpdate,
          },
        }}
        onRow={record => {
          return {
            onClick: () => {
              if (!editingId) {
                onEdit(record);
              }
              formFooter.resetFields();
            },
            onDoubleClick: onCancelEdit,
          };
        }}
        columns={columns(type)}
        dataSource={type === 'INCOME' ? incomeCategories : expenseCategories}
        footer={() => <CategoryFooterForm form={formFooter} callback={loadCategories} type={type} />}
        pagination={false}
      />
    </Form>
  );
}
