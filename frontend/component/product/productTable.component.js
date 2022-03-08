import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { KEYWORD_CHANGE, PAGE_CHANGE, PAGE_SIZE_CHANGE, SHOW_PRODUCT_POPUP, SHOW_TIME_RANGE_POPUP, STATUS_CHANGE } from "../../action/product/product.action";
import { useTable } from "react-table";
import { TableBox } from "./productTable.style";
//import "../assets/css/font-awesome.min.css";
//import 'font-awesome/css/font-awesome.css';
import Dropdown from "react-dropdown";
import "../../assets/css/react-dropdown-style.css";
import "../../assets/css/dropdown-styles.css";

function Table({ columns, data, onRowClick, onTimeRangeClick }) {
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

  let { status } = useSelector(state => state.product);
  let dispatch = useDispatch();
  
  const timebook = [
    "Thời gian đặt hàng",
    "Tăng dần",
    "Giảm dần",
    "Tìm kiếm theo khoảng thời gian"
  ];
  const defaulttimebook = timebook[0];

  const _status = [
    { value: '', label: "Trạng thái" },
    { value: 'NOT', label: "Chưa xử lý" },
    { value: 'DONE', label: "Đã xử lý" }];

  const onSelectMachine = (e, i, index) => {
    console.log(e, i, index);
    if (e.value == 'Tìm kiếm theo khoảng thời gian') {
      dispatch({ type: SHOW_TIME_RANGE_POPUP });
    }
  };

  const onRowClicked = ({ rowData }) => {
    dispatch({ type: SHOW_PRODUCT_POPUP })
  };

  const onStatusSelected = (e) => {
    dispatch({ type: STATUS_CHANGE, value: e.value });
  }

  return (
    <table {...getTableProps()}>
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
                    options={_status}
                    onChange={onStatusSelected}
                    value={_status.find((i) => i.value == status)}
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
            <tr {...row.getRowProps()} onClick={onRowClicked}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function ProduceTable({ columns, data, onRowClick, onTimeRangeClick }) {
  let { keyword, page, pageSize } = useSelector(state => state.product);
  let dispatch = useDispatch();

  const onKeywordChanged = (e) => {
    console.log(e.target.value);
    dispatch({ type: KEYWORD_CHANGE, value: e.target.value });
  }

  const onPageChanged = (e) => {
    dispatch({ type: PAGE_CHANGE, value: e.target.value });
  }

  const onPageSizeChanged = (e) => {
    dispatch({ type: PAGE_SIZE_CHANGE, value: e.target.value });
  }

  return (
    <TableBox>
      <div className="search-box">
        <div className="search-label">
          <p>
            <b>SKU</b>
          </p>
        </div>
        <div className="search-input">
          <input type="text"
            placeholder="Tìm kiếm Mã SKU / Mã đơn hàng"
            value={keyword}
            onChange={onKeywordChanged}
          />
        </div>
      </div>

      <Table
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        onTimeRangeClick={onTimeRangeClick}
      ></Table>

      <div className="pagging-box">
        <div className="right">
          <div className="pagging-label">
            <span>Số lượng mỗi trang</span>
            <input type="number" 
              value={pageSize}
              onChange={onPageSizeChanged}/>
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
