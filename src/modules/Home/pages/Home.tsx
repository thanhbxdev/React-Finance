import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Alert, Button, Col, message, Modal, Progress, Row, Space, Tooltip, Typography } from 'antd';
import '../style.scss';
import { BiEdit } from 'react-icons/bi';
import Flex from '../../../components/shared-components/Flex';
import { Link } from 'react-router-dom';
import SourceCurrencies from '../components/SourceCurrencies';
import CategoryTable from '../components/CategoryTable';
import { Analytic } from '../../../commons/interface/Analytic';
import StreamService from '../../../services/stream.service';
import moment from 'moment';
import CurrencyFormat from '../../../components/shared-components/CurrencyFormat';
import useSource from '../../../hooks/useSource';
import useCategory from '../../../hooks/useCategory';
import MonthSelector from '../../../components/shared-components/MonthSelector';
import PercentFormat from '../../../components/shared-components/PercentFormat';

const analyticDefault: Analytic = {
  income: {
    estimate: 0,
    reality: 0,
    difference: 0,
    percent: 0,
  },
  expense: {
    estimate: 0,
    reality: 0,
    difference: 0,
    percent: 0,
  },
};

export default function Home(): ReactElement {
  const { sources, loadSources } = useSource();
  const { categories } = useCategory();
  const [analytic, setAnalytic] = useState<Analytic>(analyticDefault);
  const [showSource, setShowSource] = useState(false);

  const onShowSource = () => {
    setShowSource(true);
  };
  const onHideSource = () => {
    setShowSource(false);
  };

  const loadAnalytic = useCallback(() => {
    StreamService.analytic({
      startDate: moment().startOf('month').valueOf(),
      endDate: moment().endOf('month').valueOf(),
    }).then(res => {
      setAnalytic(res);
    });
  }, []);

  useEffect(() => {
    loadAnalytic();
  }, []);
  return (
    <div className="I-home">
      <div>
        <Row className="I-header" gutter={32}>
          <Col span={12}>
            <div>
              <MonthSelector />
              <Typography.Title level={5}>B???t ?????u</Typography.Title>
              <Typography>
                ?????t s??? d?? ban ?????u c???a b???n trong <b>Ngu???n ti???n</b>, sau ???? t??y ch???nh c??c danh m???c v?? s??? ti???n chi ti??u d???
                ki???n v??o c??c b???ng 'Thu nh???p' v?? 'Chi ph??' b??n d?????i.
              </Typography>
              <Typography>
                Khi b???n nh???p d??? li???u v??o tab 'Giao d???ch', trang t??nh n??y s??? t??? ?????ng c???p nh???t ????? hi???n th??? b???n t??m t???t chi
                ti??u c???a b???n trong th??ng.
              </Typography>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Flex justifyContent="between">
                <div className="w-100 me-3">
                  <Typography.Title level={5}>Ghi ch??</Typography.Title>
                  {(!sources.length || !categories.length) && (
                    <Alert
                      type="warning"
                      showIcon
                      message="Thi???u d??? li???u ban ?????u"
                      description="Vui l??ng th??m Danh m???c v?? Ngu???n ti???n ????? b???t ?????u th???ng k??"
                      className="w-100"
                    />
                  )}
                  <Modal title="Qu???n l?? ngu???n ti???n" visible={showSource} onCancel={onHideSource} footer={false}>
                    <SourceCurrencies />
                  </Modal>
                </div>
                <Space>
                  <Button type="default" onClick={onShowSource}>
                    Ngu???n ti???n
                  </Button>
                  <Link
                    to="/editor"
                    type="link"
                    onClick={e => {
                      if (!sources.length || !categories.length) {
                        e.preventDefault();
                        message.error('Vui l??ng th??m Danh m???c v?? Ngu???n ti???n ????? b???t ?????u th???ng k??');
                      }
                    }}
                  >
                    <Button icon={<BiEdit size={24} />}>Ch???nh s???a</Button>
                  </Link>
                </Space>
              </Flex>
            </div>
          </Col>
        </Row>
        <Row className="I-analytic" gutter={32}>
          <Col span={12}>
            <div>
              <Typography.Title level={3} className="text-orange">
                Ng??n s??ch h??ng th??ng
              </Typography.Title>
              <code>Chart th???ng k?? S??? d?? ?????u k??? v?? cu???i k???</code>
            </div>
          </Col>
          <Col span={12}>
            <Row gutter={16}>
              <Col span={12}>
                <Typography.Title level={5}>S??? d?? ?????u k???:</Typography.Title>
                {sources.map((i, index) => (
                  <Flex key={`source-currency-${index}`}>
                    <Typography>{i.name}: </Typography>
                    <CurrencyFormat
                      textSuccess
                      className="ms-3"
                      value={
                        i.histories.find(i => i.time === moment().startOf('month').format('YYYY/MM/DD'))
                          ?.initialAmount || 0
                      }
                    />
                  </Flex>
                ))}
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>S??? d?? hi???n t???i:</Typography.Title>
                {sources.map((i, index) => (
                  <Flex key={`source-currency-${index}`}>
                    <Typography>{i.name}: </Typography>
                    <CurrencyFormat
                      textSuccess
                      className="ms-3"
                      value={
                        i.histories.find(i => i.time === moment().startOf('month').format('YYYY/MM/DD'))
                          ?.currentAmount || 0
                      }
                    />
                  </Flex>
                ))}
              </Col>
            </Row>
            <code>Chart th???ng k??</code>
          </Col>
        </Row>
        <Row className="I-analytic-fast" gutter={32}>
          <Col span={12}>
            <Typography.Title level={3}>Chi ph??</Typography.Title>
            <Row gutter={16}>
              <Col span={12}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Typography.Text strong>D??? ki???n: </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <CurrencyFormat className="float-end" value={analytic.expense.estimate} />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Typography.Text strong>Th???c t???: </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <CurrencyFormat className="float-end" value={analytic.expense.reality} />
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Flex alignItems="center" justifyContent="between" className="h-100">
                  <Progress
                    strokeWidth={20}
                    strokeColor={{
                      '0%': '#7ed45b',
                      '100%': '#F00000',
                    }}
                    percent={analytic.expense.percent || 0}
                    showInfo={false}
                    className="me-3"
                  />
                  <PercentFormat strong value={analytic.expense.percent || 0} />
                </Flex>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Typography.Title level={3}>Thu nh???p</Typography.Title>
            <Row gutter={16}>
              <Col span={12}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Typography.Text strong>D??? ki???n: </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <CurrencyFormat className="float-end" value={analytic.income.estimate} />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Typography.Text strong>Th???c t???: </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <CurrencyFormat className="float-end" value={analytic.income.reality} />
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Flex alignItems="center" className="h-100">
                  <Progress
                    strokeWidth={20}
                    strokeColor={{
                      '0%': '#e96310',
                      '100%': '#87d068',
                    }}
                    percent={analytic.income.percent || 0}
                    showInfo={false}
                    className="me-3"
                  />
                  <PercentFormat strong value={analytic.income.percent || 0} />
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="I-editor" gutter={32}>
          <Col span={12}>
            <CategoryTable
              key="table-expense"
              onChange={() => {
                loadAnalytic();
                loadSources();
              }}
              type="EXPENSE"
            />
          </Col>
          <Col span={12}>
            <CategoryTable
              key="table-income"
              onChange={() => {
                loadAnalytic();
                loadSources();
              }}
              type="INCOME"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
