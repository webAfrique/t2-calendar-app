import { Outlet, useLocation } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";
import EditorHeader from "../component/editor/EditorHeader";

function Root() {
  const location = useLocation();
  const isEditorPage = location.pathname.includes("/editor");
  return (
    <div>
      {isEditorPage ? <EditorHeader /> : <Header />}
      <Outlet />
      {!isEditorPage && <Footer />}
    </div>
  );
}

export default Root;