import { useState } from 'react';
import { Action } from './types';
import ActionInput from './ActionInput';
import ActionOutput from './ActionOutput';

function Projekt1() {
  const [actions, setActions] = useState<Action[]>([
    { name: 'A', time: 3, predecessors: [] },
    { name: 'B', time: 2, predecessors: ['A'] },
    { name: 'C', time: 5, predecessors: ['A'] },
    { name: 'D', time: 4, predecessors: ['B', 'C'] },
    { name: 'E', time: 2, predecessors: ['D'] },
    { name: 'F', time: 3, predecessors: ['D'] },
    { name: 'G', time: 2, predecessors: ['E', 'F'] },
    { name: 'H', time: 1, predecessors: ['G'] },
  ]);
  return (
    <div className="projekt1">
      <h1>Strona pod projekt 1</h1>
      <ActionInput actions={actions} setActions={setActions} />
      <ActionOutput actions={actions} setActions={setActions} />
    </div>
  );
}

export default Projekt1;
