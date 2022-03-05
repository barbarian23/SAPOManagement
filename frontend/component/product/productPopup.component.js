import React, { useState } from "react";
import Modal from "react-modal";
import { useTable } from "react-table";
import Dropdown from "react-dropdown";
import { Box } from "./productPopup.style";

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
                return <td {...cell.getCellProps()}>{cell.render("Cell", {iRow: iRow, iCell: iCell})}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const sample = [
  {
    skuCode: "CH8-140x51-DEN",
    orderID: "220115URHYF0AC",
    status: 1,
    machine: "M01",
    processingTime: 1
  },
  {
    skuCode: "CH8-140x51-DEN",
    orderID: "220115URHYF0AC",
    status: 0,
    machine: "",
    processingTime: 0
  }
];

const data = [];
for (let i = 0; i < 3; i += 1) {
  let s = sample[Math.floor(Math.random() * sample.length)];
  data.push(s);
}

const machines = ['M01', 'M02', 'M03'];

const statuses = [
  {
    value: '0',
    label: "Chưa xử lý",
  },
  {
    value: '1',
    label: "Đã xử lý",
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
    width: 700,
    height: "auto"
  }
};

export default function BillPopUp({ open, onClose }) {
  const [billData, setBillData] = useState(data);
  const onSelectStatus = (e, iRow) => {
    console.log(e, iRow);
    setBillData(
      billData.map((bill, index) => {
        if(index == iRow){
          return {
            ...bill,
            machine: e.value == 1 ? "M01" : "",
            status: e.value,
          };
        }else{
          return bill;
        }
      })
    )
    // billData[iRow].status = Number.parseInt(e.value);
  };
  const columns = [
    {
      Header: "Mã SKU",
      accessor: "skuCode"
    },
    {
      Header: "Mã đơn hàng",
      accessor: "orderID"
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      Cell: ({ cell, iRow, iCell }) =>{
        console.log(cell.value);
        return <Dropdown
          controlClassName={
            cell.value == 1
              ? "dropdown-status green"
              : "dropdown-status red"
          }
          options={statuses}
          onChange={(e) => onSelectStatus(e, iRow, iCell)}
          value={statuses.find(
            (i) => i.value == cell.value)}
          // placeholder="Select an option"
        />
      }
    },
    {
      Header: "Máy SX",
      accessor: "machine",
      Cell: ({ cell, iRow, iCell }) =>{
        console.log(cell.value);
        return cell.value ? <Dropdown
          // controlClassName={}
          options={machines}
          // onChange={(e) => onSelectStatus(e, iRow, iCell)}
          value={cell.value}
          // placeholder="Select an option"
        /> 
        : null
      }
    },
    {
      Header: "TG xử lý",
      accessor: "processingTime"
    }
  ];
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
            <input type="text" placeholder="Tìm kiếm Mã đơn hàng" />
          </div>
        </div>

        <Table columns={columns} data={billData}></Table>

        <div className="right">
          <button className="modal-btn blue" onClick={onClose}>
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
