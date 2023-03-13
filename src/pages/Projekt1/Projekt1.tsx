import { useState } from 'react';
import { Action } from './types';
import ActionInput from './ActionInput';
import ActionOutput from './ActionOutput';
import examples from './examples';
import Gantt from './Gantt';
import calculateCPM from './cpm';

function Projekt1() {
  const [actions, setActions] = useState<Action[]>(examples[2]);
  const [isCalculated, setIsCalculated] = useState(false);
  const calculate = () => {
    setActions(calculateCPM(actions));
    setIsCalculated(true);
  };
  return (
    <div className="projekt1">
      <h1>Strona pod projekt 1</h1>
      <ActionInput actions={actions} setActions={setActions} setIsCalculated={setIsCalculated} />
      <button onClick={calculate} type="button">Oblicz</button>
      {isCalculated ? (
        <>
          <ActionOutput actions={actions} />
          <Gantt actions={actions} />
        </>
      ) : null}
    </div>
  );
}

export default Projekt1;
