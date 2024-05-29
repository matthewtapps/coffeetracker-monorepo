import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("text Coffee should be in the document", () => {
  render(<App />);
  expect(screen.getByText("Coffee Tracker")).toBeInTheDocument();
})

test("theme switcher should be in the document", () => {
  render(<App />);
  expect(screen.getByLabelText("Switch theme")).toBeInTheDocument()
})

describe("default-sorted paginated table data", () => {
  test("first page contains Proud Mary roaster", () => {
    render(<App />);
    expect(screen.getAllByText("Proud Mary")[0]).toBeInTheDocument()
  })
  test("second page contains Test Roaster roaster", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Next"))
    expect(screen.getByText("Test Roaster")).toBeInTheDocument()
  })
})

describe("global filtering table data", () => {
  test("filter bean origin by \"Test Origin\", then \"Test Roaster\" roaster is in the document", () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText("Filter..."), { target: { value: "Test Origin" } })
    expect(screen.getByText("Test Roaster")).toBeInTheDocument()
  })
  test("filter notes by \"delicate\", then \"Another Roaster\" roaster and \"Another Origin\" bean origin are in the document", () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText("Filter..."), { target: { value: "delicate" } })
    expect(screen.getAllByText("Another Roaster")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Another Origin")[0]).toBeInTheDocument()
  })
})