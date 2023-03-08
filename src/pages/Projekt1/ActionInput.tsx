import { useRef, useState } from 'react';
import { Action } from './types';
import styles from './styles.module.scss';

interface ActionInputProps {
  actions: Action[];
  setActions: (edges: Action[]) => void;
}

export default function ActionInput({
  actions,
  setActions,
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
    setActions([...actions, {
      name,
      time: Number(time),
      predecessors: predecessors?.split(',').map((predecessor) => predecessor.trim()) ?? [],
    }]);
  };

  const removeAction = (name: string) => {
    setActions(actions.filter((action) => action.name !== name));
  };
  return (
    <div>
      <span className={styles.error}>{error}</span>
      <table className={styles['input-table']}>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Czas</th>
            <th>Poprzednicy</th>
          </tr>
        </thead>
        <tbody>
          { actions.map((action) => (
            <tr key={action.name}>
              <td>{action.name}</td>
              <td>{action.time}</td>
              <td>{action.predecessors.join(', ')}</td>
              <td><button onClick={() => removeAction(action.name)} type="button">Usuń</button></td>
            </tr>
          )) }
        </tbody>
        <tfoot>
          <tr>
            <td><input type="text" ref={nameRef} /></td>
            <td><input type="number" ref={timeRef} /></td>
            <td><input type="text" ref={predecessorsRef} /></td>
          </tr>
        </tfoot>
      </table>
      <button onClick={addAction} type="button">Dodaj</button>
    </div>
  );
}
