import "cross-fetch/polyfill";
import { render, screen } from "../../utils/test-utils";
import "@testing-library/jest-dom";

import { Alert } from ".";

test('content is displayed', async () => {
    render(<Alert>Sample Content</Alert>)

    expect(screen.getByRole('alert')).toHaveTextContent('Sample Content')
})

/** Only test if the severity props is being passed correctly
 * since we are using a wrapper. if severity is getting
 * passed, then wrapper is working as expected */
test('stlying is applied based on "severity"',async () => {
    render(<Alert severity="success">Sample Content</Alert>)

    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledSuccess')
})