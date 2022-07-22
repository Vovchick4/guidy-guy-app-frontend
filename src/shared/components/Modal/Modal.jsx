import { Fragment } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import styles from "./Modal.module.css";
import fadeIn from "../../../css/anim/fadeIn.module.css";

export default function Modal({
  open,
  className,
  children,
  onClose,
  headerText = "",
}) {
  return (
    <CSSTransition in={open} unmountOnExit classNames={fadeIn} timeout={120}>
      <Fragment>
        <div className={styles.dimmer} onMouseDown={onClose} />
        <div className={`${styles.modal} ${className}`}>
          {headerText && (
            <div className={styles.header_content}>
              <p>{headerText}</p>
              <button
                className={styles.header_content_btn_icon}
                onClick={onClose}
              >
                <IoIosCloseCircleOutline
                  className={styles.icon}
                  color="white"
                  fontSize={34}
                />
              </button>
            </div>
          )}
          {children}
        </div>
      </Fragment>
    </CSSTransition>
  );
}
