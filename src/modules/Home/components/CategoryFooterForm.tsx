import React, { ReactElement } from 'react';
import { Col, Form, FormInstance, Input, InputNumber, Radio, Row } from 'antd';
import CategoryService from '../../../services/category.service';
import { CategoryFeeTypes } from '../../../commons/interface/schemas/Category';

interface CategoryFooterFormProps {
  type: 'INCOME' | 'EXPENSE';
  callback(): void;
  form: FormInstance;
}

const initialValues = {
  name: '',
  estimate: null,
  fee: 0,
  feeType: CategoryFeeTypes.AMOUNT,
};

export default function CategoryFooterForm(props: CategoryFooterFormProps): ReactElement {
  const { callback, type, form } = props;
  const handleSubmit = (values: object) => {
    CategoryService.create({ ...values, type }).then(res => {
      if (res) {
        callback();
        form.resetFields();
      }
    });
  };
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      form.submit();
    }
  };
  return (
    <Form onFinish={handleSubmit} form={form} onKeyDown={handleKeyDown} initialValues={initialValues}>
      <Row gutter={32}>
        <Col span={6}>
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input placeholder="Tên danh mục" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="estimate" help="Dự kiến chi phí">
            <InputNumber className="w-100" min={0} placeholder="Dự kiến" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="fee" help="Phí cho danh mục">
            <InputNumber className="w-100" placeholder="Phí" min={0} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="feeType" help="Đơn vị phí">
            <Radio.Group
              options={[
                { label: 'Số lượng', value: CategoryFeeTypes.AMOUNT },
                { label: 'Phần trăm', value: CategoryFeeTypes.PERCENT },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
