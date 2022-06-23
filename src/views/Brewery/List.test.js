import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";

test("renders brewery list", async () => {
  render(<List />);
  const header = screen.getByText("Brewery Catalog");
  expect(header).toBeInTheDocument();
});

test("checks pagination disabled", async () => {
  render(<List />);
  const gtButton = screen.getByTestId("next");
  const ltButton = screen.getByTestId("back");

  expect(ltButton).toBeDisabled();
  userEvent.click(gtButton);
  expect(ltButton).not.toBeDisabled();
});
