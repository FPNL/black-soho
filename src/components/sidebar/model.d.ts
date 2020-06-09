export type SidebarPage = 'Entrance' | 'DeployCase' | 'ExposeHistory';
export interface PageList {
  Entrance: 'Entrance';
  DeployCase: 'DeployCase';
  ExposeHistory: 'ExposeHistory';
}

export type LRList = 'login' | 'register';
export interface LRForm {
  login: 'login';
  register: 'register';
}
export interface LRFormData {
  account: string;
  password: string;
}
