import {
  Children,
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";

interface TableProps<DataType> {
  children: ReactNode;
  data: DataType[];
}

interface TableRowProps<ItemDataType> {
  id?: string;
  index: any;
  children: ({ index: number, item: ItemDataType }) => ReactNode;
}

const dataTable = createContext({ data: [] });

export function Table<DataType>({ data, children }: TableProps<DataType>) {
  const cloneTdChildren = (index) => {
    return Children.map(children, (child) => {
      return cloneElement(child as ReactElement, {
        index,
      });
    });
  };
  return (
    <dataTable.Provider value={{ data }}>
      <table>
        <tbody>
          <dataTable.Consumer>
            {(context) => {
              return context.data.map((_item, index) => (
                <tr key={index}>{cloneTdChildren(index)}</tr>
              ));
            }}
          </dataTable.Consumer>
        </tbody>
      </table>
    </dataTable.Provider>
  );
}

export function TableRow<DataType>({ id, index, children } : TableRowProps<DataType>) {
  const { data } = useContext(dataTable);
  return (
    <td>
      {children
        ? children({
            index,
            item: data[index],
          })
        : data[index][id]}
    </td>
  );
}
