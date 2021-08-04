import {
  Children,
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  HTMLProps,
  TableHTMLAttributes,
} from "react";

type FuncRenderItem<T> = (props: { index: number; item: T }) => ReactNode;

interface TableProps<DataType> extends TableHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  data: DataType[];
  th?: HTMLProps<HTMLTableCellElement>;
  thead?: HTMLProps<HTMLTableSectionElement>;
  tbody?: HTMLProps<HTMLTableSectionElement>;
}

interface TableRowProps<ItemDataType> extends HTMLProps<HTMLTableCellElement> {
  rowId?: keyof ItemDataType;
  index?: number;
  renderHeader?: (props: { index: number; item: ItemDataType[] }) => ReactNode;
  renderCell?: FuncRenderItem<ItemDataType>;
  children?: FuncRenderItem<ItemDataType>;
}

const dataTable = createContext<any>({ data: [] });
const { Provider, Consumer } = dataTable;

export function Table<DataType>({
  data,
  children,
  th: thProps,
  thead: theadProps,
  tbody: tbodyProps,
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
    <Provider value={{ data }}>
      <table {...restProps}>
        <thead {...theadProps}>
          {childrenProps.map((prop, index) => {
            return (
              <th {...thProps} key={index}>
                {prop.renderHeader ? prop.renderHeader(data) : prop.rowId}
              </th>
            );
          })}
        </thead>
        <tbody {...tbodyProps}>
          <Consumer>
            {(context) => {
              return context.data.map((_item, index) => (
                <tr key={index}>{cloneRowChildren(index)}</tr>
              ));
            }}
          </Consumer>
        </tbody>
      </table>
    </Provider>
  );
}

export function TableRow<DataType>(props: TableRowProps<DataType>) {
  const { rowId, index, children, renderCell, ...restProps } = props;
  const { data } = useContext(dataTable);
  const item = data[index];
  const buildItem = {
    index,
    item,
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
