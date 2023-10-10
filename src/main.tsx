import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'; // place import before Box
import Root from './features/common/routes/root';
import ErrorPage from './error-page';
import EmployeeTable from './features/employee/routes/list';
import LaptopTable from './features/laptop/routes/list';
import Login from './features/auth/routes/login';
import RequireAuth from './features/auth/RequireAuth';
import EmployeeDetail from './features/employee/routes/detail';
import LaptopDetail from './features/laptop/routes/detail';
import LaptopHistory from './features/laptop/routes/history';
import LaptopCreate from './features/laptop/routes/create';
import EmployeeCreate from './features/employee/routes/create';
import EmployeeHistory from './features/employee/routes/history';
import EmployeeEdit from './features/employee/routes/edit';
import AssignLaptop from './features/employee/routes/assignLaptop';
import LaptopEdit from './features/laptop/routes/edit';
import SelectLaptop from './features/employee/routes/selectLaptop';
import AdminRootRoute from './features/common/routes/admin';
import AdminDasboardRoute from './features/common/routes/admin/dashboard';
import DepartmentAdminRoute from './features/common/routes/admin/departments';
import DesignationAdminRoute from './features/common/routes/admin/designations';

// 3rd part
import{
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { store } from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import "@fontsource/inter"

// import { theme, darkTheme } from "./lib/theme";
import { theme } from './features/common/theme';

const router = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Root />,
                children: [
                    {
                        path: "employee",
                        element: <EmployeeTable />
                    },
                    {
                        path: "employee/create",
                        element: <EmployeeCreate />
                    },
                    {
                        path: "employee/:id",
                        element: <EmployeeDetail />
                    },
                    {
                        path: "employee/:id/history",
                        element: <EmployeeHistory />
                    },
                    {
                        path: "employee/:id/edit",
                        element: <EmployeeEdit />
                    },
                    {
                        path: 'employee/:id/assign',
                        element: <AssignLaptop />
                    },
                    {
                        path: 'employee/:id/laptops',
                        element: <SelectLaptop />
                    },
                    {
                        path: "laptop",
                        element: <LaptopTable />
                    },
                    {
                        path: "laptop/create",
                        element: <LaptopCreate />
                    },
                    {
                        path: "laptop/:id",
                        element: <LaptopDetail />
                    },
                    {
                        path: "laptop/:id/edit",
                        element: <LaptopEdit />
                    },
                    {
                        path: "laptop/:id/history",
                        element: <LaptopHistory />
                    },
                    {
                        path: "admin",
                        element: < AdminRootRoute />,
                        children: [
                            {
                                path: "",
                                element: <AdminDasboardRoute />
                            },
                            {
                                path: "departments",
                                element: <DepartmentAdminRoute />
                            },
                            {
                                path: "designations",
                                element: <DesignationAdminRoute />
                            }
                        ]
                    },
                ]
            }
        ]
    },
    {
        path: "login",
        element: <Login />,
        errorElement: <ErrorPage />
    }
])

ReactDOM.createRoot(document.getElementById('root') as Element).render(
    <React.StrictMode>
        <Provider store={store}>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
)
