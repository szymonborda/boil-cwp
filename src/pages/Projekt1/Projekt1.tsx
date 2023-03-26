import { useRef, useState } from 'react';
import { Action } from './types';
import ActionInput from './ActionInput';
import ActionOutput from './ActionOutput';
import examples from './examples';
import Gantt from './Gantt';
import calculateCPM from './cpm';

function Projekt1() {
  const [actions, setActions] = useState<Action[]>(examples[2]);
  const [isCalculated, setIsCalculated] = useState(false);
  const startDate = useRef<HTMLInputElement>(null);
  const calculate = () => {
    setActions(calculateCPM(actions));
    setIsCalculated(true);
  };
  return (
    <div className="projekt1">
      <div className="header">
        <h1>Critical Path Method</h1>
        <h4>Projekt 1</h4>
      </div>
      <div className="panelContainer">
        <div className="panel">
          <div className="title">Wprowadzanie danych</div>
          <div className="subtitle">Data rozpoczęcia: <input type="date" name="startDate" ref={startDate} onChange={() => setIsCalculated(false)} style={{margin: '10px'}}/></div>
          <ActionInput actions={actions} setActions={setActions} setIsCalculated={setIsCalculated} />
          <button onClick={calculate} type="button" className="buttonFilled" style={{width: '96%', margin: '10px'}}>Oblicz</button>
        </div>
        
        {isCalculated ? (
          <>
            <div className="panel"><div className="title">Obliczenia</div><ActionOutput actions={actions} /></div>
            <div className="panel"><div className="title">Wykres Gantt'a</div><Gantt actions={actions} startDate={startDate.current?.value} /></div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Projekt1;
