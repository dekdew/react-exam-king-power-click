import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import GithubCorner from "react-github-corner";

ReactDOM.render(
  <>
    <App />
    <GithubCorner
      href="https://github.com/dekdew/react-exam-king-power-click"
      target="_blank"
      direction="left"
    />
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
