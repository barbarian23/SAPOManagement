import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  HIDE_PRODUCT_POPUP,
  POPUP_KEYWORD_CHANGE,
  POPUP_MACHINE_CHANGE,
  POPUP_SEARCH_BUTTON_CLICK,
  POPUP_STATUS_CHANGE,
  UPDATE_LINE_ITEM_STATUS,
} from "../../action/product/product.action";
import Modal from "react-modal";
import { useTable } from "react-table";
import Dropdown from "react-dropdown";
import ReactLoading from 'react-loading';
import { Box } from "./productPopup.style";
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
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                return <td {...cell.getCellProps()}>{cell.render("Cell", { iRow: iRow, iCell: iCell })}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function ProductPopUp({ open, onClose }) {
  let { lineItems, machines, popupKeyword, isPopupTableLoading } = useSelector(state => state.product);
  let dispatch = useDispatch();
  let _machines = machines.map((machine) => {
    return {
      value: machine._id,
      label: machine.code
    }
  });

  const onKeywordChanged = (e) => {
    dispatch({ type: POPUP_KEYWORD_CHANGE, value: e.target.value })
  }

  const onSearchBtnClicked = () => {
    dispatch({ type: POPUP_SEARCH_BUTTON_CLICK });
  }

  const onSelectStatus = (e, iRow) => {
    // console.log(e, iRow);
    dispatch({
      type: POPUP_STATUS_CHANGE,
      value: { status: e.value, index: iRow }
    });
  };

  const onSelectMachine = (e, iRow) => {
    // console.log(e, iRow);
    dispatch({
      type: POPUP_MACHINE_CHANGE,
      value: { machine_id: e.value, index: iRow }
    });
  }

  const onUpdateBtnClick = () => {
    lineItems.forEach(item => {
      if (item.isEdited) {
        // console.log(item);
        dispatch({
          type: UPDATE_LINE_ITEM_STATUS,
          value: {
            id: item.id,
            status: item.status,
            machine_id: item.machine_id
          }
        })
      }
    });


    dispatch({ type: HIDE_PRODUCT_POPUP });

  }

  const statuses = [
    {
      value: 'NOT',
      label: "Chưa xử lý",
    },
    {
      value: 'DONE',
      label: "Đã xử lý",
    }
  ];

  const columns = [
    {
      Header: "Mã SKU",
      accessor: "sku",
      Cell: ({ cell }) => {
        if(cell.value){
          return <>{cell.value}</>
        }else{
          return <>{cell.row.original.name}</>
        }
      }
    },
    {
      Header: "Mã đơn hàng",
      accessor: "order_number"
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      Cell: ({ cell, iRow, iCell }) => {
        return <Dropdown
          controlClassName={
            cell.value == 'DONE'
              ? "dropdown-status green"
              : "dropdown-status red"
          }
          options={statuses}
          onChange={(e) => onSelectStatus(e, iRow, iCell)}
          value={statuses.find((i) => i.value == cell.value)}
        />
      }
    },
    {
      Header: "Máy SX",
      accessor: "machine_id",
      Cell: ({ cell, iRow, iCell }) => {
        return <>
          {cell.row.values.status == "DONE"
            ? <Dropdown
              options={_machines}
              onChange={(e) => onSelectMachine(e, iRow, iCell)}
              value={_machines.find((i) => i.value == cell.value)}
              placeholder="Select machine"
            />
            : null
          }
        </>
      }
    },
    {
      Header: "TG xử lý",
      accessor: "process_time",
      Cell: ({ cell }) => {
        return <>{cell.value ? date2dtstr(new Date(cell.value)) : ""}</>
      }
    }
  ];

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: 800,
      height: "auto",
      overflow: "visible",
    }
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={modalStyle}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <Box>
        <div className="search-box">
          <div className="search-label">
            <p>
              <b>SKU</b>
            </p>
          </div>
          <div className="search-input">
            <input
              type="text"
              placeholder="Tìm kiếm Mã đơn hàng"
              value={popupKeyword}
              onChange={onKeywordChanged} />
          </div>
          <button
            className="search-btn blue"
            onClick={onSearchBtnClicked}>
            Tìm kiếm
          </button>
        </div>

        <Table columns={columns} data={lineItems}></Table>

        {isPopupTableLoading
          ? <div className="loading-box">
            <ReactLoading
              type="spinningBubbles"
              color="#357edd"
              className="loading-center"
              height={50}
              width={50} />
          </div> : null}

        <div className="right">
          <button className="modal-btn blue" onClick={onUpdateBtnClick}>
            CẬP NHẬT
          </button>
          <button className="modal-btn" onClick={onClose}>
            THOÁT
          </button>
        </div>
      </Box>
    </Modal>
  );
}
