import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import {StudentPage} from "./pages/studentPage";
import Header from "./components/header.jsx";
import {BooksPage} from "./pages/booksPage";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<StudentPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="borrow" element={<StudentPage />} />
      </Routes>
    </div>
  )
}

export default App
