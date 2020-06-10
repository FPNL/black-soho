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

export interface ExposeHistoryForm {
  type: string;
  company: string;
  location: string[];
  webName: string;
  webLink: string;
  contact: string;
  items: string[];
  quality: string;
  context: string;
  [i: string]: string[] | string;
}
export type TypicalFormList = { label: string; value: string }[]
export type TypicalSelectInputList = string[]
