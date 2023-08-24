import "cross-fetch/polyfill";
import "@testing-library/jest-dom";
import { render, screen } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from 'react-router-dom'

import Delete from ".";

beforeEach(() => {
  const App = () => (
    <div>
      <Delete employeeId="" />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/employee" element={<div>Employee Detail Page</div>} />
      </Routes>
    </div>
  )
  render(<App />)
})

test("confirmation message is displayed on click", async () => {
  await userEvent.click(screen.getByText("Delete"));
  expect(screen.getByRole("menuitem")).toHaveTextContent("Confirm?");
});

test("redirection works on delete",async () => {
  // screen.debug();
  await userEvent.click(screen.getByText("Delete"));
  await userEvent.click(screen.getByText("Confirm?"));
  expect(screen.getByText('Employee Detail Page2')).toBeInTheDocument();
})