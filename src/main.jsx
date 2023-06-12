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
import EmployeeCreate from './routes/employee/create';

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
                        path: "laptop",
                        element: <LaptopTable />
                    },
                    {
                        path: "laptop/:id",
                        element: <LaptopDetail />
                    }
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

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <CssBaseline />
            <ThemeProvider theme={darkTheme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
)
