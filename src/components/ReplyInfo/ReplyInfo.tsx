import { Employee } from "../../features/employees/employeeTypes";

type ReplyInfoProps = {
  employee?: Employee;
  time: string;
};

const ReplyInfo = ({ employee, time = "" }: ReplyInfoProps) => {
  return (
    <div className="flex w-full flex-row items-start justify-start gap-x-3">
      <p className="font-bold leading-none">
        {employee?.firstName ?? "Unknown"} {employee?.lastName ?? "Unknown"}
      </p>
      <h3 className="p-0">{time}</h3>
    </div>
  );
};

export default ReplyInfo;
