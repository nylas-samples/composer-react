import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "@nylas/components-composer";
import "./styles.css";
import './App.css';

function App() {
  const [, setMsg] = useState({});
  const composer = useRef(null);
  const initialValues = {
    from: [
      {
        name: "Luka Test",
        email: "luka.b@nylas.com"
      }
    ],
    to: [
      {
        name: "Dan Test",
        email: "dan.r@nylas.com"
      }
    ],
    subject: "Sample subject",
    body: "Sample Body"
  };
  const internalData = [
    { id: 1, email: "Tia30@hotmail.com" },
    { id: 2, email: "Obie_Stokes@hotmail.com" },
    { id: 3, email: "Mikayla.Jaskolski85@gmail.com" },
    { id: 4, email: "Jacquelyn65@hotmail.com" },
    { id: 5, email: "Dee57@hotmail.com" }
  ];
  const externalDataSource = (term) => {
    return fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((res) => {
        return res
          .map((item) => ({ name: item.name, email: item.email }))
          .filter((item) =>
            item.name.toLowerCase().includes(term.toLowerCase())
          );
      })
      .catch(() => Promise.resolve([]));
  };
  // const send = async (data) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       return reject({ success: false, data });
  //     }, 750);
  //   });
  // };
  useEffect(() => {
    // Update the document title using the browser API
    const el = composer.current;
    el.change = (msg) => {
      setMsg(msg);
    };
    el.value = initialValues;
    el.show_header = true;
    el.show_subject = true;
    el.mode = "inline";
    el.theme = "light";
    el.show_editor_toolbar = true;
    el.show_from = true;
    el.show_to = true;
    el.to = externalDataSource;
    el.from = internalData;
    // el.send = send;
  });

  return (
    <div id="app">
      <div className="wrapper">
        <div style={{ textAlign: "left" }}>
          <nylas-composer
            ref={composer}
            id="41abca6e-bcb8-4e18-aaef-b506fd9b35ac"
          ></nylas-composer>
        </div>
      </div>
    </div>
  );
}

export default App;