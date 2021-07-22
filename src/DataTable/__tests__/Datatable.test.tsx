import React from "react";
import { render, screen } from "@testing-library/react";
import { Table, TableRow } from "..";

const oneData = [
  {
    username: "a",
    age: 2,
    email : "a@gmail.com",
  },
];
const data = [
  {
    username: "a",
    age: 2,
    email : "a@gmail.com",
  },
  {
    username: "b",
    age: 45,
    email : "b@gmail.com",
  },
];

describe("Datatable component", () => {
  test("should have empty items", () => {
    render(
      <Table data={[]}>
        <TableRow id='username' />
        <TableRow id='age' />
      </Table>
    );

    expect(screen.getByRole("rowgroup").children.length).toEqual(0);
  });

  test("should have two items and render all text content", () => {
    render(
      <Table data={data}>
        <TableRow id='username' />
        <TableRow id='age' />
      </Table>
    );

    expect(screen.getByRole("rowgroup").children.length).toEqual(data.length);
    data.forEach(item => {
      expect(screen.getByText(item.username)).toBeInTheDocument();
      expect(screen.getByText(item.age)).toBeInTheDocument();
    })
  });

  test("should have three items in a row", async () => {
    render(
      <Table data={data}>
        <TableRow id='username' />
        <TableRow id='age' />
        <TableRow id='email' />
      </Table>
    );

    expect(screen.getByRole("rowgroup").children.length).toEqual(data.length);
    const rows = await screen.findAllByRole("row");
    expect(rows.length).toEqual(data.length);

    rows.forEach(currentRow => {
      expect(currentRow.children.length).toEqual(3);
    });

  });

  test("should have two items and rerender with one item", () => {
    const { rerender } = render(
      <Table data={data}>
        <TableRow id='username' />
        <TableRow id='age' />
      </Table>
    );
    expect(screen.getByRole("rowgroup").children.length).toEqual(data.length);

    rerender(
      <Table data={oneData}>
        <TableRow id='username' />
        <TableRow id='age' />
      </Table>
    );
    expect(screen.getByRole("rowgroup").children.length).toEqual(1);
  });
});
