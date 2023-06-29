import { Typography } from "@mui/material"
import Employee from "../../model/Employee";
import { EmployeeForm } from "../forms/EmployeeForm";
import InputResult from "../../model/InputResult";

const AddEmployee: React.FC = () => {
    async function submitFn(empl: Employee): Promise<InputResult> {
        console.log(empl);
        return {status: "success", message: JSON.stringify(empl)};
    }
    return <EmployeeForm submitFn={submitFn}/>
}
export default AddEmployee;