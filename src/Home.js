import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

function Home({ set }) {
  const [namee, setName] = useState(localStorage.getItem("Name"));
  const [menu, setMenu] = useState("");
  const [price, setPrice] = useState("");
  const [show, setShowData] = useState(false);
  const [data, setData] = useState([]);
  const [hideform, setHideForm] = useState(false);

  const saveOrder = async () => {
    if (namee == "") {
      alert("Name is Required !");
    }
    if (menu == "") {
      alert("Menu is Required !");
      return false;
    }
    if (price == "") {
      alert("Price is Required !");
      return false;
    }else if(!/[0-9]/.test(price)){
      alert('Only numbers Input is Allow.');
      return false;
    }

    let name = localStorage.getItem("UserID");

    const response = await axios({
      method: "post",
      url: "https://darwindevs.com/ci4.1/save",
      data: { name, menu, price },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.data.status === 200) {
      alert(response.data.message);
      getOrder();
      setHideForm(true);
    }

    if (response.data.status === 500) {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);
  
  function getOrder() {
    let userid = localStorage.getItem("UserID");
    fetch(`https://darwindevs.com/ci4.1/getorder/${userid}`, {
      method: "POST",
    }).then((result) => {
      result.json().then((resp) => {
        setData(resp.data);
        if (resp.data.length > 0) {
          setShowData(true);
          setHideForm(true);
        }
      });
    });
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
      setHideForm(false);
      setShowData(false);
    }
    if (response.data.status == 404) {
      alert(response.data.messages);
    }
  }

  return (
    <div>
      <Container>
        {!hideform ? (
          <Row>
            <Col></Col>
            <Col>
              <h4>ORDER PAGE</h4>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={namee}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Menu"
                  value={menu}
                  onChange={(e) => setMenu(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="button" onClick={saveOrder}>
                Submit
              </Button>
            </Col>
            <Col></Col>
          </Row>
        ) : (
          <h3 className="headinfo">You Have Ordered !</h3>
        )}

        {show ? (
          <Table className="headinfo" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Menu</th>
                <th>Rate</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.menu}</td>
                  <td>&#8377; {item.price}</td>
                  <td>{item.date}</td>
                  <td><Button onClick={() => deleteOrder(item.id)} variant={"danger"} size="sm" title="Click To Delete"><MdDeleteForever size={20} /></Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h3 className="headinfo">404, Order Not Found !</h3>
        )}
      </Container>
    </div>
  );
}

export default Home;
