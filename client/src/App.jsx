import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import Register from "./routes/Register";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Home from "./routes/Home";
import User from "./routes/User";
import Editor from "./routes/Editor";
import AdminPanel from "./routes/AdminPanel";
import ErrorPage from "./routes/ErrorPage";
import Preview from "./routes/Preview";

function App() {
  const [previewClicked, setPreviewClicked] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Root
              setPreviewClicked={setPreviewClicked}
              previewClicked={previewClicked}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="user"
            element={
              <User
                setPreviewClicked={setPreviewClicked}
                previewClicked={previewClicked}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
          <Route path="editor" element={<Editor />} />
          <Route path="/editor/:single" element={<Editor />} />
          <Route path="/editor/:single/view" element={<Preview />} />
          <Route path="adminpanel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
