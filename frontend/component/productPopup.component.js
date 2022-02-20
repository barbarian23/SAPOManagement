import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useTable } from "react-table";

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
        <tr className="total">
          <td></td>
          <td></td>
          <td>
            <b>Tổng cộng</b>
          </td>
          <td>
            <b>10000đ</b>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const Box = styled.div`
  font-family: "Roboto";
  font-size: 14px;

  .modal-title {
    font-size: 14px;
    font-weight: 700;
    padding: 10px 0 0 10px;
  }

  table {
    width: 100%;
    background-color: #ffffff;
    border-spacing: 0px 2px;
    border: none;

    th {
      font-weight: 800;
      font-size: 16px;
      background-color: #ffffff;
    }

    tr {
      background: rgba(23, 162, 184, 0.12);
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      height: 43px;
      margin: 0px;
      text-align: center;
      :last-child {
        border-right: 0;
      }
    }

    .total {
      background-color: #ffffff;
    }
  }

  .bill-info {
    background-color: #ffffff;
    border-spacing: 0;

    tr {
      background-color: #ffffff;
    }

    td {
      text-align: left;

      :first-child {
        width: 150px;
        padding-left: 10px;
      }
    }
  }

  .modal-btn {
    width: 100px;
    border: none;
    padding: 10px;
    margin: 20px 5px;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const sample = [
  {
    product: "Khung tranh",
    quantity: 1,
    price: 1000,
    total: 1000
  },
  {
    product: "Tranh màu",
    quantity: 1,
    price: 5000,
    total: 5000
  }
];

const data = [];
for (let i = 0; i < 2; i += 1) {
  let s = sample[Math.floor(Math.random() * sample.length)];
  data.push(s);
}

const columns = [
  {
    width: 300,
    Header: "Sản phẩm",
    accessor: "product"
  },
  {
    width: 300,
    Header: "Số lượng",
    accessor: "quantity"
  },
  {
    width: 300,
    Header: "Đơn giá",
    accessor: "price"
  },
  {
    width: 300,
    Header: "Thành tiền",
    accessor: "total"
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
    height: "60%"
  }
};

export default function BillPopUp({ open, onClose }) {
  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={modalStyle}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <Box>
        <h4 className="modal-title">ĐƠN HÀNG</h4>

        <table className="bill-info">
          <tr>
            <td>
              <b>Mã đơn hàng</b>
            </td>
            <td>2201160J18YDR4</td>
          </tr>
          <tr>
            <td>
              <b>Thời gian đặt hàng</b>
            </td>
            <td>15:02 16/01/2022</td>
          </tr>
          <tr>
            <td>
              <b>Khách hàng</b>
            </td>
            <td>Sapo</td>
          </tr>
        </table>

        <Table columns={columns} data={data}></Table>

        <div className="right">
          <button className="modal-btn blue" onClick={onClose}>
            IN
          </button>
          <button className="modal-btn" onClick={onClose}>
            THOÁT
          </button>
        </div>
      </Box>
    </Modal>
  );
}
