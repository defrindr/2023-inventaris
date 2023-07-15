import Button from "./Button";

interface TableProps {
  data: any;
  columns: Column[];
  actions?: Action[];
}

interface Column {
  name: any;
  label: string;
}

interface Action {
  icon?: any;
  text: string;
  bg?: string;
  to?: string;
  delete?: any;
}

export default function Table(props: TableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th key={-1} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              {props.columns.map((column: any) => (
                <th key={`${column.name}`} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.label}
                </th>
              ))}
              {props.actions?.length !== 0 ? (
                <th key={props.columns.length + 1} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {props.data &&
              props.data?.map((dt: any, i: number) => {
                return (
                  <tr key={dt.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{i + 1}</div>
                    </td>
                    {props.columns.map((column) => (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {column.name.split(".").length <= 1
                            ? dt[column.name.split(".").map((dt: any) => [dt])[0]]
                            : dt[column.name.split(".").map((dt: any) => [dt])[0]][column.name.split(".").map((dt: any) => [dt])[1]]}
                        </div>
                      </td>
                    ))}
                    {props.actions?.length !== 0 ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {props.actions?.map((action: any) => (
                          <Button icon={action.icon} text={action.text} bg={action.bg} to={action.to ? action?.to + `/${dt.id}` : ""} delete={{ action: action.delete, id: dt.id }} className="mr-2" />
                        ))}
                      </td>
                    ) : null}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
