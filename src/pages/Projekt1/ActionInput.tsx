import { useRef, useState } from 'react';
import type { Action } from './Projekt1';
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
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  const addAction = () => {
    const name = nameRef.current?.value;
    const time = timeRef.current?.value;
    const from = fromRef.current?.value;
    const to = toRef.current?.value;

    if (!name || !time || !from || !to) {
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
      from: Number(from),
      to: Number(to),
    }]);
  };
  return (
    <div>
      <span className={styles.error}>{error}</span>
      <table className={styles['input-table']}>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Czas</th>
            <th>Start</th>
            <th>Koniec</th>
          </tr>
        </thead>
        <tbody>
          { actions.map((action) => (
            <tr key={action.name}>
              <td>{action.name}</td>
              <td>{action.time}</td>
              <td>{action.from}</td>
              <td>{action.to}</td>
            </tr>
          )) }
        </tbody>
        <tfoot>
          <tr>
            <td><input type="text" ref={nameRef} /></td>
            <td><input type="number" ref={timeRef} /></td>
            <td><input type="number" ref={fromRef} /></td>
            <td><input type="text" ref={toRef} /></td>
          </tr>
        </tfoot>
      </table>
      <button onClick={addAction} type="button">Add</button>
    </div>
  );
}
