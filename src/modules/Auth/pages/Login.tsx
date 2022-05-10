import { ReactElement, useState } from 'react';
import { Button, Form, Input } from 'antd';
import AuthService from '../../../services/auth.service';
import { Account } from '../../../commons/interface/schemas/Account';
import { connect } from 'react-redux';
import { authLogin } from '../../../redux/reducer/auth.reducer';
import { ACCESS_TOKEN_KEY } from '../../../constants';

const initialValues = {
  email: 'dev.namnv@gmail.com',
  password: 'kutataxoa24h',
};

interface LoginProps {
  autoLogin?(isLoggedIn: boolean, user: Account): void;
}

function Login(props: LoginProps): ReactElement {
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (values: object): void => {
    setSubmitting(true);
    setTimeout(() => {
      AuthService.login(values).then(res => {
        setSubmitting(false);
        if (res) {
          if (props.autoLogin) {
            props.autoLogin(true, res.account);
          }
          localStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
          window.location.href = '/';
        }
      });
    }, 500);
  };
  return (
    <div style={{ margin: 'auto', padding: 24, width: 400 }} className="border">
      <Form initialValues={initialValues} onFinish={handleSubmit} labelCol={{ span: 8 }} labelAlign="left">
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button loading={submitting} htmlType="submit" type="primary">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default connect(null, { authLogin })(Login);
