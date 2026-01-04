import styles from "./Loader.module.css";

function Loader({ size = 32 }) {
  return (
    <div
      className={styles.loader}
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  );
}

export default Loader;
