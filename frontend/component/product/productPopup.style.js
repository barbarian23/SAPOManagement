import styled from "styled-components";

export const Box = styled.div`
  font-family: "Roboto";
  font-size: 14px;

  .modal-title {
    font-size: 14px;
    font-weight: 700;
    padding: 10px 0 0 10px;
  }

  .table-scroll {
    max-height: 520px;
    overflow-y:auto;  
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

  .search-box {
    height: 47px;
    background-color: rgba(23, 162, 184, 0.12);
    display: flex;
    border-radius: 8px 8px 0 0px;
  }
  
  .search-label {
    width: 50px;
    margin: 5px;
    border-right: 2px solid black;
  
    p {
      margin: 10px 0 10px 15px;
    }
  }
  
  .search-input {
    margin: 5px;
  
    input[type="text"] {
      background-color: rgba(23, 162, 184, 0.75);
      height: 26px;
      margin: 5px 0 10px 10px;
      padding: 0 0 0 5px;
      border-radius: 8px;
      border: none;
      font-size: 11px;
      width: 300px;
    }
  
    input[type="text"]:focus {
      outline: none;
    }
  }

  .search-btn{
    height: 27px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
  }
  
  .loading-box{
    height: 200px;
  
    .loading-center{
      margin: 100px auto; 
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

  .daterangepicker-box{
    display: flex;
    font-size: 14px;
    font-weight: 700;
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