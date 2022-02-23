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

  .status-bag {
    padding: 5px;
    margin: 5px 0px;
    border-radius: 5px;
    font-weight: 700;
    color: #ffffff;
    width: 80px;
    display: inline-table;
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

  .dropdown-status {
    height: 25px;
    border: none !important;
    border-radius: 5px;
    padding: 5px 5px 5px 5px;
    font-size: 14px;
    color: #ffffff;
    font-weight: 700;
  }
`;