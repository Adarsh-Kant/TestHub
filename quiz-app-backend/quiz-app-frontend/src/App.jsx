import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoleSelection from "./pages/RoleSelection";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Categories from "./pages/Categories";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<RoleSelection />} />

        {/* USER */}
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />

        {/* ADMIN */}
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/login" element={<Login />} />
        

        <Route path="/home" element={<Home />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/quiz/:categoryId" element={<Quiz />} />
        <Route path="/user/result" element={<Result />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;