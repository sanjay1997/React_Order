import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function Sponsor({ set }) {
  const [name, setName] = useState(localStorage.getItem("Name"));
  const [amount, setAmount] = useState("");
  const [data, setData] = useState([]);

  const saveSponsor = async () => {
    if (name == "") {
      alert("Name is Required !");
      return false;
    }
    if (amount == "") {
      alert("Amount is Required !");
      return false;
    } else if (!/[0-9]/.test(amount)) {
      alert("Only numbers Input is Allow.");
      return false;
    }

    let userid = localStorage.getItem("UserID");
    const response = await axios({
      method: "POST",
      url: "https://darwindevs.com/ci4.1/savesponsor",
      data: { userid, amount },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.data.status === 200) {
      alert(response.data.message);
    }

    if (response.data.status === 401) {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    setInterval(() => {
      getSponsor();
    }, 2000);
  }, []);

  function getSponsor() {
    fetch(`https://darwindevs.com/ci4.1/getsponsor`).then((result) => {
      result.json().then((resp) => {
        setData(resp.data);
      });
    });
  }

  return (
    <div>
      <Container className="sponsor">
        <Row>
          <Col>
            <Form.Control type="text" placeholder="Sponsor name" value={name} />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Sponsor Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Col>
          <Col>
            <Button onClick={saveSponsor}>Save</Button>
          </Col>
        </Row>
        <br />
        <br />

        <Row>
          {data.map((sponsor, index) => (
            <Col key={index}>
              <Card
                border="primary"
                bg="dark"
                text="white"
                style={{ width: "18rem" }}
              >
                <Card.Header>{sponsor.month}</Card.Header>
                <Card.Body>
                  <Card.Title>Sponsor Name : {sponsor.username}</Card.Title>
                  <Card.Text>
                    Sponsor Amount : {sponsor.amount} <br />
                    Date : {sponsor.date} ( {sponsor.day} )
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Sponsor;
