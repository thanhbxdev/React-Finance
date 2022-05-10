import React, { ReactElement } from 'react';
import { Col, DatePicker, Form, FormInstance, Input, InputNumber, Row, Select } from 'antd';
import StreamService from '../../../services/stream.service';
import useCategory from '../../../hooks/useCategory';
import useSource from '../../../hooks/useSource';
import moment from 'moment';

interface IncomeFooterFormProps {
  callback(): void;

  onClickForm(): void;

  formFooter: FormInstance;
  formType: 'INCOME' | 'EXPENSE';
}

function ItemFooterForm(props: IncomeFooterFormProps): ReactElement {
  const { callback, onClickForm, formFooter, formType } = props;
  const { incomeCategories, expenseCategories } = useCategory();
  const { sources } = useSource();

  const handleSubmit = async (values: any): Promise<void> => {
    const data = { ...values, time: values.time ? values.time.valueOf() : null };
    const response = await StreamService.create({ ...data, type: formType });
    if (response) {
      callback();
      formFooter.resetFields();
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      formFooter.submit();
    }
  };
  return (
    <Form onFinish={handleSubmit} form={formFooter} onKeyDown={handleKeyDown}>
      <Row gutter={16}>
        <Col span={5}>
          <Form.Item name="time" rules={[{ required: true }]}>
            <DatePicker
              disabledDate={current => current < moment().startOf('month') || current > moment().endOf('month')}
              onClick={onClickForm}
              className="w-100"
              placeholder="Ngày"
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="price" rules={[{ required: true }]}>
            <InputNumber onClick={onClickForm} className="w-100" placeholder="Số tiền" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="title">
            <Input onClick={onClickForm} className="w-100" placeholder="Mô tả" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="categoryId" rules={[{ required: true }]}>
            <Select
              onClick={onClickForm}
              className="w-100"
              placeholder="Danh mục"
              options={(formType === 'INCOME' ? incomeCategories : expenseCategories).map(i => ({
                label: i.name,
                value: i._id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="sourceId" rules={[{ required: true }]}>
            <Select
              onClick={onClickForm}
              className="w-100"
              placeholder="Nguồn"
              options={sources.map(i => ({ label: i.name, value: i._id }))}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default ItemFooterForm;
