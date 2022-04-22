import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector}  from "react-redux";

const RegisterScreen = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [mnumber, setContactNo] = useState("");
  const [hno, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const history = useHistory();

  useEffect(() => {
    if (userInfo) {
      history.push("/customers");
    }
  }, [history, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassowrd) {
      setMessage("Password does not match")
    }
    else {
      dispatch(register(fname, lname, email, password, mnumber, hno, street, city, province, pic));
    }
  };

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please select an Image");
    }
    setPicMessage(null);

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "veterinary");
      data.append(
        "cloud_name",
        "sri-lanka-institute-of-informational-technology"
      );
      fetch(
        "https://api.cloudinary.com/v1_1/sri-lanka-institute-of-informational-technology/image/upload",
        {
          method: "post",
          body: "data",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image");
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="fname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="name"
              value={fname}
              placeholder="Enter First name"
              onChange={(e) => setFName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="lname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="name"
              value={lname}
              placeholder="Enter Last name"
              onChange={(e) => setLName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassowrd">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassowrd">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassowrd}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formContactNo">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="county_code"
              title="Please enter exactly 10 digits"
              pattern="[0]{1}{0-9}{9}"
              value={mnumber}
              placeholder="Enter Contact No"
              onChange={(e) => setContactNo(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formHouseNo">
            <Form.Label>House No</Form.Label>
            <Form.Control
              type="text"
              value={hno}
              placeholder="Enter House Number"
              onChange={(e) => setHouseNo(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              value={street}
              placeholder="Enter Street Name"
              onChange={(e) => setStreet(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={city}
              placeholder="Enter City Name"
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formProvince">
            <Form.Label>Province</Form.Label>
            <Form.Control
              type="text"
              value={province}
              placeholder="Enter Province Name"
              onChange={(e) => setProvince(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage varient="danger">{picMessage}</ErrorMessage>
          )}

          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
