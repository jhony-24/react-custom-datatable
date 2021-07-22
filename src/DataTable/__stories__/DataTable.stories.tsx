import React from 'react';
import {Table, TableRow} from ".."

export default {
  title: 'Example/Button',
};



interface ItemType { 
  user: string;
  age: number;
}
const data : ItemType[] = [
  {
    user : "mark",
    age : 34
  },
  {
    user : "dev",
    age : 19
  },
]

export const Default = () => {
  return(
    <Table data={data}>
      <TableRow id="user" />
      <TableRow id="age" />
    </Table>
  )
}