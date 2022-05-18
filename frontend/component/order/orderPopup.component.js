import React, { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  HIDE_ORDER_POPUP,
} from "../../action/order/order.action";
import Modal from "react-modal";
import { useTable } from "react-table";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { useReactToPrint } from 'react-to-print';
import { Box, Fulfillment } from './orderPopup.style';
import { int2money } from '../../service/util/utils.client';


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
  const componentRef = useRef();

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

  const address = fulfillment.customer.default_address;

  const columns = [
    {
      Header: "Mã SP",
      accessor: "sku",
      Cell: ({ cell }) => {
        if (cell.value) {
          return <>{cell.value.slice(0, 50)}</>
        } else {
          return <>{cell.row.original.name.slice(0, 50)}</>
        }
      }
    },
    {
      Header: "Máy SX",
      accessor: "machine_code",
    },
    {
      Header: "Số lượng",
      accessor: "quantity"
    },
  ];

  const onPrintBtnClicked = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={modalStyle}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <Box>
        <Fulfillment ref={componentRef}>
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

          <h4 className="title">PHIẾU GIAO HÀNG</h4>
          <table className="fulfillment-info">
            <tbody>
              <tr>
                <td>Người nhận:</td>
                <td><b>{receiver}</b></td>

                <td>Thu hộ:</td>
                <td><b>{int2money(fulfillment.real_shipping_fee)} VNĐ</b></td>
              </tr>
              <tr>
                <td>Số điện thoại:</td>
                <td colSpan={3}><b>{fulfillment.shipping_phone}</b></td>
              </tr>
              <tr>
                <td>Đ/C:</td>
                <td colSpan={3}>
                  <p><b>{address ? address.address1 : ''}</b></p>
                  <p><b>{address.ward ? `${address.ward},` : ''} {address.district ? `${address.district},` : ''} {address.province   ? address.province : ''}</b></p>
                </td>
              </tr>
              <tr>
                <td>Ghi chú:</td>
                <td colSpan={3}><b>{fulfillment.shipping_notes}</b></td>
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
        </Fulfillment>

        <div className="right" style={{ marginTop: 5 }}>
          <button className="modal-btn blue" onClick={onPrintBtnClicked}
          >
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
