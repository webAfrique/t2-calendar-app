import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import Register from "./routes/Register";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Home from "./routes/Home";
import User from "./routes/User";
import Editor from "./routes/Editor";

function App() {
  const [calendarView, setCalendarView] = useState("preview");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Root
              calendarView={calendarView}
              setCalendarView={setCalendarView}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user" element={<User />} />
          <Route
            path="editor"
            element={<Editor calendarView={calendarView} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
