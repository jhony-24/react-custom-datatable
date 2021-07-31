import React, {
  Children,
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  HTMLProps,
  TableHTMLAttributes,
} from "react";

type FuncRenderItem<T> = (props:{ index: number, item: T }) => ReactNode;

interface TableProps<DataType> extends TableHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  data: DataType[];
}

interface TableRowProps<ItemDataType> extends HTMLProps<HTMLTableCellElement> {
  rowId?: keyof ItemDataType;
  index?: any;
  renderHeader?: FuncRenderItem<any>;
  renderCell?: FuncRenderItem<ItemDataType>;
  children?: FuncRenderItem<ItemDataType>;
}

const dataTable = createContext<any>({ data: [] });

export function Table<DataType>({
  data,
  children,
  ...restProps
}: TableProps<DataType>) {
  const childrenProps = Children.map(children, (child) => {
    return (child as ReactElement).props;
  });

  const cloneRowChildren = (index) => {
    return Children.map(children, (child) => {
      return cloneElement(child as ReactElement, {
        index,
      });
    });
  };
  return (
    <dataTable.Provider value={{ data }}>
      <table {...restProps}>
        <thead>
          {childrenProps.map((prop, index) => {
            return (
              <th key={index}>
                {prop.renderHeader ? prop.renderHeader(data) : prop.rowId}
              </th>
            );
          })}
        </thead>
        <tbody>
          <dataTable.Consumer>
            {(context) => {
              return context.data.map((_item, index) => (
                <tr key={index}>{cloneRowChildren(index)}</tr>
              ));
            }}
          </dataTable.Consumer>
        </tbody>
      </table>
    </dataTable.Provider>
  );
}

export function TableRow<DataType>(props: TableRowProps<DataType>) {
  const { rowId, index, children, renderCell, ...restProps } = props;
  const { data } = useContext(dataTable);
  const item = data[index];
  const buildItem = {
    index,
    item
  };
  const content = (value) => <td {...restProps}>{value}</td>;

  if (renderCell) {
    return content(renderCell(buildItem));
  }
  if (children) {
    return content(children(buildItem));
  }
  return content(item[rowId]);
}
