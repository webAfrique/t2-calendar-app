import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import Register from "./routes/Register";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Home from "./routes/Home";
import User from "./routes/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user" element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
