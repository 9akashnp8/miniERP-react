import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    let errorText: string = 'Unknown Error'

    if (isRouteErrorResponse(error)) {
        errorText = error.statusText;
    }

    return (
        <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{errorText}</i>
        </p>
        </div>
    );
}