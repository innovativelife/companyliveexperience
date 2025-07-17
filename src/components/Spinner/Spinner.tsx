//Css
// import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="flex justify-center p-1">
      <div className="w-6 h-6 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;
