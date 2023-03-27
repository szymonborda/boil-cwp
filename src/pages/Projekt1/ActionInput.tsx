import { useRef, useState } from 'react';
import { Action } from './types';
import styles from './styles.module.scss';

interface ActionInputProps {
  actions: Action[];
  setActions: (edges: Action[]) => void;
  setIsCalculated: (isCalculated: boolean) => void;
}

export default function ActionInput({
  actions,
  setActions,
  setIsCalculated,
}: ActionInputProps) {
  const [error, setError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const predecessorsRef = useRef<HTMLInputElement>(null);

  const addAction = () => {
    const name = nameRef.current?.value;
    const time = timeRef.current?.value;
    const predecessors = predecessorsRef.current?.value;

    if (!name || !time) {
      setError('Wypełnij wszystkie pola!');
      return;
    }

    if (actions.some((action) => action.name === name)) {
      setError('Czynność o takiej nazwie już istnieje!');
      return;
    }

    setError('');
    setIsCalculated(false);
    setActions([...actions, {
      name,
      time: Number(time),
      predecessors: predecessors !== '' ? predecessors?.split(',').map((predecessor) => predecessor.trim()) ?? [] : [],
    }]);
  };

  const removeAction = (name: string) => {
    setActions(actions.filter((action) => action.name !== name));
    setIsCalculated(false);
  };
  return (
    <div>
      <span className={styles.error}>{error}</span>
      <table className={styles['input-table']}>
        <thead>
          <tr>
            <th>Czynność</th>
            <th>Czas trwania</th>
            <th>Poprzednicy</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          { actions.map((action) => (
            <tr key={action.name}>
              <td>{action.name}</td>
              <td>{action.time}</td>
              <td>{action.predecessors.join(', ')}</td>
              <td><button onClick={() => removeAction(action.name)} type="button" className="buttonOutlined">Usuń</button></td>
            </tr>
          )) }
        </tbody>
        <tfoot>
          <tr>
            <td><input type="text" ref={nameRef} /></td>
            <td><input type="number" ref={timeRef} /></td>
            <td><input type="text" ref={predecessorsRef} /></td>
            <td><button onClick={addAction} type="button" className="buttonFilled">Dodaj</button></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
