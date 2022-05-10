import React, { ReactElement, useState } from 'react';
import { Button, DatePicker, Form, Modal } from 'antd';
import moment, { Moment } from 'moment';
import useTime from '../../hooks/useTime';

export default function MonthSelector(): ReactElement {
  const { monthSelected } = useTime();
  const [visible, setVisible] = useState(false);
  const onShow = () => {
    setVisible(true);
  };
  const onHide = () => {
    setVisible(false);
  };
  const onChangeMonth = (value: Moment | null) => {
    console.log('value: ', value);
  };
  return (
    <>
      <Modal title="Chọn tháng thống kê dữ liệu" visible={visible} onCancel={onHide}>
        <Form.Item label="Tháng" labelCol={{ span: 8 }}>
          <DatePicker onChange={onChangeMonth} picker="month" defaultPickerValue={moment(monthSelected, 'MM')} />
        </Form.Item>
      </Modal>
      <Button onClick={onShow}>Chọn tháng</Button>
    </>
  );
}
