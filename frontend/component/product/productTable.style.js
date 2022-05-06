import styled from "styled-components";

export const TableBox = styled.div`
font-family: "Roboto";
font-size: 14px;

table {
  width: 100%;
  background-color: #ffffff;
  border-spacing: 0;
  border: none;

  th {
    font-weight: 800;
    font-size: 16px;
    background-color: #ffffff;
  }

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    height: 43px;
    margin: 0;
    text-align: center;
    :last-child {
      border-right: 0;
    }
  }

  tr:nth-child(odd) {
    background: rgba(23, 162, 184, 0.12);
  }

  .sku-cell{
    max-width: 500px;
    cursor: pointer;
    text-decoration: underline;
    :hover{
      background-color: rgba(23, 162, 184, 0.75);
    }
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
  height: 450px;

  .loading-center{
    margin: 100px auto; 
  }
}

.status-bag {
  padding: 5px;
  border-radius: 5px;
  font-weight: 700;
  color: #ffffff;
  width: 80px;
  display: inline-table;
}

.btn {
  border: none;
  padding: 5px;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
}

.pagging-box {
  height: 46px;
  background-color: #fafafa;
}

.pagging-label {
  margin-top: 13px;

  .page-btn {
    margin: 0px 5px;
    cursor: pointer;
    
  }

  .current-page{
    font-weight: 700;
    margin: 0 15px;
  }
}
`;