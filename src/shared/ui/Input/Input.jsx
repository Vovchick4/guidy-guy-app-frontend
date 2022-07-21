import { useMemo } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./Input.module.css";
import fadeIn from "../../../css/anim/fadeIn.module.css";

export default function Input({
  type = "text",
  error,
  color = "primary",
  variant = "default",
  rightAdorment = null,
  leftAdorment = null,
  ...inputProps
}) {
  const classes = useMemo(() => {
    const inputStyles = [
      styles.input,
      styles[`input_${variant}`],
      styles[color],
    ];

    if (rightAdorment) {
      inputStyles.push(styles.rightAdorment);
    }

    if (leftAdorment) {
      inputStyles.push(styles.leftAdorment);
    }

    if (error) {
      inputStyles.push(styles.inputError);
    }

    return inputStyles;
  }, [rightAdorment, leftAdorment, variant, error]);

  return (
    <div className={styles.input_content}>
      {rightAdorment && (
        <div className={styles.rightAdorment}>{rightAdorment}</div>
      )}
      {leftAdorment && (
        <div className={styles.leftAdorment}>{leftAdorment}</div>
      )}

      <input className={classes.join(" ")} type={type} {...inputProps} />

      <CSSTransition
        in={!!error}
        unmountOnExit
        classNames={fadeIn}
        timeout={340}
      >
        <p className={styles.error_text}>{error}</p>
      </CSSTransition>
    </div>
  );
}
