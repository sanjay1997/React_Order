import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

function Admin() {
  const [data, setData] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  let total = 0;

  function getOrder() {
    fetch(`https://darwindevs.com/ci4.1/getallorder`).then((result) => {
      result.json().then((resp) => {
        setData(resp.data);
        setTotalPrice(resp.data.reduce((a, b) => a + parseInt(b.price), 0));
      });
    });
  }

  useEffect(() => {
    setInterval(() => {
      getOrder();
    }, 3000);
  }, []);
  //console.log(totalprice);

  const updatePayment = async (id) =>{
    const payment = 1;
    const userid  = id;
    const response = await axios({
      method: "post",
      url: "https://darwindevs.com/ci4.1/updatepayment",
      data: { payment, userid },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.data.status == 200) {
      alert(response.data.messages);
    }
    if (response.data.status == 401) {
      alert(response.data.messages);
    }
  }

  const deleteOrder = async (id) =>{
    const orderid  = id;
    const response = await axios({
      method: "DELETE",
      url: "https://darwindevs.com/ci4.1/deleteorder",
      data: {orderid },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.data.status == 200) {
      alert(response.data.messages);
    }
    if (response.data.status == 404) {
      alert(response.data.messages);
    }
  }

  return (
    <div>
      <Container>
        <Table className="headinfo" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Menu</th>
              <th>Rate</th>
              <th>Date</th>
              <th>Payment Received</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.menu}</td>
                  <td>{item.price}</td>
                  <td>{item.date}</td>
                  <td><Button onClick={() => updatePayment(item.id)} variant={item.payment == 0 ? "danger" : "success"} size="sm">{item.payment == 0 ? "Pending" : "Done"}</Button></td>
                  <td><Button onClick={() => deleteOrder(item.id)} variant={"danger"} size="sm" title="Click To Delete"><MdDeleteForever size={20} /></Button></td>
                </tr>
              );
            })}
          </tbody>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Total</th>
              <td>&#8377; {totalprice}</td>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
        </Table>
      </Container>
    </div>
  );
}
export default Admin;
