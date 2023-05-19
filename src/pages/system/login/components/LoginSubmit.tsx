import React from 'react';
import { Form, Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import classnames from 'classnames';
import styles from '../styles.less';

interface LoginSubmitProps extends ButtonProps {
  className?: string;
}

const LoginSubmit: React.FC<LoginSubmitProps> = ({ className, ...rest }) => {
  const clsString = classnames(styles.submit, className);
  return (
    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        block
        className={clsString}
        {...rest}
      />
    </Form.Item>
  );
};
export default LoginSubmit;
