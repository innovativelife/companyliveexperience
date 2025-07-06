//Css
// import "./LargeInputField.css";

type LargeInputFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

const LargeInputField = ({ value, onChange }: LargeInputFieldProps) => {
  return (
    <div
      className="flex flex-wrap items-end gap-4 py-3 px-4 box-border"
      data-oid="large-input-field-container"
    >
      <label
        className="flex flex-col min-w-40 flex-1 box-border"
        data-oid="large-input-field-label"
      >
        <textarea
          placeholder="Type your message here..."
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text focus:outline-0 focus:ring-0 border-none bg-inputs focus:border-none min-h-36 placeholder:text-secondary p-4 text-base font-normal leading-normal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-oid="large-input-field-textarea"
        ></textarea>
      </label>
    </div>
  );
};

export default LargeInputField;
