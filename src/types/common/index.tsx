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
