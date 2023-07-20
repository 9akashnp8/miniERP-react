export interface FormFieldMapping {
    dept_id: string;
    desig_id: string;
    loc_id: string;
    lk_emp_id: string;
    emp_name: string;
    emp_email: string;
    emp_phone: string;
    emp_status: string;
    emp_date_joined: string;
    emp_date_exited: string
}

/**
 * mapping of field names used in db vs
 * field names used in employee create
 * form.
 */
export const FORM_DB_FIELD_MAPPING = {
    dept_id: "department",
    desig_id: "designation",
    loc_id: "branch",
    lk_emp_id: "employeeId",
    emp_name: "employeeName",
    emp_email: "emailId",
    emp_phone: "mobileNumber",
    emp_status: "employeeStatus",
    emp_date_joined: "dateJoined",
    emp_date_exited: "dateExited"
}
