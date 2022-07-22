import { Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Modal.module.css";
import fadeIn from "../../../css/anim/fadeIn.module.css";

export default function Modal({ open, className, children, onClose }) {
  return (
    <CSSTransition in={open} unmountOnExit classNames={fadeIn} timeout={120}>
      <Fragment>
        <div className={styles.dimmer} onMouseDown={onClose} />
        <div className={`${styles.modal} ${className}`}>{children}</div>
      </Fragment>
    </CSSTransition>
  );
}
