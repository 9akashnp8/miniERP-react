import * as React from 'react';

export interface FCWithChildren {
    children: React.ReactNode
}

export type OnClickEvent = React.MouseEvent<HTMLButtonElement>

export type OnSubmitEvent = React.FormEvent<HTMLFormElement> & {
    target: HTMLFormElement & {
        username: { value: string};
        password: { value: string };
    }
}

// API Objects
export interface HistoryItem {
    id: number;
    history_date: string;
    field: string;
    old_value?: string | number;
    new_value?: string | number;
    history_user?: string
}

export interface LaptopHistory {
    laptop: string;
    history: HistoryItem[]
}

// Others
export interface FormFieldMapping {
    dept_id: string,
    desig_id: string,
    loc_id: string,
    lk_emp_id: string,
    emp_name: string,
    emp_email: string,
    emp_phone: string,
    emp_status: string,
    emp_date_joined: string,
    emp_date_exited: string
}