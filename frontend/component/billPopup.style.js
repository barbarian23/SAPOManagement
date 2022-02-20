import styled from "styled-components";

export const Box = styled.div`
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