import React, { ReactElement, useState } from 'react';
import { Button, Col, Form, FormInstance, Input, InputNumber, Modal, notification, Row, Space, Table } from 'antd';
import useSource from '../../../hooks/useSource';
import { ColumnsType } from 'antd/es/table';
import { SourceCurrency } from '../../../commons/interface/schemas/Account';
import CurrencyFormat from '../../../components/shared-components/CurrencyFormat';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
import AuthService from '../../../services/auth.service';

interface SourceCurrencyFormProps {
  handleSubmit(values: object): void;

  form: FormInstance;
}

const handleKeyDown = (event: any, form: FormInstance) => {
  if (event.key === 'Enter') {
    form.submit();
  }
};

function SourceCurrencyForm(props: SourceCurrencyFormProps) {
  const { handleSubmit, form } = props;
  return (
    <Form
      onFinish={handleSubmit}
      form={form}
      onKeyDown={event => {
        handleKeyDown(event, form);
      }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="name">
            <Input placeholder="Nguồn" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="initialAmount" help="Sau khi tạo sẽ không thẻ thay đổi số dư ban đầu">
            <InputNumber className="w-100" min={0} placeholder="Số dư ban đầu" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="fee" help="Mức phí hàng tháng. VD: phí SMS">
            <InputNumber className="w-100" min={0} placeholder="Phí hàng tháng" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

interface SourceCurrencyModalProps {
  show: boolean;

  onHide(): void;

  form: FormInstance;

  handleSubmit(values: object): void;

  submitting: boolean;
}

function SourceCurrencyModal(props: SourceCurrencyModalProps) {
  const { show, onHide, form, handleSubmit, submitting } = props;
  const onCancel = () => {
    onHide();
    form.resetFields();
  };
  return (
    <Modal
      title="Chỉnh sửa nguồn tiền"
      visible={show}
      onCancel={onCancel}
      onOk={form.submit}
      okButtonProps={{ loading: submitting }}
    >
      <Form form={form} onFinish={handleSubmit} labelCol={{ span: 6 }} labelAlign="left">
        <Form.Item label="Nguồn" name="name" rules={[{ required: true }]}>
          <Input placeholder="Nguồn tiền" />
        </Form.Item>
        <Form.Item label="Số dư" name="initialAmount">
          <InputNumber disabled className="w-100" placeholder="Số dư ban đầu" min={0} />
        </Form.Item>
        <Form.Item label="Phí" name="fee">
          <InputNumber disabled className="w-100" placeholder="Phí hàng tháng" min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default function SourceCurrencies(): ReactElement {
  const { sources, loadSources } = useSource();
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idSelected, setIdSelected] = useState<string | null>(null);

  const onShowModal = (values: SourceCurrency) => {
    setShowModal(true);
    formModal.setFieldsValue(values);
    setIdSelected(values._id);
  };
  const onHideModal = () => {
    setShowModal(false);
    form.resetFields();
    setIdSelected(null);
  };

  const handleSubmit = (values: object): void => {
    setSubmitting(true);
    AuthService.createCurrency(values).then(res => {
      if (res) {
        loadSources();
        form.resetFields();
      }
      setSubmitting(false);
    });
  };
  const onConfirmDelete = (doc: SourceCurrency): void => {
    Modal.confirm({
      title: 'Yêu cầu xóa',
      content: `Xác nhận xóa nguồn tiền: ${doc.name}?`,
      onOk() {
        AuthService.deleteCurrency(doc._id).then(res => {
          if (res) {
            notification.success(res);
            loadSources();
          }
        });
      },
    });
  };

  const handleUpdate = (values: object): void => {
    if (idSelected) {
      setSubmitting(true);
      AuthService.updateCurrency(idSelected, values).then(() => {
        onHideModal();
        setSubmitting(false);
        loadSources();
      });
    }
  };

  const columns: ColumnsType<SourceCurrency> = [
    {
      title: 'Nguồn',
      dataIndex: 'name',
      width: '25%',
    },
    {
      title: 'Số dư',
      dataIndex: 'initialAmount',
      width: '25%',
      render: value => <CurrencyFormat style={{ color: 'darkblue' }} value={value} />,
    },
    {
      title: 'Phí/tháng',
      dataIndex: 'fee',
      width: '25%',
      render: value => <CurrencyFormat style={{ color: 'darkblue' }} value={value} />,
    },
    {
      width: '25%',
      render: (doc: SourceCurrency) => (
        <Space>
          <Button
            icon={<AiFillEdit />}
            onClick={() => {
              onShowModal(doc);
            }}
          />
          <Button
            onClick={() => {
              onConfirmDelete(doc);
            }}
            icon={<AiOutlineDelete />}
            danger
          />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table
        dataSource={sources}
        columns={columns}
        footer={() => <SourceCurrencyForm handleSubmit={handleSubmit} form={form} />}
        pagination={false}
      />
      <SourceCurrencyModal
        handleSubmit={handleUpdate}
        show={showModal}
        form={formModal}
        onHide={onHideModal}
        submitting={submitting}
      />
    </div>
  );
}
