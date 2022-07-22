import { Fragment, useMemo } from "react";
import { Spinner } from "../";
import styles from "./Button.module.css";
export default function Button({
  children,
  className = "",
  isLoading = false,
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
      {isLoading && <Spinner />}
      {!isLoading && (
        <Fragment>
          {leftAdorment && leftAdorment}
          {children}
          {rightAdorment && rightAdorment}
        </Fragment>
      )}
    </button>
  );
}
