import { useState } from 'react';
import { Action } from './types';
import ActionInput from './ActionInput';
import ActionOutput from './ActionOutput';
import examples from './examples';

function Projekt1() {
  const [actions, setActions] = useState<Action[]>(examples[2]);
  return (
    <div className="projekt1">
      <h1>Strona pod projekt 1</h1>
      <ActionInput actions={actions} setActions={setActions} />
      <ActionOutput actions={actions} setActions={setActions} />
    </div>
  );
}

export default Projekt1;
