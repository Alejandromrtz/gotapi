import React, { useState } from "react";
import ReactDOM from "react-dom";
import ScotchInfoBar from "./ScotchInfoBar";
import "./styles.css";
import axios from "axios";

function App() {
  const apiURL = "https://www.anapioficeandfire.com/api/books?pageSize=30";
  const [books, setBooks] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error("Network Response was not OK.");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(`error fetching data: ${error}`);
    }
  }

  return (
    <div className="App">
      <h1>Game of Thrones Books</h1>
      <h2>Fetch a list from an API and display it</h2>

      <div>
        <button onClick={fetchData} className="fetch-button">
          Fetch Data
        </button>
        <br />
      </div>

      <div className="books">
        {books &&
          books.map((book, index) => {
            const cleanedDate = new Date(book.released).toDateString();
            const authors = book.authors.join(", ");

            // Move the JSX for displaying book details inside the map function
            return (
              <div className="book" key={index}>
                <h3> Book {index + 1}</h3>
                <h2>{book.name}</h2>
                <div className="details">
                  <p>👨: {authors} </p>
                  <p>📖: {book.numberOfPages}</p>
                  <p>🏘️:{book.country}</p>
                  <p>⏰: {cleanedDate}</p>
                </div>
              </div>
            );
          })}
      </div>

      <ScotchInfoBar seriesNumber="7" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
