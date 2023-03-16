import { Action } from './types';
import styles from './styles.module.scss';

interface ActionOutputProps {
  actions: Action[];
}

const getCriticalLabel = (isCritical: boolean | undefined) => {
  if (isCritical === undefined) return '';
  return isCritical ? '✔️' : '❌';
};

export default function ActionOutput({
  actions,
}: ActionOutputProps) {
  return (
    <div>
      <table className={styles['input-table']}>
        <thead>
          <tr>
            <th>Czynność</th>
            <th>Czas trwania</th>
            <th title="EARLY START">ES</th>
            <th title="EARLY FINISH">EF</th>
            <th title="LATE START">LS</th>
            <th title="LATE FINISH">LF</th>
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
              <td>{getCriticalLabel(action.critical)}</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}
