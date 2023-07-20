import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'; // place import before Box
import Root from './routes/root';
import ErrorPage from './error-page';
import EmployeeTable from './routes/employee/list';
import LaptopTable from './routes/laptop/list';
import Login from './routes/login';
import RequireAuth from './features/auth/RequireAuth';
import EmployeeDetail from './routes/employee/detail';
import LaptopDetail from './routes/laptop/detail';
import LaptopHistory from './routes/laptop/history';
import EmployeeCreate from './routes/employee/create';
import EmployeeHistory from './routes/employee/history';
import EmployeeEdit from './routes/employee/edit';

// 3rd part
import{
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { store } from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import "@fontsource/inter"

import { theme, darkTheme } from "./lib/theme";

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
                        path: "laptop",
                        element: <LaptopTable />
                    },
                    {
                        path: "laptop/:id",
                        element: <LaptopDetail />
                    },
                    {
                        path: "laptop/:id/history",
                        element: <LaptopHistory />
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
            <ThemeProvider theme={darkTheme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
)
