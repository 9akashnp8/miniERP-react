import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useDeleteEmployeeMutation } from '../../features/employees/employeesApiSlice';

export default function ({ employeeId }) {
    const navigate = useNavigate();
    const [ content, setContent ] = useState("Delete")
    const [ deleteResource ]  = useDeleteEmployeeMutation();

    const handleDelete = async () => {
        deleteResource(employeeId)
            .then((response) => {
                // Check if deletion was successful
                navigate('/employee/')
            })
    };

    function ConfirmDelete() {
        return (
            <Typography
                sx={{ color: 'red' }}
                onClick={(e) => handleDelete()}
            >
                Confirm?
            </Typography>
        )
    }

    return (
        <MenuItem onClick={(e) => setContent(ConfirmDelete)}>
            {content}
        </MenuItem>
    )
}