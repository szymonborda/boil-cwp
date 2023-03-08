import { useState } from 'react';
import ActionInput from './ActionInput';

export interface Action {
  name: string;
  predecessors: string[];
  time: number;
  ES?: number;
  EF?: number;
  LS?: number;
  LF?: number;
  slack?: number;
}

function Projekt1() {
  const [actions, setActions] = useState<Action[]>([]);
  return (
    <div className="projekt1">
      <h1>Strona pod projekt 1</h1>
      <ActionInput actions={actions} setActions={setActions} />
    </div>
  );
}

export default Projekt1;
