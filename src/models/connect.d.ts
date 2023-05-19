import { IStateLogin } from './login';
import { IResourceSate } from './resource';
import { IUserSate } from './use';
import { ILibraryState } from './library';
import { IRuleState } from './rule';
import { IConfigRuleState } from './configCard';

export interface ILoading {
  effects: {
    [key: string]: boolean | undefined;
  };
}

export interface ConnectState {
  loading: ILoading;
  login: IStateLogin;
  resource: IResourceSate;
  user: IUserSate;
  library: ILibraryState;
  rule: IRuleState;
  configCard: IConfigRuleState;
}
