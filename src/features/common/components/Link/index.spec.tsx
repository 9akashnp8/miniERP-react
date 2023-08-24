import "cross-fetch/polyfill";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../utils/test-utils";
import { Route, Routes } from "react-router-dom";

import Link from ".";

const About = () => <div>You are on the about page</div>;
const Home = () => <div>You are home</div>;
const App = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </div>
);

/** Ensure navigations works via the 
 * MaterialUI x React Router
 * Link Wrapper */
test("navigation works as expected", async () => {
  render(<App />);
  const user = userEvent.setup();

  expect(screen.getByText(/You are home/i)).toBeInTheDocument();

  await user.click(screen.getByText(/about/i));
  expect(screen.getByText(/You are on the about page/i)).toBeInTheDocument();
});
