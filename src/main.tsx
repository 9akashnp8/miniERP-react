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
import HardwareDetail from './features/laptop/routes/detail';
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
import BranchAdminRoute from './features/common/routes/admin/branches';
import BrandAdminRoute from './features/common/routes/admin/laptopBrands';
import UserAdminRoute from './features/common/routes/admin/users';
import EmployeeSettingsAdminRoute from './features/common/routes/admin/employeeSettings';
import HardwareSettingsAdminRoute from './features/common/routes/admin/hardwareSettings';
import BuildingAdminRoute from './features/common/routes/admin/buildings';

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

const adminRoutes = {
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
        },
        {
            path: "branches",
            element: <BranchAdminRoute />
        },
        {
            path: "buildings",
            element: <BuildingAdminRoute />
        },
        {
            path: "laptop-brands",
            element: <BrandAdminRoute />
        },
        {
            path: "users",
            element: <UserAdminRoute />
        },
        {
            path: "employee-settings",
            element: <EmployeeSettingsAdminRoute />
        },
        {
            path: "hardware-settings",
            element: <HardwareSettingsAdminRoute />
        }
    ]
};

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
                        path: "hardware",
                        element: <LaptopTable />
                    },
                    {
                        path: "hardware/create",
                        element: <LaptopCreate />
                    },
                    {
                        path: "hardware/:uuid",
                        element: <HardwareDetail />
                    },
                    {
                        path: "hardware/:id/edit",
                        element: <LaptopEdit />
                    },
                    {
                        path: "hardware/:id/history",
                        element: <LaptopHistory />
                    },
                    adminRoutes,
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
