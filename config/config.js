import { defineConfig } from 'umi';
import { API_URL } from '../src/utils/apiurl';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  dva: {
    immer: true,
    hmr: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV,
  },
  proxy: {
    '/api': {
      target: API_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
    '/socket.io': {
      target: 'ws://10.30.81.29:8000',
      changeOrigin: true,
      pathRewrite: {
        '^/socket.io': '',
      },
    },
  },
  routes: [
    {
      path: '/login',
      key: '/login',
      title: '登录',
      wrappers: ['../wrappers/login'],
      component: '../pages/system/login',
    },
	{
		path: '/videoSet',
		key: '/videoSet',
		title: '视频制作',
		auth: ['0004'],
		showMenu: false,
		component: '../pages/videoMaker/newIndex',
		icon: 'icon-index',
		ifLogin: false,
	},
    {
      path: '/',
      redirect: '/videoSet',
    },
  ],
  chainWebpack: config => {
    config.merge({
      module: {
        rules: [],
      },
    });
  },
});
