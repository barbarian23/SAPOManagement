import styled from "styled-components";

export const Box = styled.div`
  font-family: "Roboto";
  font-size: 14px;

  .modal-title {
    // text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin: 10px 0px;
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

export const Fulfillment = styled.div`
  font-family: "Roboto";
  font-size: 14px;

  .address{
    flex: 1;
  }

  .fulfillment-barcode{
    flex: 1;
    text-align: center;
  }

  .tracking-company{
    margin: -5px 0px;

  }

  .title {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin: 10px 0px;
  }

  .dash-line{

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

  .fulfillment-info {
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

      p {
        margin: 0px;
      }
    }
  }

  .receiver-sign{
    flex: 1;
    text-align: center;
    border: dashed 1.5px;
    p {
      margin-top: 5px;
    }
  }

  .sender-sign{
    flex: 1;
    text-align: center;
    border: dashed 1.5px;
    p {
      margin-top: 5px;
    }
  }

  .fulfillment-qrcode{
    flex: 1;
    height: 100px;
    text-align: center;
    p {
      margin-top: 5px;
    }
  }
`

export const HaravanBill = styled.div`
  margin-top: 50px;
  border-top: 1px solid black;
  
  .title{
    float: left;
    h3{
      margin: 5px 0px;
    }
  }

  .order-date{
    float: right;

    p{
      margin: 5px 0px;
    }
  }

  .bill-info{
    float: left;
    width: 70%;

    p{
      margin: 5px 0px;
    }
  }

  .barcode{
    float: right;
    width: 30%;
  }

  .box{
    padding: 0px 5px;
    min-height: 100px;

  }

  .box-header{
    min-height: 25px;
    border-bottom: 1px solid #0975BD;
    
    h3{
      margin: 2px 0px;
    }
  }

  .box-content{
    margin-top: 5px;
    padding: 5px;
    border: 2px solid #EAEAEA;

    p{
      margin: 5px 0px;
    }
  }
  
  .left{
    float: left;
  }

  .right{
    float: right;
  }

  .bill-table{
    width: 100%;
    
    th{

    }   

    tbody > tr {
      border: 2px solid #EAEAEA;
    }
  }
`