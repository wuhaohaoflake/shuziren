import { Redirect, useStore } from 'umi';
import { message } from 'antd';
export default props => {
  const resource = useStore().getState().resource;
  if (props.route.auth && resource.resources.indexOf(props.route.auth)) {
    return props.children;
  } else {
    return <Redirect to="/" />;
  }
};
