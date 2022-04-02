import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  KEYWORD_CHANGE,
  SEARCH_BUTTON_CLICK,
  PAGE_CHANGE,
  PAGE_SIZE_CHANGE,
  SHOW_DATE_RANGE_POPUP,
  SHOW_ORDER_POPUP,
  SORT_BY_CHANGE,
  STATUS_CHANGE,
  DATE_RANGE_CHANGE,
  SELECT_FULFILLMENT,
  GET_FULFILLMENT_DETAIL,
} from "../../action/order/order.action";
import { useTable } from "react-table";
import { TableBox } from './orderTable.style';
import Dropdown from "react-dropdown";
import "../../assets/css/react-dropdown-style.css";
import "../../assets/css/dropdown-styles.css";
import ReactLoading from 'react-loading';
import { date2dtstr } from "../../service/util/utils.client";

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

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, iCol) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function OrderTable({ data }) {
  let { status, sortBy, keyword, page, pageSize, total, isTableLoading } = useSelector(state => state.order);
  let dispatch = useDispatch();
  let totalPage = (total / pageSize) > parseInt(total / pageSize) ? parseInt(total / pageSize) + 1 : parseInt(total / pageSize);

  const _status = [
    { value: '', label: "Trạng thái" },
    { value: 'NOT', label: "Chưa xử lý" },
    { value: 'DONE', label: "Đã xử lý" }
  ];

  const onStatusSelected = (e) => {
    dispatch({ type: STATUS_CHANGE, value: e.value });
  }

  const timebook = [
    { value: "", label: "Thời gian đặt hàng" },
    { value: "confirmed_at", label: "Tăng dần" },
    { value: "-confirmed_at", label: "Giảm dần" },
    { value: "daterange", label: "Tìm kiếm theo khoảng thời gian" },
  ];

  const onSelectTimeBook = (e, i, index) => {
    if (e.value == 'daterange') {
      dispatch({ type: SHOW_DATE_RANGE_POPUP });
    } else {
      dispatch({ type: SORT_BY_CHANGE, value: e.value });
      dispatch({ type: DATE_RANGE_CHANGE, value: { startDate: 0, endDate: 0 } });
    }
  };

  const onRowClicked = (order) => {
    // let id = order.id;
    // window.open(`https://epeben-1.myharavan.com/admin/orders/${id}`, "_blank");
    dispatch({ type: SELECT_FULFILLMENT, value: order.fulfillment_id });
    dispatch({ type: GET_FULFILLMENT_DETAIL });
    dispatch({ type: SHOW_ORDER_POPUP });
  };

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

  const onPageClicked = (_page) => {
    dispatch({ type: PAGE_CHANGE, value: _page });
  }

  const onPageSizeChanged = (e) => {
    dispatch({ type: PAGE_SIZE_CHANGE, value: e.target.value });
  }

  const columns = [
    {
      Header: "Mã đơn hàng",
      accessor: "order_number",
      defaultCanSort: true
    },
    {
      Header: () => {
        return <Dropdown
          controlClassName="dropDownMachine"
          options={timebook}
          onChange={onSelectTimeBook}
          value={timebook.find((i) => i.value == sortBy)}
          placeholder="Select an option"
        />
      },
      accessor: "confirmed_at",
      Cell: ({ cell }) => {
        return <>{date2dtstr(new Date(cell.value))}</>
      }
    },
    {
      Header: () => {
        return <Dropdown
          controlClassName="dropDownMachine"
          options={_status}
          onChange={onStatusSelected}
          value={_status.find((i) => i.value == status)}
          placeholder="Select an option"
        />
      },
      accessor: "fulfillment_status",
      Cell: ({ cell: { value } }) =>
        value == 'success' ? (
          <p className="status-bag green">Đã xử lý</p>
        ) : (
          <p className="status-bag red">Chưa xử lý</p>
        )
    },
    {
      Header: "Thêm thao tác",
      accessor: "action",
      Cell: ({ cell }) => {
        let order = cell.row.original;
        if (order.fulfillment_status == "success") {
          return <button
            className="btn blue"
            onClick={() => onRowClicked(order)}
          >
            In hóa đơn
          </button>
        } else {
          return null;
        }

      }
    }
  ];

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
              {/* <input type="number"
                value={pageSize}
                onChange={onPageSizeChanged} /> */}
              <select name="pageSize"
                value={pageSize}
                onChange={onPageSizeChanged} >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span> {(page - 1) * pageSize + 1} - {((page) * pageSize) > total ? total : ((page) * pageSize)} trên {total}</span>

              {/* paging */}
              {page > 1 ? <button className="page-btn"
                onClick={() => onPageClicked(1)}>
                <i className="fa fa-angle-double-left" aria-hidden="true"></i>
              </button> : null}
              {page - 2 >= 1 ? <button className="page-btn"
                onClick={() => onPageClicked(page - 2)}>
                {page - 2}
              </button> : null}
              {page - 1 >= 1 ? <button className="page-btn"
                onClick={() => onPageClicked(page - 1)}>
                {page - 1}
              </button> : null}

              <span className="current-page">{page}</span>

              {page + 1 <= totalPage ? <button className="page-btn"
                onClick={() => onPageClicked(page + 1)}>
                {page + 1}
              </button> : null}
              {page + 2 <= totalPage ? <button className="page-btn"
                onClick={() => onPageClicked(page + 2)}>
                {page + 2}
              </button> : null}
              {page < totalPage ? <button className="page-btn"
                onClick={() => onPageClicked(totalPage)}>
                <i className="fa fa-angle-double-right" aria-hidden="true"></i>
              </button> : null}
            </div>
          </div>
        </div>
      }
    </TableBox>
  );
}
