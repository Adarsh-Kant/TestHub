import { useNavigate } from "react-router-dom";

function RoleSelection() {

  const navigate = useNavigate();

  const selectRole = (role) => {

    localStorage.setItem("role", role);

    if(role === "user"){
      navigate("/user/register");
    } else {
      navigate("/admin/login");
    }

  };

  return (

    <div style={{
      height:"100vh",
      width:"100%",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#f4f4f4"
    }}>

      {/* Center Box */}
      <div style={{
        width:"90%",
        maxWidth:"350px",
        padding:"55px",
        borderRadius:"10px",
        boxShadow:"0 0 10px rgba(0,0,0,0.2)",
        textAlign:"center",
        backgroundColor:"#fff"
      }}>

        <h2 style={{color:"#2563eb", fontSize:"45px", fontWeight:"bold", margin:"0 0 20px 0"}}>
          TestHub
        </h2>

        <button
          onClick={()=>selectRole("user")}
          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"15px",
            border:"none",
            borderRadius:"6px",
            backgroundColor:"#2563eb",
            color:"#fff",
            fontSize:"16px",
            cursor:"pointer"
          }}
        >
          User
        </button>

        <button
          onClick={()=>selectRole("admin")}
          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"15px",
            border:"none",
            borderRadius:"6px",
            backgroundColor:"#2563eb",
            color:"#fff",
            fontSize:"16px",
            cursor:"pointer"
          }}
        >
          Admin
        </button>

      </div>

    </div>
  );
}

export default RoleSelection;