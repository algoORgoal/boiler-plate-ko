import React, { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Typography } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
const { Title } = Typography;

const LandingPage = (props) => {
  // useEffect(() => {
  //   axios.get('/api/hello').then((response) => console.log(response.data));
  // }, []);

  const onClickHandler = () =>
    axios.get('api/users/logout').then((response) => {
      if (response.data.success) {
        props.history.push('/login');
      } else {
        alert('로그아웃 실패');
      }
    });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <EditTwoTone
            style={{
              fontSize: '30px',
            }}
          />
        </div>
        <Title level={2}>랜딩 페이지</Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button onClick={onClickHandler}>로그아웃</button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LandingPage);
