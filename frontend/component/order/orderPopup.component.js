import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  HIDE_ORDER_POPUP,
} from "../../action/order/order.action";
import Modal from "react-modal";
import { useTable } from "react-table";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { Box } from './orderPopup.style';

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
      </tbody>
    </table>
  );
}

export default function OrderPopUp({ open, onClose }) {
  let { fulfillment } = useSelector(state => state.order);
  let dispatch = useDispatch();

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: 700,
      height: "80%"
    }
  };

  const receiver = (fulfillment.last_name ? fulfillment.last_name : '')
    + (fulfillment.first_name ? (' ' + fulfillment.first_name) : '');

  const columns = [
    {
      Header: "Tên sản phẩm",
      accessor: "name"
    },
    {
      Header: "Mã SP",
      accessor: "sku",
    },
    {
      Header: "Số lượng",
      accessor: "quantity"
    },
  ];

  const onPrintBtnClicked = () => {
    window.print();
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={modalStyle}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <Box>
        <div style={{ display: 'flex' }}>
          <div className="address">
            <p>Đ/C: Hà Nội</p>
          </div>
          <div className="fulfillment-barcode">
            {fulfillment.tracking_number
              ? <>
                {/* <p>{fulfillment.source_name}</p> */}
                <Barcode
                  value={fulfillment.tracking_number}
                  height={75}
                  fontSize={14}
                />
              </>
              : null}
          </div>
        </div>

        <hr />

        <h4 className="modal-title">PHIẾU GIAO HÀNG</h4>
        <table className="bill-info">
          <tbody>
            <tr>
              <td>Người nhận:</td>
              <td><b>{receiver}</b></td>

              <td>Thu hộ:</td>
              <td><b>{fulfillment.real_shipping_fee} VNĐ</b></td>
            </tr>
            <tr>
              <td>Số điện thoại:</td>
              <td colSpan={3}><b>{fulfillment.shipping_phone}</b></td>
            </tr>
            <tr>
              <td>Đ/C:</td>
              <td colSpan={3}><b>{fulfillment.shipping_address}</b></td>
            </tr>
          </tbody>
        </table>

        <hr className="dash-line" />
        <p>Đơn hàng: {fulfillment.order_number} (Tổng SL sản phẩm: {fulfillment.total_quantity})</p>
        <Table columns={columns} data={fulfillment.lineitems}></Table>

        <hr />
        <div style={{ display: 'flex' }}>
          <div className="receiver-sign">
            <p>Chữ ký người nhận</p>
          </div>
          <div className="sender-sign">
            <p>Chữ ký người gửi</p>
          </div>
          <div className="fulfillment-qrcode">
            {fulfillment.tracking_number
              ? <><QRCode
                value={fulfillment.tracking_number}
                size={100}
              />
                <p>{fulfillment.tracking_number}</p>
              </>
              : null}
          </div>
        </div>

        <div className="right" style={{ marginTop: 5 }}>
          <button className="modal-btn blue" onClick={onPrintBtnClicked}>
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
