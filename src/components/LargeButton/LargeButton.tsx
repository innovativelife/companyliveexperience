type LargeButtonProps = {
  onClick: () => void;
  label: string;
};

const LargeButtonProps = ({ onClick, label }: LargeButtonProps) => {
  return (
    <div className="flex py-3 px-4">
      <button
        className="flex w-full min-w-[84px] max-w-[480px] h-12 px-5 items-center justify-center overflow-hidden cursor-pointer rounded-full bg-primary text-text text-base"
        onClick={onClick}
      >
        <h2>{label}</h2>
      </button>
    </div>
  );
};

export default LargeButtonProps;
