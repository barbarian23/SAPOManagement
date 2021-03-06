import React, { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  SET_IS_PRINTED,
} from "../../action/order/order.action";
import Modal from "react-modal";
import { useTable } from "react-table";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { useReactToPrint } from 'react-to-print';
import { Box, Fulfillment, HaravanBill } from './orderPopup.style';
import { int2money, date2datestr } from '../../service/util/utils.client';


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
  const componentRef = useRef(null);

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

  const customer = fulfillment.customer;

  const address = fulfillment.customer.default_address;

  let total = 0;
  for (let i = 0; i < fulfillment.lineitems.length; i++) {
    total += fulfillment.lineitems[i].quantity * fulfillment.lineitems[i].price;
  }

  const columns = [
    {
      Header: "M?? SP",
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
      Header: "M??y SX",
      accessor: "machine_code",
    },
    {
      Header: "S??? l?????ng",
      accessor: "quantity"
    },
  ];

  const onPrintBtnClicked = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      dispatch({
        type: SET_IS_PRINTED,
        value: {
          isPrinted: true,
          orderNumber: fulfillment.order_number,
        }
      });
    }
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
        <div ref={componentRef}>
          <Fulfillment>
            <div style={{ display: 'flex' }}>
              <div className="address">
                <p>K??nh b??n h??ng <b>{fulfillment.source_name}</b></p>
              </div>
              <div className="fulfillment-barcode">
                {fulfillment.tracking_number
                  ? <>
                    <Barcode
                      value={fulfillment.tracking_number}
                      height={75}
                      fontSize={14}
                    />
                    <p className="tracking-company">{fulfillment.tracking_company}</p>
                  </>
                  : null}
              </div>
            </div>

            <hr />

            <h4 className="title">PHI???U GIAO H??NG</h4>
            <table className="fulfillment-info">
              <tbody>
                <tr>
                  <td>Ng?????i nh???n:</td>
                  <td><b>{receiver}</b></td>

                  {/* <td>Thu h???:</td>
                <td><b>{int2money(fulfillment.real_shipping_fee)} VN??</b></td> */}
                </tr>
                <tr>
                  <td>S??? ??i???n tho???i:</td>
                  <td colSpan={3}><b>{fulfillment.shipping_phone}</b></td>
                </tr>
                <tr>
                  <td>??/C:</td>
                  <td colSpan={3}>
                    <p><b>{address ? address.address1 : ''}</b></p>
                    <p><b>{address.ward ? `${address.ward},` : ''} {address.district ? `${address.district},` : ''} {address.province ? address.province : ''}</b></p>
                  </td>
                </tr>
                <tr>
                  <td>Ghi ch??:</td>
                  <td colSpan={3}><b>{fulfillment.shipping_notes}</b></td>
                </tr>
              </tbody>
            </table>

            <hr className="dash-line" />
            <p>????n h??ng: {fulfillment.order_number} (T???ng SL s???n ph???m: {fulfillment.total_quantity})</p>
            <Table columns={columns} data={fulfillment.lineitems}></Table>

            <hr />
            <div style={{ display: 'flex' }}>
              <div className="receiver-sign">
                <p>Ch??? k?? ng?????i nh???n</p>
              </div>
              <div className="sender-sign">
                <p>Ch??? k?? ng?????i g???i</p>
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

          <HaravanBill>
            <div style={{ minHeight: 30 }}>
              <div className="title"><h3>EPeBen - ?????p ????? Nh???</h3></div>
              <div className="order-date">
                <p>Ng??y ?????t h??ng: {date2datestr(new Date(fulfillment.confirmed_at))}</p>
              </div>
            </div>

            <div style={{ minHeight: 100, display: 'inline-block', marginTop: 1 }}>
              <div className="bill-info">
                <p><b>?????a ch???</b>: {address ? address.address1 : ''}</p>
                <p><b>??i???n tho???i</b>: {fulfillment.shipping_phone}</p>
                <p><b>Website</b>: https://epeben.com</p>
                <p><b>Email</b>: {customer.email}</p>
              </div>

              <div className="barcode">
                {fulfillment.tracking_number && fulfillment.tracking_number.length <= 14
                  ? <Barcode
                    value={fulfillment.tracking_number}
                    height={75}
                    fontSize={14}
                  />
                  : null}
              </div>
            </div>

            <div className="long-barcode">
              {fulfillment.tracking_number && fulfillment.tracking_number.length > 14
                ? <Barcode
                  value={fulfillment.tracking_number}
                  height={75}
                  fontSize={14}
                />
                : null}
            </div>

            <div style={{ display: 'flex', minHeight: 100, marginTop: 15 }}>
              <div style={{ width: '60%' }}>
                <div className="box" >
                  <div className="box-header">
                    <h3>
                      Chi ti???t h??a ????n
                    </h3>
                  </div>
                  <div className="box-content no-border">
                    <table className="bill-table">
                      <thead>
                        <tr>
                          <th className="left"><b>M?? s???n ph???m</b></th>
                          <th className="center"><b>S??? l?????ng</b></th>
                          <th className="right"><b>Gi??</b></th>
                        </tr>
                      </thead>
                      <tbody>
                        {fulfillment.lineitems.map((item, index) => {
                          return <tr key={index}>
                            <td className="left">{item.name}</td>
                            <td className="center">{item.quantity}</td>
                            <td className="right">{int2money(item.price)}</td>
                          </tr>
                        })}

                      </tbody>
                    </table>
                    <p><b>Th??ng tin thanh to??n</b></p>
                    <table className="total-table">
                      <tbody>
                        <tr>
                          <td>T???ng gi?? s???n ph???m:</td>
                          <td className="right">
                            {int2money(total)}
                          </td>
                        </tr>
                        <tr>
                          <td>Ph?? v???n chuy???n:</td>
                          <td className="right">
                            {int2money(fulfillment.real_shipping_fee)}
                          </td>
                        </tr>
                        <tr>
                          <td><b>T???ng ti???n:</b></td>
                          <td className="right">
                            <b>{int2money(total + fulfillment.real_shipping_fee)}</b>
                          </td>
                        </tr>
                        <tr>
                          <td><b>S??? ti???n ???? tr???:</b></td>
                          <td className="right">
                            <b>0</b>
                          </td>
                        </tr>
                        <tr>
                          <td><b>T???ng ti???n ph???i tr???:</b></td>
                          <td className="right">
                            <b>{int2money(total + fulfillment.real_shipping_fee)}</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p><b>Ghi ch??</b></p>
                    <p>{fulfillment.shipping_notes}</p>
                  </div>
                </div>
              </div>


              <div style={{ width: '40%' }}>
                <div className="box">
                  <div className="box-header">
                    <h3>
                      Th??ng tin ????n h??ng
                    </h3>
                  </div>
                  <div className="box-content">
                    <p><b>M?? ????n h??ng</b></p>
                    <p>{fulfillment.order_number}</p>
                    <p><b>Ng??y ?????t h??ng</b></p>
                    <p>{date2datestr(new Date(fulfillment.confirmed_at))}</p>
                    <p><b>Ph????ng th???c thanh to??n</b></p>
                    <p>{fulfillment.gateway}</p>
                    <p><b>H??nh th???c v???n chuy???n</b></p>
                    <p></p>
                  </div>
                </div>

                <div className="box">
                  <div className="box-header">
                    <h3>
                      Th??ng tin mua h??ng
                    </h3>
                  </div>
                  <div className="box-content">
                    <p><b>{receiver}</b></p>
                    <p>{fulfillment.shipping_notes}</p>
                    <p>??i???n tho???i: {fulfillment.shipping_phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <p>N???u b???n c?? th???c m???c, vui l??ng li??n h??? ch??ng t??i qua email nk2.kma8c@gmail.com ho???c 0822882869</p>

          </HaravanBill>
        </div>

        <div className="right" style={{ marginTop: 5 }}>
          <button className="modal-btn blue" onClick={onPrintBtnClicked}
          >
            IN
          </button>
          <button className="modal-btn" onClick={onClose}>
            THO??T
          </button>
        </div>

      </Box>
    </Modal>
  );
}
