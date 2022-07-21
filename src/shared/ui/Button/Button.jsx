import { useMemo } from "react";
import styles from "./Button.module.css";
export default function Button({
  children,
  className = "",
  type = "button",
  variant = "text",
  color = "primary",
  fullwidth = false,
  rightAdorment = null,
  leftAdorment = null,
  ...rest
}) {
  const classes = useMemo(() => {
    const btnStyles = [styles[variant], styles[color]];
    if (fullwidth) {
      btnStyles.push(styles.fullwidth);
    }

    return btnStyles;
  }, [color, variant, leftAdorment, rightAdorment, fullwidth]);

  return (
    <button
      type={type}
      className={`${classes.join(" ")} ${className}`}
      {...rest}
    >
      {leftAdorment && leftAdorment}
      {children}
      {rightAdorment && rightAdorment}
    </button>
  );
}
