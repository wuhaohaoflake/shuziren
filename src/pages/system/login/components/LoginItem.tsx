import React from 'react';
import { Form, Input } from 'antd';
import ItemMap from './map';
import LoginContext from './LoginContext';
import { FormItemProps } from 'antd/es/form/FormItem';

export type WrapperLoginITemProps = LoginItemProps;
export interface LoginItemProps extends FormItemProps {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface LoginItemType {
  UserName: React.FC<WrapperLoginITemProps>;
  Password: React.FC<WrapperLoginITemProps>;
}

export type LoginItemKeyType = keyof typeof ItemMap;

const getFormItemOptions = ({
  defaultValue,
  customProps = {},
  rules,
  onChange,
}: LoginItemProps) => {
  const options: {
    defaultValue?: LoginItemProps['defaultValue'];
    rules?: LoginItemProps['rules'];
    onChange?: LoginItemProps['onChange'];
  } = {
    rules: rules || (customProps.rules as LoginItemProps['rules']),
  };
  if (defaultValue) {
    options.defaultValue = defaultValue;
  }
  if (onChange) {
    options.onChange = onChange;
  }
  return options;
};

const LoginItem: React.FC<LoginItemProps> = props => {
  const { name, placeholder, onChange, type } = props;

  const options = getFormItemOptions(props);
  return (
    <Form.Item name={name} {...options}>
      {type == 'Password' ? (
        <Input.Password
          placeholder={placeholder}
          onChange={onChange}
          size="middle"
        />
      ) : (
        <Input placeholder={placeholder} onChange={onChange} size="middle" />
      )}
    </Form.Item>
  );
};

const LoginItems: Partial<LoginItemType> = {};

Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItems[key] = (props: LoginItemProps) => (
    <LoginContext.Consumer>
      {context => (
        <LoginItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
        ></LoginItem>
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItems;
