import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (

    <div style={{
      minHeight:"100vh",
      background:"#f4f4f4",
      display:"flex",
      flexDirection:"column"
    }}>

      {/* Top Navbar */}
      <div style={{
      width:"100%",
      height:"80px",
      padding:"1px 20px",
      background:"#fff",
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      boxShadow:"0 2px 5px rgba(0,0,0,0.1)",
      boxSizing:"border-box"
    }}>

        <h2 style={{color:"#2563eb", fontSize:"44px", fontWeight:"bold"}}>TestHub</h2>

        <button
          onClick={handleLogout}
          style={{
            padding:"8px 16px",
            border:"none",
            background:"#2563eb",
            color:"#fff",
            borderRadius:"5px",
            cursor:"pointer",
            fontSize:"16px",
            fontWeight:"bold"
          }}
        >
          Logout
        </button>

      </div>


      {/* Main Content */}
      <div style={{
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>

        {/* Center Card */}
        <div style={{
          width:"90%",
          maxWidth:"400px",
          padding:"55px",
          borderRadius:"10px",
          background:"#fff",
          textAlign:"center",
          boxShadow:"0 0 10px rgba(0,0,0,0.2)"
        }}>

          {/* <h1 style={{marginBottom:"10px, color:"#2563eb", fontSize:"45px", fontWeight:"bold"}}>*/}
          <h1 style={{marginBottom:"10px", color:"#2563eb", fontSize:"40px", fontWeight:"bold", marginTop:"-15px"}}>
            Welcome 😀
          </h1>

          {role === "user" && (
            <>
              <p style={{marginBottom:"20px", fontSize:"20px", fontWeight:"bold"}}>
                Ready to challenge your knowledge?
              </p>

              <button
                onClick={()=>navigate("/categories")}
                style={buttonStyle}
              >
                Start Quiz
              </button>
            </>
          )}

          {role === "admin" && (
            <>
              <p style={{marginBottom:"20px", fontSize:"20px", fontWeight:"bold"}}>
                Manage your quiz categories
              </p>

              <button
                onClick={()=>navigate("/categories")}
                style={buttonStyle}
              >
                See Quiz Categories
              </button>
            </>
          )}

        </div>

      </div>

    </div>

  );
}

const buttonStyle = {
  padding:"12px 20px",
  background:"#2563eb",
  color:"#fff",
  border:"none",
  borderRadius:"6px",
  cursor:"pointer",
  width:"100%",
  fontWeight:"bold",
  fontSize:"18px"
};

export default Home;