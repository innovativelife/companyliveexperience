import ColoredSvgButtonSkeleton from "../ColoredSvgButton/ColoredSvgButtonSkeleton";
const ColoredSvgButtonListSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-start gap-2 px-4">
      <ColoredSvgButtonSkeleton />
      <ColoredSvgButtonSkeleton />
    </div>
  );
};

export default ColoredSvgButtonListSkeleton;
