import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Employee, fetchEmployees, employeeSelector } from "./employeeSlice";
// import "./user.css";
import { store } from "../../app/store";

function EmployeePage() {
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const selectedEmployees = useAppSelector(employeeSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoading(selectedEmployees.loading);
    setError(selectedEmployees.error);
    setEmployees(selectedEmployees.employees);
  }, [selectedEmployees]);
  function handleFetchEmployee() {
    dispatch(fetchEmployees());
  }
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {employees?.map((employee) => (
        <li key={employee.employeeNumber}>
          {employee.employeeNumber} | {employee.firstName} | {employee.lastName}
        </li>
      ))}
      <button className="btn" onClick={handleFetchEmployee}>
        Fetch
      </button>
    </div>
  );
}
export default EmployeePage;
