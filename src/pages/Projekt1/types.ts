export interface Action {
  name: string;
  predecessors: string[];
  time: number;
  ES?: number;
  EF?: number;
  LS?: number;
  LF?: number;
  slack?: number;
  critical?: boolean;
}
