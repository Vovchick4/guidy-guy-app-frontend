import { useMemo } from "react";
import styles from "./Button.module.css";
export default function Button({
  children,
  className = "",
  type = "button",
  variant = "text",
  color = "primary",
  rightAdorment = null,
  leftAdorment = null,
  ...rest
}) {
  const classes = useMemo(() => {
    return [styles[variant], styles[color]];
  }, []);

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
