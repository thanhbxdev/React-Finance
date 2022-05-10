import React, { ReactElement } from 'react';
import { Col, Row, Tooltip, Typography } from 'antd';
import StreamTable from '../components/StreamTable';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import Flex from '../../../components/shared-components/Flex';

function Editor(): ReactElement {
  return (
    <div className="I-editor">
      <Row className="I-header">
        <Flex justifyContent="between" className="w-100">
          <Typography>
            Thay đổi hoặc thêm danh mục bằng cách cập nhật các bảng Chi phí và Thu nhập trong trang tính Tóm tắt.
          </Typography>
          <Link to="/" type="link">
            <Tooltip title="Chuyển sang Home">
              <AiOutlineHome size={24} />
            </Tooltip>
          </Link>
        </Flex>
      </Row>
      <Row gutter={32} className="I-content">
        <Col span={12}>
          <StreamTable type="EXPENSE" />
        </Col>
        <Col span={12}>
          <StreamTable type="INCOME" />
        </Col>
      </Row>
    </div>
  );
}

export default Editor;
