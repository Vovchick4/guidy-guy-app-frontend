import { useMemo } from "react";
import { CSSTransition } from "react-transition-group";
import InputIcon from "./InputIcon";

import styles from "./Input.module.css";
import fadeIn from "../../../css/anim/fadeIn.module.css";

export default function Input({
  type = "text",
  className = "",
  error,
  color = "primary",
  variant = "default",
  fullwidth = false,
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

    if (fullwidth) {
      inputStyles.push(styles.fullwidth);
    }

    if (rightAdorment) {
      inputStyles.push(styles.rightAdornmentVisible);
    }

    if (leftAdorment) {
      inputStyles.push(styles.leftAdornmentVisible);
    }

    if (error) {
      inputStyles.push(styles.inputError);
    }

    return inputStyles;
  }, [rightAdorment, leftAdorment, color, variant, error, fullwidth]);

  return (
    <div className={styles.input_content}>
      {rightAdorment && (
        <div className={styles.rightAdorment}>{rightAdorment}</div>
      )}
      {leftAdorment && (
        <div className={styles.leftAdorment}>{leftAdorment}</div>
      )}

      <input
        className={`${classes.join(" ")} ${className}`}
        type={type}
        {...inputProps}
      />

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

Input.InputIcon = InputIcon;
