import * as React from "react";
import { useTable } from "react-table";
import {TableBox} from './billTable.style';
// import "../assets/css/font-awesome.min.css";
// import 'font-awesome/css/font-awesome.css';

function Table({ columns, data, onRowClick }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
            <th>Thêm thao tác</th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
              <td>
                {row.cells[2].value ? (
                  <button
                    className="btn blue"
                    onClick={(row) => onRowClick(row)}
                  >
                    In đơn hàng
                  </button>
                ) : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function BillTable({ columns, data, onRowClick }) {
  return (
    <TableBox>
      <div className="search-box">
        <div className="search-label">
          <p>
            <b>Đơn hàng</b>
          </p>
        </div>
        <div className="search-input">
          <input type="text" placeholder="Tìm kiếm" />
        </div>
      </div>

      <Table columns={columns} data={data} onRowClick={onRowClick}></Table>

      <div className="pagging-box">
        <div className="right">
          <div className="pagging-label">
            <span>Item per page</span>
            <input type="number" defaultValue={10} />
            <span>1 - 10 of 20</span>

            <span>
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </span>
            <span>
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
    </TableBox>
  );
}
