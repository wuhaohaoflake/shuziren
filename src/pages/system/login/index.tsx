import React from 'react';
import { Dispatch, connect } from 'umi';
import { ConnectState } from '@/models/connect.d.ts';
import Icon from '../../../components/PageIcon';

import LoginForm from './components';
import './styles.less';

const { UserName, Password, LoginSubmit } = LoginForm;

interface LoginFromProps {
  dispatch: Dispatch;
  submitting?: boolean;
}

const Login: React.FC<LoginFromProps> = props => {
  const handleSubmit = (values: string[]) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: values,
    });
  };

  return (
    <div id="loginBox">
      <div className="left_box"></div>
      <div className="main_box">
        <div className="right_box">
          <LoginForm onSubmit={handleSubmit}>
            <UserName
              name="UserName"
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <Password
              name="Password"
              placeholder="请输入密码"
              type="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            />
            <LoginSubmit loading={props.submitting}>登录</LoginSubmit>
          </LoginForm>
          <div className="orther-icon">
            <span
              style={{ fontSize: '20px', color: '#999', marginRight: '15px' }}
            >
              第三方登录
            </span>
            <Icon
              style={{
                fontSize: '32px',
                marginRight: '15px',
                cursor: 'pointer',
              }}
              type="icon-weixin"
            />
            <Icon
              style={{ fontSize: '32px', cursor: 'pointer' }}
              type="icon-qq"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ loading }: ConnectState) => {
  return {
    submitting: loading.effects['login/login'],
  };
})(Login);
