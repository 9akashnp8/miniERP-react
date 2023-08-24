import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'

import { RouterProvider, MemoryRouter } from "react-router-dom";
import { store } from '../../../store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../../../lib/theme';

const router: any = []

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                {/* <RouterProvider router={router} /> */}
                <MemoryRouter>
                    {children}
                </MemoryRouter>
            </ThemeProvider>
        </Provider>
    )
}

const customRenderer = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRenderer as render}