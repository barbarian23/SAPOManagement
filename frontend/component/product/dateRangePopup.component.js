import React, { useState } from "react";
import Modal from "react-modal";
import "../../assets/css/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';
import { Box } from "./productPopup.style";

registerLocale('vi', vi)

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: "auto",
    overflow: "visible",
  }
};

export default function DateRangePopUp({ open, onClose, onOK }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={modalStyle}
      contentLabel="Time range Modal"
      ariaHideApp={false}
    >
      <Box>
        <div className="daterangepicker-box">
          <div style={{ flex: 1 }}>
            <p>Từ ngày</p>
            <DatePicker 
              selected={startDate} 
              locale="vi"
              dateFormat='dd/MM/yyyy'
              onChange={(date) => setStartDate(date)} />
          </div>
          <div style={{ flex: 1 }}>
            <p>Đến ngày</p>
            <DatePicker 
              selected={endDate}
              locale="vi"
              dateFormat='dd/MM/yyyy'
              onChange={(date) => setEndDate(date)} />
          </div>
        </div>

        <div className="right">
          <button className="modal-btn blue" onClick={() => onOK(startDate, endDate)}>
            Xác nhận
          </button>
          <button className="modal-btn" onClick={onClose}>
            Thoát
          </button>
        </div>
      </Box>
    </Modal>
  );
}
