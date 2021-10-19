import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button, Table, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import edit from "./edit.png";
import del from "./trash.png";
import "./Admin.css";
const dbhost = "http://127.0.0.1:8000";

function Admin() {
  const [content, setContent] = useState(<h1 id="empty">Admin dashboard </h1>);
  const [acctab, setAcctab] = useState(<></>);
  const sendModif = (e) => {
    e.preventDefault();
    console.log();
    let id = document.getElementById("id").value;
    let name = document.getElementById("Name").value;
    let surname = document.getElementById("Surname").value;
    let mail = document.getElementById("Mail").value;
    let password = document.getElementById("Password").value;
    let cnfpwd = document.getElementById("cnfpassword").value;
    if (cnfpwd === password) {
      let body = `{"id":"${id}","name":"${name}","surname":"${surname}","mail":"${mail}","pass":"${password}"}`;
      fetch(dbhost + "/modifyaccount", {
        method: "POST",
        body: body,
      }).then((rep) =>
        rep.json().then((data) => {
          if (data === "OK") {
            setContent(<h1 id="empty">Account modified successfully</h1>);
          } else alert("Failed to modify account");
        })
      );
    }
  };
  const modifAcc = (element) => {
    console.log(element);
    setContent(
      <Col className="rounded" style={{ backgroundColor: "#f8f9fa" }}>
        <h1 className="title text-dark" style={{ fontSize: "400%" }}>
          Modify {element["name"]}'s Account
        </h1>
        <br />
        <Form onSubmit={sendModif}>
          <input
            id="id"
            defaultValue={element["id_account"]}
            style={{ display: "none" }}
          />
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              id="Name"
              required
              defaultValue={element["name"]}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              id="Surname"
              required
              defaultValue={element["surname"]}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>E-mail adress</Form.Label>
            <Form.Control
              type="email"
              id="Mail"
              required
              defaultValue={element["email"]}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              id="Password"
              required
              defaultValue={element["password"]}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="text"
              id="cnfpassword"
              required
              defaultValue={element["password"]}
            />
          </Form.Group>
          <br />
          <div id="sub">
            <Button variant="danger" type="submit">
              Save changes
            </Button>
          </div>
        </Form>
        <br />
      </Col>
    );
  };
  const delacc = (element) => {
    fetch(dbhost + "deleteacc/" + element["id_account"]).then((rep) =>
      rep.json().then((data) => {
        if (data === "OK") {
          setContent(<h1 id="empty">Account deleted successfully </h1>);
        } else alert("Could not delete account");
      })
    );
  };
  const handledel = (element) => {
    setContent(
      <>
        <h1 id="empty">
          Delete account?
          <br />
          <Button onClick={() => delacc(element)} variant="danger">
            Yes
          </Button>
          &nbsp;
          <Button
            variant="secondary"
            onClick={() => setContent(<h1 id="empty">Admin dashboard </h1>)}
          >
            No
          </Button>
        </h1>
      </>
    );
  };

  useEffect(() => {
    fetch(dbhost + "/getallaccounts").then((rep) =>
      rep.json().then((data) => {
        console.log(data);
        let y = data.map((element, idx) => {
          return (
            <tr key={idx}>
              <td style={{ textAlign: "center" }}>{element["id_account"]}</td>
              <td>{element["name"]}</td>
              <td>{element["surname"]}</td>
              <td>{element["email"]}</td>
              <td>{element["password"]}</td>
              <td style={{ textAlign: "center", width: "6%" }}>
                <Button
                  variant="light"
                  style={{ padding: "2px", marginRight: "5px" }}
                  onClick={() => modifAcc(element)}
                >
                  <Image className="icon" src={edit} />
                </Button>
                <Button
                  variant="light"
                  style={{ padding: "2px" }}
                  onClick={() => handledel(element)}
                >
                  <Image className="icon" src={del} />
                </Button>
              </td>
            </tr>
          );
        });
        console.log("here");
        setAcctab(y);
      })
    );
  }, [content]);
  const Accounts = () => {
    console.log("here");
    setContent(
      <Col>
        <Table
          variant="dark"
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "80px" }}
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Mail</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>{acctab}</tbody>
        </Table>
      </Col>
    );
  };
  return (
    <>
      <Row>
        <Col id="side" xs={2}>
          <Button variant="dark" className="butt" onClick={Accounts}>
            Accounts
          </Button>
        </Col>
        <Col>{content}</Col>
      </Row>
    </>
  );
}
export default Admin;
