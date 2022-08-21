import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "../../components/footer";
import PageManager from "../../components/page_manager";
import "./style.scss";

const App = () => {
  return (
    <div className="wsb-app-container">
      <Router>
        {/* <div className="wsb-page-wrapper">
          <PageManager />
        </div> */}
        <PageManager />
      </Router>
    </div>
  );
};

export default App;
