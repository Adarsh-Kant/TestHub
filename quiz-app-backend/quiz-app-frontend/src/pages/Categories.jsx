import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Categories() {

  const [categories,setCategories] = useState([]);
  const [newCategory,setNewCategory] = useState("");

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(()=>{
    fetchCategories();
  },[]);

  const fetchCategories = async () => {

    const res = await axios.get("https://testhuboriginal.onrender.com/api/categories");
    setCategories(res.data);

  };

  const addCategory = async () => {

    if(!newCategory) return;

    await axios.post("https://testhuboriginal.onrender.com/api/categories/add",{
      name:newCategory
    });

    setNewCategory("");
    fetchCategories();

  };

  return (

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


      {/* Main Content */}
      <div style={{
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>

        {/* Card */}
        <div style={{
          width:"90%",
          maxWidth:"400px",
          padding:"55px",
          background:"#fff",
          borderRadius:"10px",
          boxShadow:"0 0 10px rgba(0,0,0,0.2)",
          textAlign:"center"
        }}>

          <h2 style={{marginBottom:"20px", marginTop:"-15px", fontSize:"20px", fontWeight:"bold"}}>Quiz Categories</h2>

          {categories.map((cat)=>(
            <div key={cat._id} style={{marginBottom:"10px"}}>

              <button
                onClick={()=>navigate(`/quiz/${cat._id}`)}
                style={categoryButton}
              >
                {cat.name}
              </button>

            </div>
          ))}


          {role === "admin" && (

            <div style={{marginTop:"25px"}}>

              <input
                type="text"
                placeholder="New Category"
                value={newCategory}
                onChange={(e)=>setNewCategory(e.target.value)}
                style={inputStyle}
              />

              <button
                onClick={addCategory}
                style={addButton}
              >
                Add Category
              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

const categoryButton = {
  width:"100%",
  padding:"12px",
  background:"#2563eb",
  color:"#fff",
  border:"none",
  borderRadius:"6px",
  cursor:"pointer",
  fontWeight:"bold",
  fontSize:"18px"
};

const inputStyle = {
  width:"95%",
  padding:"10px",
  marginBottom:"10px",
  border:"1px solid #ccc",
  borderRadius:"5px",
  fontWeight:"bold"
};

const addButton = {
  width:"100%",
  padding:"12px",
  background:"#22c55e",
  color:"#fff",
  border:"none",
  borderRadius:"6px",
  cursor:"pointer",
  fontWeight:"bold",
  fontSize:"18px"
};

export default Categories;