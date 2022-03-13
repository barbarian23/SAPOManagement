import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  KEYWORD_CHANGE,
  SEARCH_BUTTON_CLICK,
  PAGE_CHANGE,
  PAGE_SIZE_CHANGE,
  SHOW_DATE_RANGE_POPUP,
  SORT_BY_CHANGE,
  STATUS_CHANGE,
  DATE_RANGE_CHANGE,

} from "../../action/order/order.action";
import { useTable } from "react-table";
import { TableBox } from './orderTable.style';
import Dropdown from "react-dropdown";
import "../../assets/css/react-dropdown-style.css";
import "../../assets/css/dropdown-styles.css";
import ReactLoading from 'react-loading';

function Table({ columns, data }) {
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

  let { status, sortBy } = useSelector(state => state.order);
  let dispatch = useDispatch();

  const timebook = [
    { value: "", label: "Thời gian đặt hàng" },
    { value: "created_at", label: "Tăng dần" },
    { value: "-created_at", label: "Giảm dần" },
    { value: "daterange", label: "Tìm kiếm theo khoảng thời gian" },
  ];

  const _status = [
    { value: '', label: "Trạng thái" },
    { value: 'NOT', label: "Chưa xử lý" },
    { value: 'DONE', label: "Đã xử lý" }];

  const onSelectTimeBook = (e, i, index) => {
    if (e.value == 'daterange') {
      dispatch({ type: SHOW_DATE_RANGE_POPUP });
    } else {
      dispatch({ type: SORT_BY_CHANGE, value: e.value });
      dispatch({ type: DATE_RANGE_CHANGE, value: { startDate: 0, endDate: 0 } });
    }
  };

  const onRowClicked = (row) => {
    let id = row.cells[0].value;
    window.open(`https://epeben-1.myharavan.com/admin/orders/${id}`, "_blank");
  };

  const onStatusSelected = (e) => {
    dispatch({ type: STATUS_CHANGE, value: e.value });
  }

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, iCol) => (
              <th {...column.getHeaderProps()}>
                {iCol == 1 ? (
                  <Dropdown
                    controlClassName="dropDownMachine"
                    options={timebook}
                    onChange={onSelectTimeBook}
                    value={timebook.find((i) => i.value == sortBy)}
                    placeholder="Select an option"
                  />
                ) : iCol == 2 ? (
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
                {row.cells[2].value == "DONE" ? (
                  <button
                    className="btn blue"
                    onClick={() => onRowClicked(row)}
                  >
                    Đi đến trang giao hàng
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

export default function OrderTable({ columns, data }) {
  let { keyword, page, pageSize, total, isTableLoading } = useSelector(state => state.order);
  let dispatch = useDispatch();
  let totalPage = (total / pageSize) > parseInt(total / pageSize) ? parseInt(total / pageSize) + 1 : parseInt(total / pageSize);

  const onKeywordChanged = (e) => {
    dispatch({ type: KEYWORD_CHANGE, value: e.target.value });
  }

  const onSearchBtnClicked = () => {
    dispatch({ type: SEARCH_BUTTON_CLICK });
  }

  const onDecreasePageClicked = () => {
    if (page > 1) {
      dispatch({ type: PAGE_CHANGE, value: page - 1 });
    }
  }

  const onIncreasePageClicked = () => {
    if (page < totalPage) {
      dispatch({ type: PAGE_CHANGE, value: page + 1 });
    }
  }

  const onPageSizeChanged = (e) => {
    dispatch({ type: PAGE_SIZE_CHANGE, value: e.target.value });
  }

  return (
    <TableBox>
      <div className="search-box">
        <div className="search-label">
          <p>
            <b>Đơn hàng</b>
          </p>
        </div>
        <div className="search-input">
          <input
            type="text"
            placeholder="Tìm kiếm mã đơn hàng"
            value={keyword}
            onChange={onKeywordChanged}
          />
        </div>
        <button
          className="search-btn blue"
          onClick={onSearchBtnClicked}>
          Tìm kiếm
        </button>
      </div>

      <Table
        columns={columns}
        data={data}>
      </Table>

      {isTableLoading
        ? <div className="loading-box">
          <ReactLoading
            type="spinningBubbles"
            color="#357edd"
            className="loading-center"
            height={50}
            width={50} />
        </div>
        :
        <div className="pagging-box">
          <div className="right">
            <div className="pagging-label">
              <span>Số lượng mỗi trang</span>
              <input type="number"
                value={pageSize}
                onChange={onPageSizeChanged} />
              <span> {(page - 1) * pageSize + 1} - {((page) * pageSize + 1) > total ? total : (page) * pageSize + 1} trên {total}</span>

              <button className="page-btn"
                onClick={onDecreasePageClicked}>
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
              </button>
              <span>{page}</span>
              <button className="page-btn"
                onClick={onIncreasePageClicked}>
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      }
    </TableBox>
  );
}
