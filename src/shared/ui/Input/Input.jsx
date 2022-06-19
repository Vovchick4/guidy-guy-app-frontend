export default function Input({ type = "text", error, ...inputProps }) {
  return (
    <div>
      <input type={type} {...inputProps} />
      <p>{error}</p>
    </div>
  );
}
