//Css
// import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="flex justify-center p-1" data-oid="spinner-container">
      <div
        className="w-6 h-6 border-4 border-secondary border-t-transparent rounded-full animate-spin"
        data-oid="spinner-spinner"
      />
    </div>
  );
};

export default Spinner;
