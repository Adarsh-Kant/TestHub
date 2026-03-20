import { useLocation, useNavigate } from "react-router-dom";

function Result(){

const location = useLocation();
const navigate = useNavigate();

const score = location.state?.score || 0;
const total = location.state?.total || 0;

const percentage = total ? ((score / total) * 100).toFixed(2) : 0;

const status = percentage >= 40 ? "PASS" : "FAIL";

return(

<div style={{
  minHeight:"100vh",
  background:"#f4f4f4",
  display:"flex",
  flexDirection:"column"
}}>

{/* Navbar */}

<div style={{
  width:"100%",
  height:"80px",
  padding:"15px",
  background:"#fff",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  boxShadow:"0 2px 5px rgba(0,0,0,0.1)",
  boxSizing:"border-box"
}}>

<h2 style={{color:"#2563eb", fontSize:"44px", fontWeight:"bold"}}>TestHub</h2>

</div>


{/* Result Card */}

<div style={{
  flex:1,
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}}>

<div style={{
  width:"90%",
  maxWidth:"400px",
  background:"#fff",
  padding:"55px",
  borderRadius:"10px",
  boxShadow:"0 0 10px rgba(0,0,0,0.2)",
  textAlign:"center",
  boxSizing:"border-box"
}}>

<h2 style={{marginBottom:"20px", fontSize:"20px", fontWeight:"bold", marginTop:"10px"}}>Quiz Result</h2>

<h3>Score: {score} / {total}</h3>

<h3>Percentage: {percentage}%</h3>

<h3 style={{
  color: status === "PASS" ? "#22c55e" : "#ef4444"
}}>
Status: {status}
</h3>

<br/>

<button
onClick={()=>navigate("/home")}
style={{
  width:"100%",
  padding:"12px",
  background:"#2563eb",
  color:"#fff",
  border:"none",
  borderRadius:"6px",
  cursor:"pointer",
  fontWeight:"bold",
  fontSize:"18px"
}}
>
Return to Home
</button>

</div>

</div>

</div>

);

}

export default Result;