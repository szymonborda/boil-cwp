import { useState } from 'react';
import ActionInput from './ActionInput';

export interface Action {
  name: string;
  from: number;
  to: number;
  time: number;
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
