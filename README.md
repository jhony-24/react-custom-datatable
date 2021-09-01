# React custom datatable

Table component to render repeated data and customizable.


## Installation
```bash
npm i react-custom-datatable
```
or
```bash
yarn add react-custom-datatable
```

## Introduction

Creating a mock data


```javascript
const mockData = [
  {
    username: "jack",
    age: 15,
    nationality: "Spain",
  },
  {
    username: "mark",
    age: 32,
    nationality: "Italy",
  },
];
```

Using the previous mock data.

```javascript
import { Table, TableRow } from "react-custom-datatable";

export function App() {
  return (
    <div>
      <Table data={mockData}>
        <TableRow rowId="username" />
        <TableRow rowId="age" />
        <TableRow rowId="nationality" />
      </Table>
    </div>
  );
}
```

Sometimes we need to personalize a value. Then it is better use a render prop. For example, display the image according to nationality.

```javascript
import { Table, TableRow } from "react-custom-datatable";

export function App() {
  return (
    <div>
      <Table data={mockData}>
        <TableRow rowId="username" />
        <TableRow rowId="age" />
        <TableRow rowId="nationality">
          {({ item }) => {
            return <img src={`/images/nationalities${item.nationality}.png`} />;
          }}
        </TableRow>
      </Table>
    </div>
  );
}
```

By default is rendering the key inside the th. 
Whatever is it. you can create a custom render method replacing the key value.

```javascript
import { Table, TableRow } from "react-custom-datatable";

export function App() {
  return (
    <div>
      <Table data={mockData}>
        <TableRow 
         rowId="username"
         renderHeader={() => {
           return <button>Custom username</button>
         }} />  
      </Table>
    </div>
  );
}
```
## API

### ```Table```
Props
* **data**: Receive a array of object to render on the table
* **th**: Add properties in th tag
* **thead**: Add properties in thead tag
* **tbody**: Add properties in tbody tag

### ```TableRow```
* **rowId**: Name of the object key.
* **renderHeader**: Create a custom content inside the th tag otherwise it always show the rowId value.
* **renderCell**: Replace the content inside the td tag.
* **children**: Render a children prop with the current object data.
