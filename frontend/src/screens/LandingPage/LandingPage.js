import { Button, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import "./LandingPage.css";

const LandingPage = ({ history }) => {
  useEffect(() => {
  const userInfo = localStorage.getItem("userInfo");

  if (userInfo) {
  history.push("/customers");
  }
  }, [history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Happy Paws Veterinary Clinic</h1>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  SignUp
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
