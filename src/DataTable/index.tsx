import React, {
  Children,
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  HTMLProps,
  TableHTMLAttributes
} from "react";

interface TableProps<DataType> extends TableHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  data: DataType[];
}

interface TableRowProps<ItemDataType> extends HTMLProps<HTMLTableCellElement> {
  rowId?: keyof ItemDataType;
  index?: any;
  children?: ({ index: number, item: ItemDataType }) => ReactNode;
}

const dataTable = createContext<any>({ data: [] });

export function Table<DataType>({
  data,
  children,
  ...restProps
}: TableProps<DataType>) {
  const cloneTdChildren = (index) => {
    return Children.map(children, (child) => {
      return cloneElement(child as ReactElement, {
        index,
      });
    });
  };
  return (
    <dataTable.Provider value={{ data }}>
      <table {...restProps}>
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

export function TableRow<DataType>(props: TableRowProps<DataType>) {
  const { rowId, index, children, ...restProps } = props;
  const { data } = useContext(dataTable);
  return (
    <td {...restProps}>
      {children
        ? children({
            index,
            item: data[index],
          })
        : data[index][rowId]}
    </td>
  );
}
