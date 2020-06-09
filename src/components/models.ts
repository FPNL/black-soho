export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

type graphContent = {
  w: string;
  content: string[];
};
export interface StatsContent {
  [index: string]: string[];
}
export interface StatsGraph {
  [index: string]: graphContent;
}
