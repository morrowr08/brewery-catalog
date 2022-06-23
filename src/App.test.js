import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders brewery list view", () => {
  render(<App />);
  const headerElement = screen.getByText(/Brewery Catalog/i);
  expect(headerElement).toBeInTheDocument();
});
