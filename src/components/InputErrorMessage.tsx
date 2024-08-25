
interface IProps {
    msg?: string;
  }
  const InputErrorMessage = ({ msg }: IProps) => {
    return msg ? (
      <span className="error" >{msg}</span>
    ) : null;
  };
  
  export default InputErrorMessage;
  