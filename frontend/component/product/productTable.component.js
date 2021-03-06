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
import { date2datetimestr, ts2daystr } from "../../service/util/utils.client";

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
    dispatch({
      type: LINE_ITEM_SELECT, value: {
        selectedSKU: cell.row.original.sku,
        selectedLineItemID: cell.row.original.id
      }
    });
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

  const onKeywordKeyPressed = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      dispatch({ type: SEARCH_BUTTON_CLICK });
    }
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

  const _status = [
    { value: '', label: "Tr???ng th??i" },
    { value: 'NOT', label: "Tr???ng th??i (Ch??a x??? l??)" },
    // { value: 'DONE', label: "Tr???ng th??i (???? x??? l??)" }
  ];

  const onStatusSelected = (e) => {
    dispatch({ type: STATUS_CHANGE, value: e.value });
  }

  const timebook = [
    // { value: "", label: "Th???i gian ?????t h??ng" },
    // { value: "confirmed_at", label: "Th???i gian ?????t h??ng (C?? nh???t)" },
    // { value: "-confirmed_at", label: "Th???i gian ?????t h??ng (M???i nh???t)" },
    { value: "created_at", label: "Th???i gian ?????t h??ng (C?? nh???t)" },
    { value: "-created_at", label: "Th???i gian ?????t h??ng (M???i nh???t)" },
    // { value: "daterange", label: "T??m ki???m theo kho???ng th???i gian" },
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
      Header: "M?? SKU",
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
      Header: "M?? ????n h??ng",
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
      // Header: "Th???i gian ?????t h??ng",
      // accessor: "confirmed_at",
      accessor: "created_at",
      Cell: ({ cell }) => {
        return <>{date2datetimestr(new Date(cell.value))}</>
      }
    },
    {
      Header: "Th???i h???n x??? l??",
      accessor: "deadline",
      Cell: ({ cell }) => {
        if (cell.row.original.status == "NOT") {
          let createdAt = new Date(cell.row.original.created_at);
          createdAt.setDate(createdAt.getDate() + 2);
          let now = Date.now();
          let diff = now - createdAt.getTime();
          if (diff > 0) {
            return <p style={{ fontWeight: 700, color: "#f64343" }}>Qu?? h???n {ts2daystr(Math.abs(diff))}</p>
          } else {
            return <p style={{ fontWeight: 700, color: "#2ad38b" }}>C??n {ts2daystr(Math.abs(diff))}</p>
          }
        } else {
          return <p></p>
        }
      }
    },
    {
      Header: "S??? l?????ng t???n kho",
      accessor: "qty_onhand",
      Cell: ({ cell }) => {
        if (cell.value == null) {
          return <>Kh??ng c?? data t??? h??? th???ng</>
        } else {
          return <>{cell.value}</>
        }
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
      // Header: "Tr???ng th??i",
      accessor: "status",
      Cell: ({ cell: { value } }) =>
        value == "DONE" ? (
          <p className="status-bag green">???? x??? l??</p>
        ) : (
          <p className="status-bag red">Ch??a x??? l??</p>
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
            placeholder="T??m ki???m M?? SKU / M?? ????n h??ng"
            value={keyword}
            onChange={onKeywordChanged}
            onKeyPress={onKeywordKeyPressed}
          />
        </div>
        <button
          className="search-btn blue"
          onClick={onSearchBtnClicked}>
          T??m ki???m
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
              <span>S??? l?????ng m???i trang</span>
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
              <span> {(page - 1) * pageSize + 1} - {((page) * pageSize) > total ? total : ((page) * pageSize)} tr??n {total}</span>

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
