import * as React from "react";
import { useTable } from "react-table";
import {TableBox} from "./productTable.style";
//import "../assets/css/font-awesome.min.css";
//import 'font-awesome/css/font-awesome.css';
import Dropdown from "react-dropdown";
import "../assets/css/react-dropdown-style.css";
import "../assets/css/dropdown-styles.css";

function Table({ columns, data, onRowClick, isPopUp }) {
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

  const timebook = [
    "Thời gian đặt hàng",
    "Tăng dần",
    "Giảm dần",
    "Tìm kiếm theo khoảng thời gian"
  ];
  const defaulttimebook = timebook[0];

  const status = ["Trạng thái", "Chưa xử lý", "Đã xử lý"];
  const defaultstatus = status[0];

  const machinesx = ["Máy SX", "M1", "M2", "M3"];
  const defaultMachinesx = machinesx[0];

  const timehandle = [
    "TG xử lý",
    "Tăng dần",
    "Giảm dần",
    "Tìm kiếm theo khoảng thời gian"
  ];
  const defaulttimehandle = timehandle[0];

  const popupstatus = [
    {
      value: "0",
      label: "Chưa xử lý",
      className: "dropDownPopUpNegative"
    },
    { value: "1", label: "Đã xử lý", className: "dropDownPopUpPositive" }
  ];

  const popupmachine = [
    { value: "0", label: "M1" },
    { value: "1", label: "M2" },
    { value: "2", label: "M3" }
  ];

  const onSelectStatus = (e, iRow, iCell) => {
    console.log(rows[iRow].cells[iCell]);
    rows[iRow].cells[iCell].value = Number.parseInt(e.value);
    console.log(rows[iRow].cells[iCell]);
  };

  const onSelectMachine = (e, i, index) => {
    console.log(e, i, index);
  };

  return (
    <table {...getTableProps()}>
      {isPopUp ? (
        <>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, iRow) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, iCell) => {
                    return (
                      <>
                        {iCell == 2 ? (
                          <td {...cell.getCellProps()}>
                            <Dropdown
                              controlClassName={
                                cell.value === 0
                                  ? "dropDownPopUpNegative"
                                  : "dropDownPopUpPositive"
                              }
                              options={popupstatus}
                              onChange={(e) => onSelectStatus(e, iRow, iCell)}
                              value={popupstatus.find(
                                (i) => i.value == cell.value
                              )}
                              placeholder="Select an option"
                            />
                          </td>
                        ) : iCell == 3 && row.cells[2].value == 1 ? (
                          <td {...cell.getCellProps()}>
                            <Dropdown
                              controlClassName="dropDownMachine"
                              options={popupmachine}
                              onChange={onSelectMachine}
                              value={popupmachine.find(
                                (i) => i.label == cell.value
                              )}
                              placeholder="Select an option"
                            />
                          </td>
                        ) : (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        )}
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </>
      ) : (
        <>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th {...column.getHeaderProps()}>
                    {index == 2 ? (
                      <Dropdown
                        controlClassName="dropDownMachine"
                        options={timebook}
                        onChange={onSelectMachine}
                        value={defaulttimebook}
                        placeholder="Select an option"
                      />
                    ) : index == 3 ? (
                      <Dropdown
                        controlClassName="dropDownMachine"
                        options={status}
                        onChange={onSelectMachine}
                        value={defaultstatus}
                        placeholder="Select an option"
                      />
                    ) : index == 4 ? (
                      <Dropdown
                        controlClassName="dropDownMachine"
                        options={machinesx}
                        onChange={onSelectMachine}
                        value={defaultMachinesx}
                        placeholder="Select an option"
                      />
                    ) : index == 5 ? (
                      <Dropdown
                        controlClassName="dropDownMachine"
                        options={timehandle}
                        onChange={onSelectMachine}
                        value={defaulttimehandle}
                        placeholder="Select an option"
                      />
                    ) : (
                      column.render("Header")
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} onClick={() => onRowClick(row)}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </>
      )}
    </table>
  );
}

export default function ProduceTable({ columns, data, onRowClick, isPopUp }) {
  return (
    <TableBox>
      <div className="search-box">
        <div className="search-label">
          <p>
            <b>SKU</b>
          </p>
        </div>
        <div className="search-input">
          {isPopUp ? (
            <input type="text" placeholder="Tìm kiếm mã đơn hàng" />
          ) : (
            <input type="text" placeholder="Tìm kiếm Mã SKU / Mã đơn hàng" />
          )}
        </div>
      </div>

      {isPopUp ? (
        <Table columns={columns} data={data} isPopUp={isPopUp}></Table>
      ) : (
        <Table
          columns={columns}
          data={data}
          onRowClick={onRowClick}
          isPopUp={isPopUp}
        ></Table>
      )}

      <div className="pagging-box">
        <div className="right">
          <div className="pagging-label">
            <span>Số lượng mỗi trang</span>
            <input type="number" defaultValue={10} />
            <span>1 - 10 trên 20</span>

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
