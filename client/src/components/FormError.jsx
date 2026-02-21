const FormError = ({ message }) =>
  message ? <p className="mt-1 text-xs text-red-600">{message}</p> : null;

export default FormError;
