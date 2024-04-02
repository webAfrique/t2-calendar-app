import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Register from "./component/Register";
import Root from "./routes/Root";
import Login from "./component/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
