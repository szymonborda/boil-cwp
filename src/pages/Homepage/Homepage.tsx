import { Link } from "react-router-dom";
import styles from "./styles.module.scss"

function Homepage() {
  return (
    <div className={styles["homepage-container"]}>
      <h1 className={styles["homepage-header"]}>Homepage</h1>
      <Link to="/projekt1">Projekt 1</Link>
      <Link to="/projekt2">Projekt 2</Link>
    </div>
  )
}

export default Homepage;
