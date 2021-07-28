# React custom datatable

Table component to render repeated data and customizable.

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
export function App() {
  return (
    <div>
      <Table data={mockData}>
        <TableRow id="username" />
        <TableRow id="age" />
        <TableRow id="nationality" />
      </Table>
    </div>
  );
}
```

Sometimes we need to personalize a value. Then it is better use a render prop. For example, display the image according to nationality.

```javascript
export function App() {
  return (
    <div>
      <Table data={mockData}>
        <TableRow id="username" />
        <TableRow id="age" />
        <TableRow id="nationality">
          {({ item }) => {
            return <img src={`/images/nationalities${item.nationality}.png`} />;
          }}
        </TableRow>
      </Table>
    </div>
  );
}
```

BY default it is rendering the key inside the th. 
Whatever is it. you can create a custom render method replacing the key value.

```javascript
export function App() {
  return (
    <div>
      <Table data={mockData}>
        <TableRow 
         id="username"
         renderHeader={() => {
           return <button>Custom username</button>
         }} />  
      </Table>
    </div>
  );
}
```
