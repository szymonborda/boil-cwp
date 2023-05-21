import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

function Homepage() {
  return (
    <div className={styles['homepage-container']}>
      <div className="header">
        <h1>Badania Operacyjne i Logistyka</h1>
        <h4>Wybierz projekt</h4>
      </div>
      <div className="panelContainer" style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Link to="/projekt1">
          <button type="button" className="bigButtonPanel">Critical Path Method</button>
        </Link>
        <Link to="/projekt2">
          <button type="button" className="bigButtonPanel">Zagadnienie pośrednika</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
