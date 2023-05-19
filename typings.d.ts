declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

//请求接口全局接口
interface IGlobalParams {
  accessId: string;
  accessKey: string;
}

interface IApiResult {
  pageNo: number;
  pageSize: number;
  pagerows: any[];
  totalCount: number;
}
