import React, { useState } from 'react';
import { Form, Tabs } from 'antd';
import LoginContext from './LoginContext';
import LoginTab from './LoginTab';
import LoginItem, { LoginItemProps } from './LoginItem';
import LoginSubmit from './LoginSubmit';

export interface LoginProps {
  children: any;
  onSubmit: (values: string[]) => void;
}

interface LoginType extends React.FC<LoginProps> {
  Tab: typeof LoginTab;
  LoginSubmit: typeof LoginSubmit;
  UserName: React.FC<LoginItemProps>;
  Password: React.FC<LoginItemProps>;
}

const LoginForm: LoginType = props => {
  const [tabs, setTabs] = useState<string[]>([]);
  const TabChildren: React.ReactComponentElement<typeof LoginTab>[] = [];
  const OtherChildren: React.ReactElement<unknown>[] = [];
  React.Children.forEach(
    props.children,
    (
      child:
        | React.ReactComponentElement<typeof LoginTab>
        | React.ReactElement<unknown>,
    ) => {
      if (!child) {
        return;
      }
      if ((child.type as { typeName: string }).typeName == 'LoginTab') {
        TabChildren.push(child as React.ReactComponentElement<typeof LoginTab>);
      } else {
        OtherChildren.push(child as React.ReactElement<unknown>);
      }
    },
  );

  return (
    <LoginContext.Provider
      value={{
        tabUtil: {
          addTab: id => {
            setTabs([...tabs, id]);
          },
          removeTab: id => {
            setTabs(tabs.filter(currentId => currentId != id));
          },
        },
      }}
    >
      <div className="login_main_box">
        <h2
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: '30px',
            marginBottom: '30px',
          }}
        >
          账号密码登录
        </h2>
        <Form
          size="large"
          className="login_form"
          onFinish={values => {
            if (props.onSubmit) {
              props.onSubmit(values);
            }
          }}
        >
          {tabs.length > 0 ? (
            <React.Fragment>
              <Tabs defaultActiveKey="account">{TabChildren}</Tabs>
              {OtherChildren}
            </React.Fragment>
          ) : (
            props.children
          )}
        </Form>
      </div>
    </LoginContext.Provider>
  );
};

LoginForm.Tab = LoginTab;
LoginForm.UserName = LoginItem.UserName!;
LoginForm.Password = LoginItem.Password!;
LoginForm.LoginSubmit = LoginSubmit;

export default LoginForm;
