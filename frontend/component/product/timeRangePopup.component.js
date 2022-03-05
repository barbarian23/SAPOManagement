import React, { useState } from "react";
import Modal from "react-modal";
import "../../assets/css/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Box } from "./productPopup.style";

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
    minHeight: 300
  }
};

export default function TimeRangePopUp({ open, onClose, onOK }) {
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
          <div style={{flex:1}}>
            <p>Từ ngày</p>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div style={{flex:1}}>
            <p>Đến ngày</p>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
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
