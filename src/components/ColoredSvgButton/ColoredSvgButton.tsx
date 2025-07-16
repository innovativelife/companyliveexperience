type ColoredSvgButtonProps = {
  imgSrc: string;
  label: string;
};

const ColoredSvgButtonProps = ({ imgSrc, label }: ColoredSvgButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-2 bg-background py-2.5 w-20 text-center">
      <div className="bg-inputs rounded-full p-2.5 fill-secondary">
        <svg className="w-6 h-6" viewBox="0 0 256 256">
          <path d={imgSrc} className="fill-text border-0"></path>
        </svg>
      </div>
      <p>{label}</p>
    </div>
  );
};

export default ColoredSvgButtonProps;
