import React, { useReducer, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Book from './components/Book';
import Search from './components/Search';
import axios from 'axios';

const BOOK_API_URL = "https://www.googleapis.com/books/v1/volumes?q=harrypotter&key=AIzaSyAQExnFmul1cmlhA8WHA9MYPQ79TA68WMQ";

const initialState = {
  loading: true,
  books: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_BOOKS_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_BOOKS_SUCCESS":
      return {
        ...state,
        loading: false,
        books: action.payload
      };
    case "SEARCH_BOOKS_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }; 
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(BOOK_API_URL).then(jsonResponse => {
      console.log(jsonResponse)
      dispatch({
        type: "SEARCH_BOOKS_SUCCESS",
        payload: jsonResponse.data.items
      });
    });
  }, []);

  const search = searchValue => {
      dispatch({
        type: "SEARCH_BOOKS_REQUEST"
      });

      axios(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=AIzaSyAQExnFmul1cmlhA8WHA9MYPQ79TA68WMQ`)
      .then(jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_BOOKS_SUCCESS",
            payload: jsonResponse.data.items
          });
        } else {
          dispatch({
            type: "SEARCH_BOOKS_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      });
  }

  const { books, errorMessage, loading } = state;

  const retrievedBooks =
    loading && !errorMessage ? (
      <span>Loading...</span>
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      books.map((book, index) => (
        <Book key={`${index}`} book={book} />
      ))
    );


  console.log(books);

  return (
    <div className="App">
      <div className="m-container">
        <Header text="BOOK FINDER" />

        <Search search={search} />

        <p className="App-intro">Search the Google Books API!</p>

        <div className="books">{retrievedBooks}</div>
      </div>
    </div>
  );
}

export default App;
