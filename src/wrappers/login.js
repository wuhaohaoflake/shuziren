import { Redirect, useStore } from 'umi';
import { message } from 'antd';
import { getCurrentUser } from '@/utils/user';
export default props => {
  if (props.location.pathname == '/login') {
    return props.children;
  }
};
