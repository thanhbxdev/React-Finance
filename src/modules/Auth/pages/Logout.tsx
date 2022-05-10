import { ReactElement, useEffect } from 'react';
import { Spin, Typography } from 'antd';
import { connect } from 'react-redux';
import { authLogout } from '../../../redux/reducer/auth.reducer';
import { useNavigate } from 'react-router-dom';

interface LogoutProps {
  authLogout(): void;
}

function Logout(props: LogoutProps): ReactElement {
  const navigate = useNavigate();
  useEffect(() => {
    props.authLogout();
    setTimeout(() => {
      navigate('/login');
    }, 1000);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Spin />
      <Typography>Logging out</Typography>
    </div>
  );
}

export default connect(null, { authLogout })(Logout);
