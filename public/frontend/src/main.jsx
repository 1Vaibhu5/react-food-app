// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import "./index.css";
// import App from "./App.jsx";

// if (!localStorage.getItem("adminEmail")) {
//   localStorage.setItem("adminEmail", "test@gmail.com");
//   localStorage.setItem("adminPass", "12345");
// }

// createRoot(document.getElementById("root")).render(<App />);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );

// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";

// createRoot(document.getElementById("root")).render(<App />);


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
