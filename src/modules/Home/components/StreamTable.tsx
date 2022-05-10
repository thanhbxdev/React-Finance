import React, { ReactElement, useState } from 'react';
import { Stream } from '../../../commons/interface/schemas/Stream';
import { Divider, Form, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import CurrencyFormat from '../../../components/shared-components/CurrencyFormat';
import { Category } from '../../../commons/interface/schemas/Category';
import ItemFormUpdate from './ItemFormUpdate';
import ItemFooterForm from './ItemFooterForm';
import { SourceCurrency } from '../../../commons/interface/schemas/Account';
import useSource from '../../../hooks/useSource';
import useStream from '../../../hooks/useStream';
import useCategory from '../../../hooks/useCategory';
import StreamService from '../../../services/stream.service';

interface StreamTableProps {
  type: 'INCOME' | 'EXPENSE';
}

function StreamTable(props: StreamTableProps): ReactElement {
  const { type } = props;
  const [form] = Form.useForm();
  const [formFooter] = Form.useForm();
  const { sources } = useSource();
  const { incomes, expenses, loadStreams } = useStream();
  const { incomeCategories, expenseCategories } = useCategory();
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const onEdit = (record: any): void => {
    form.setFieldsValue({
      ...record,
      time: record.time ? moment(record.time) : null,
      category: record.category._id,
      source: record.source._id,
    });
    setEditingId(record._id);
  };
  const onCancelEdit = () => {
    setEditingId(null);
    form.resetFields();
    setEditingId(null);
    setSubmitting(false);
  };

  const handleUpdate = async (values: any): Promise<void> => {
    const { price, category, time, title, source } = values;
    if (editingId) {
      setSubmitting(true);
      const data = {
        time: time?.valueOf(),
        price,
        title,
        categoryId: category,
        sourceId: source,
      };
      const res = price ? await StreamService.update(editingId, data) : await StreamService.delete(editingId);
      if (res) {
        onCancelEdit();
        loadStreams();
      }
    }
  };

  const columns: ColumnsType<Stream> = [
    {
      title: 'Ngày',
      dataIndex: 'time',
      width: '20%',
      render: (value: number) => <Typography.Text>{value ? moment(value).format('DD/MM/YYYY') : '-'}</Typography.Text>,
    },
    {
      title: 'Số tiền (Phí nếu có)',
      dataIndex: 'amount',
      width: '20%',
      render: (value: number, doc: Stream) => (
        <Space>
          <CurrencyFormat value={value} />
          {doc.fee > 0 && <CurrencyFormat italic type="secondary" prefix="(" suffix=")" value={doc.fee} />}
        </Space>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'title',
      width: '20%',
      render: (value: string) => <Typography.Text>{value}</Typography.Text>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      width: '20%',
      render: (value: Category) => <Typography.Text>{value.name}</Typography.Text>,
    },
    {
      title: 'Nguồn',
      dataIndex: 'source',
      width: '20%',
      render: (value: SourceCurrency | null) => <Typography.Text>{value?.name}</Typography.Text>,
    },
  ].map((col: any) => {
    return {
      ...col,
      onCell: record => ({
        record,
        editable: editingId === record._id,
        dataIndex: col.dataIndex,
        title: col.title,
        categories: type === 'INCOME' ? incomeCategories : expenseCategories,
        submitting,
        currencies: sources,
      }),
    };
  });

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      form.submit();
    }
  };
  return (
    <div>
      <Typography.Title level={3} className="text-orange">
        {type === 'INCOME' ? 'Thu nhập' : 'Chi tiêu'}
      </Typography.Title>
      <Divider />
      <Form form={form} onFinish={handleUpdate} onBlur={onCancelEdit} onKeyDown={handleKeyDown}>
        <Table
          columns={columns}
          dataSource={type === 'INCOME' ? incomes : expenses}
          pagination={false}
          components={{
            body: {
              cell: ItemFormUpdate,
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
          footer={() => (
            <ItemFooterForm formFooter={formFooter} onClickForm={onCancelEdit} callback={loadStreams} formType={type} />
          )}
        />
      </Form>
    </div>
  );
}

export default StreamTable;
