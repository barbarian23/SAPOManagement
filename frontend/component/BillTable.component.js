import * as React from "react";
import styled from "styled-components";
import { useTable } from "react-table";
//import "../assets/css/font-awesome.min.css";
//import 'font-awesome/css/font-awesome.css';

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

const TableStyles = styled.div`
  font-family: "Roboto";
  font-size: 14px;

  table {
    width: 100%;
    background-color: #ffffff;
    border-spacing: 0;
    border: none;

    th {
      font-weight: 800;
      font-size: 16px;
      background-color: #ffffff;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      height: 43px;
      margin: 0;
      text-align: center;
      :last-child {
        border-right: 0;
      }
    }

    tr:nth-child(odd) {
      background: rgba(23, 162, 184, 0.12);
    }
  }

  .search-box {
    height: 47px;
    background-color: rgba(23, 162, 184, 0.12);
    display: flex;
    border-radius: 8px 8px 0 0px;
  }

  .search-label {
    width: 90px;
    margin: 5px;
    border-right: 2px solid black;

    p {
      margin: 10px 0 10px 15px;
    }
  }

  .search-input {
    margin: 5px;

    input[type="text"] {
      background-color: rgba(23, 162, 184, 0.75);
      height: 26px;
      margin: 5px 0 10px 10px;
      padding: 0 0 0 5px;
      border-radius: 8px;
      border: none;
      font-size: 11px;
      width: 300px;
    }

    input[type="text"]:focus {
      outline: none;
    }
  }

  .status-bag {
    padding: 5px;
    border-radius: 5px;
    font-weight: 700;
    color: #ffffff;
    width: 80px;
    display: inline-table;
  }

  .btn {
    border: none;
    padding: 5px;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
  }

  .pagging-box {
    height: 46px;
    background-color: #fafafa;
  }

  .pagging-label {
    margin-top: 13px;

    span {
      margin: 0px 15px;
    }
  }
`;

export default function BillTable({ columns, data, onRowClick }) {
  return (
    <TableStyles>
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
    </TableStyles>
  );
}
