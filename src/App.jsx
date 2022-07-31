import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import {StudentPage} from "./pages/studentPage";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StudentPage />} />
        <Route path="books" element={<StudentPage />} />
        <Route path="borrow" element={<StudentPage />} />
      </Routes>
    </div>
  )
}

export default App
