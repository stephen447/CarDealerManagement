import styles from "./Warning.module.css";
function Warning({ message }) {
  return <p className={styles["wanrning-container"]}>{message}</p>;
}

export default Warning;
