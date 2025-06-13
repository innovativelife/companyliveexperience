//Css
import "./LargeInputField.css";

type LargeInputFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

const LargeInputField = ({ value, onChange }: LargeInputFieldProps) => {
  return (
    <div className="inputContainer">
      <label className="inputLabel">
        <textarea
          placeholder="Type your message here..."
          className="inputArea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        ></textarea>
      </label>
    </div>
  );
};

export default LargeInputField;
