
import { useLoaderData } from "react-router-dom";

import { getEmployees } from "../lib/employees";

export default function Employees() {
    const employees = useLoaderData();

    return (
        <>
            <h1>Employees</h1>
            <div>
                {employees.map((employee) => {
                    return (
                        <p key={employee.emp_id}>{employee.emp_name}</p>
                    )
                })}
            </div>
            
        </>
    );
}


export async function loader() {
    const employees = getEmployees();
    return employees;
}