import react from "react";
import { Button } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Customers = () => {
  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes");

    console.log(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreen title="Welcome Back Customer..">
      <Link to="createcustomer">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Make an Appoinment
        </Button>
      </Link>
    </MainScreen>
  );
};

export default Customers;
