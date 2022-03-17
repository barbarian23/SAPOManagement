import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  KEYWORD_CHANGE,
  PAGE_CHANGE,
  PAGE_SIZE_CHANGE,
  SHOW_PRODUCT_POPUP,
  SHOW_DATE_RANGE_POPUP,
  SORT_BY_CHANGE,
  STATUS_CHANGE,
  DATE_RANGE_CHANGE,
  GET_MACHINES,
  SEARCH_BUTTON_CLICK,
  LINE_ITEM_SELECT
} from "../../action/product/product.action";
import { useTable } from "react-table";
import { TableBox } from "./productTable.style";
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

  let dispatch = useDispatch();
  const onCellClicked = (cell) => {
    dispatch({ type: LINE_ITEM_SELECT, value: cell.row.original.id });
    dispatch({ type: GET_MACHINES });
    dispatch({ type: SHOW_PRODUCT_POPUP });
  };

  return (
    <table {...getTableProps()}>
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
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, iCell) => {
                return iCell == 0
                  ? <td {...cell.getCellProps()}
                    className="sku-cell"
                    onClick={() => onCellClicked(cell)}>
                    {cell.render("Cell")}
                  </td>
                  : <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function ProduceTable({ data }) {
  let { keyword, page, pageSize, total, isTableLoading, status, sortBy } = useSelector(state => state.product);
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

  const _status = [
    { value: '', label: "Trạng thái" },
    { value: 'NOT', label: "Chưa xử lý" },
    { value: 'DONE', label: "Đã xử lý" }];

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

  const columns = [
    {
      Header: "Mã SKU",
      accessor: "sku",
      Cell: ({ cell }) => {
        if (cell.value) {
          return <>{cell.value}</>
        } else {
          return <>{cell.row.original.name}</>
        }
      }
    },
    {
      Header: "Mã đơn hàng",
      accessor: "order_number"
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
      Header: "Thời hạn xử lý",
      accessor: "deadline",
      Cell: ({ cell }) => {
        let deadLine = new Date();
        deadLine.setDate(new Date(cell.row.original.confirmed_at).getDate() + 2);
        return <>{date2dtstr(deadLine)}</>
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
      accessor: "status",
      Cell: ({ cell: { value } }) =>
        value == "DONE" ? (
          <p className="status-bag green">Đã xử lý</p>
        ) : (
          <p className="status-bag red">Chưa xử lý</p>
        )
    }
  ];

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
        <button
          className="search-btn blue"
          onClick={onSearchBtnClicked}>
          Tìm kiếm
        </button>
      </div>

      <Table
        columns={columns}
        data={data}
      ></Table>

      {isTableLoading
        ? <div className="loading-box">
          <ReactLoading
            type="spinningBubbles"
            color="#357edd"
            className="loading-center"
            height={50}
            width={50} />
        </div>
        : <div className="pagging-box">
          <div className="right">
            <div className="pagging-label">
              <span>Số lượng mỗi trang</span>
              <input type="number"
                value={pageSize}
                onChange={onPageSizeChanged} />
              <span> {(page - 1) * pageSize + 1} - {((page) * pageSize) > total ? total : ((page) * pageSize)} trên {total}</span>

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
