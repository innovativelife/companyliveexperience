//Components
import Avatar from "../Avatar/Avatar";
import UserBarSkeleton from "./UserBarSkeleton";

//Data
import { Employee } from "../../features/employees/employeeTypes";

type UserBarProps = {
  employee?: Employee;
  descriptor: string;
  employeeLoading: boolean;
};

const UserBar = ({ employee, descriptor, employeeLoading }: UserBarProps) => {
  return (
    <div className="flex items-center gap-4 py-2 px-4 min-h-[72px]">
      {employeeLoading ? (
        <UserBarSkeleton />
      ) : (
        <>
          <Avatar employee={employee} size="large" employeeLoading={false} />
          <div className="flex flex-col justify-center">
            <p>
              {employee?.firstName ?? "Unknown"}{" "}
              {employee?.lastName ?? "Unknown"}
            </p>
            <h3>{descriptor}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default UserBar;
