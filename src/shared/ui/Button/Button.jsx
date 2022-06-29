export default function Button({ children, type = "button", ...rest }) {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  );
}
