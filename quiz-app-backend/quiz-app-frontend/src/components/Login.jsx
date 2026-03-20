import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const role = localStorage.getItem("role") || "user";
  const registerPath = role === "admin" ? "/admin/register" : "/user/register";

  const handleLogin = async (e) => {

    e.preventDefault();

    try{

      const res = await axios.post(
        "https://testhuboriginal.onrender.com/api/auth/login",
        {
          email,
          password,
          role
        }
      );

      localStorage.setItem("name",res.data.name);

      navigate("/home");

    }
    catch(error){

      alert("Credentials didn't match");

    }

  };

  return (

    <div style={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"#f4f4f4"
    }}>

      {/* Card */}
      <div style={{
        width:"90%",
        maxWidth:"350px",
        padding:"55px",
        borderRadius:"10px",
        background:"#fff",
        boxShadow:"0 0 10px rgba(0,0,0,0.2)",
        textAlign:"center"
      }}>

        <h1 style={{color:"#2563eb", fontSize:"45px", fontWeight:"bold", margin:"0 0 20px 0"}}>TestHub</h1>

        <h3 style={{marginBottom:"20px", fontSize:"20px"}}>
          {role === "admin" ? "Admin Login" : "User Login"}
        </h3>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width:"100%",
              padding:"12px",
              background:"#2563eb",
              color:"#fff",
              border:"none",
              borderRadius:"6px",
              marginTop:"10px",
              cursor:"pointer",
              fontWeight:"bold",
              fontSize:"18px"
            }}
          >
            Login
          </button>

        </form>

        <p style={{marginTop:"15px", fontWeight:"bold"}}>
          New User? <Link to={registerPath}>Register</Link>
        </p>

      </div>

    </div>

  );

}

const inputStyle = {
  width:"95%",
  padding:"10px",
  marginBottom:"12px",
  border:"1px solid #ccc",
  borderRadius:"5px",
  fontWeight:"bold"
};



export default Login;