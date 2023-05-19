import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import LoginContext, { LoginContextProps } from './LoginContext';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    return `${prefix}${i}`;
  };
})();

//Parameters<T> 的作用是用于获得函数的参数类型组成的元组类型。
type TabPaneProps = Parameters<typeof TabPane>[0];

interface LoginTabProps extends TabPaneProps {
  tabUtil: LoginContextProps['tabUtil'];
}

const LoginTab: React.FC<LoginTabProps> = props => {
  const { children, tabUtil } = props;
  const uniqueId = generateId('login-tab-');
  useEffect(() => {
    if (tabUtil) {
      tabUtil.addTab(uniqueId);
    }
  }, []);
  return <TabPane {...props}>{children}</TabPane>;
};

const WrapperContext: React.FC<TabPaneProps> & { typeName: string } = props => (
  <LoginContext.Consumer>
    {context => <LoginTab tabUtil={context.tabUtil} {...props}></LoginTab>}
  </LoginContext.Consumer>
);

WrapperContext.typeName = 'LoginTab';

export default WrapperContext;
