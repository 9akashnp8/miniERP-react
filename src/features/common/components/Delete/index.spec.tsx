import "cross-fetch/polyfill";
import { render, screen } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Delete from ".";

test("sample test", async () => {
  render(<Delete employeeId="2" />);

  await userEvent.click(screen.getByText("Delete"));

  expect(screen.getByRole("menuitem")).toHaveTextContent("Confirm?");
});
