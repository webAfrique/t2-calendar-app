import { Outlet, useLocation } from "react-router-dom";
import Footer from "../component/footer/Footer";
import Header from "../component/Header";
import EditorHeader from "../component/editor/EditorHeader";

function Root({ previewClicked, setPreviewClicked }) {
  const location = useLocation();
  const isEditorPage = location.pathname.includes("/editor");
  return (
    <div>
      {isEditorPage ? (
        <EditorHeader
          setPreviewClicked={setPreviewClicked}
          previewClicked={previewClicked}
        />
      ) : (
        <Header />
      )}
      <Outlet />
      {!isEditorPage && <Footer />}
    </div>
  );
}

export default Root;
