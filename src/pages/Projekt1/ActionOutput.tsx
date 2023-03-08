import calculateCPM from './cpm';
import { Action } from './types';
import styles from './styles.module.scss';

interface ActionOutputProps {
  actions: Action[];
  setActions: (actions: Action[]) => void;
}

export default function ActionOutput({
  actions,
  setActions,
}: ActionOutputProps) {
  const calculate = () => {
    setActions(calculateCPM(actions));
  };
  return (
    <div>
      <table className={styles['input-table']}>
        <thead>
          <tr>
            <th>Czynność</th>
            <th>Czas trwania</th>
            <th>ES</th>
            <th>EF</th>
            <th>LS</th>
            <th>LF</th>
            <th>Rezerwa</th>
            <th>Czynność krytyczna</th>
          </tr>
        </thead>
        <tbody>
          { actions.map((action) => (
            <tr key={action.name}>
              <td>{action.name}</td>
              <td>{action.time}</td>
              <td>{action.ES}</td>
              <td>{action.EF}</td>
              <td>{action.LS}</td>
              <td>{action.LF}</td>
              <td>{action.slack}</td>
              <td>{action.critical ? 'Tak' : 'Nie'}</td>
            </tr>
          )) }
        </tbody>
      </table>
      <button onClick={calculate} type="button">Oblicz</button>
    </div>
  );
}
