import "cross-fetch/polyfill";
import { render, screen } from "../../utils/test-utils";
import "@testing-library/jest-dom";

import Grid from ".";

test('grid is not visible if hidden set to true',async () => {
    render(<Grid><Grid item hidden>Grid Content</Grid></Grid>)

    expect(screen.getByText('Grid Content')).toHaveStyle('display: none;')
})