import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Quiz() {

  const { categoryId } = useParams();
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  const fetchQuestions = async () => {
    const res = await axios.get(
      `https://testhuboriginal.onrender.com/api/questions/${categoryId}`
    );
    setQuestions(res.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option
    });
  };

  const submitQuiz = () => {

    let score = 0;

    questions.forEach((q) => {
      if (selectedAnswers[q._id] === q.answer) {
        score++;
      }
    });

    navigate("/user/result", { state: { score:score, total: questions.length } });
  };

  const deleteQuestion = async (id) => {

    await axios.delete(
      `https://testhuboriginal.onrender.com/api/questions/${id}`
    );

    fetchQuestions();
  };

  const addQuestion = async () => {

    await axios.post(
      "https://testhuboriginal.onrender.com/api/questions/add",
      {
        category: categoryId,
        question,
        options: [option1, option2, option3, option4],
        answer
      }
    );

    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");

    fetchQuestions();
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
        alignItems:"flex-start",
        paddingTop:"40px"
      }}>

        <div style={{
          width:"95%",
          maxWidth:"600px",
          background:"#fff",
          padding:"55px",
          borderRadius:"10px",
          boxShadow:"0 0 10px rgba(0,0,0,0.2)"
        }}>

          <h2 style={{textAlign:"center",marginBottom:"30px", marginTop:"-10px"}}>Quiz Questions</h2>

          {questions.map((q, index) => (

            <div key={q._id} style={{marginBottom:"25px"}}>

              <h4>{index + 1}. {q.question}</h4>

              {q.options.map((opt, i) => (

                <div key={i} style={{marginTop:"5px"}}>

                  {role === "user" ? (

                    <label style={{cursor:"pointer"}}>

                      <input
                        type="radio"
                        name={q._id}
                        value={opt}
                        onChange={() => handleOptionChange(q._id, opt)}
                      />

                      <span style={{marginLeft:"8px"}}>{opt}</span>

                    </label>

                  ) : (

                    <div>{opt}</div>

                  )}

                </div>

              ))}

              {role === "admin" && (

                <button
                  onClick={() => deleteQuestion(q._id)}
                  style={{
                    marginTop:"10px",
                    background:"#ef4444",
                    color:"#fff",
                    border:"none",
                    padding:"6px 12px",
                    borderRadius:"5px",
                    cursor:"pointer"
                  }}
                >
                  Delete Question
                </button>

              )}

            </div>

          ))}

          {role === "user" && (

            <button
              onClick={submitQuiz}
              style={{
                width:"100%",
                padding:"12px",
                background:"#2563eb",
                color:"#fff",
                border:"none",
                borderRadius:"6px",
                cursor:"pointer",
                marginTop:"10px",
                fontWeight:"bold",
                fontSize:"18px"
              }}
            >
              Submit Quiz
            </button>

          )}

          {role === "admin" && (

            <div style={{marginTop:"40px"}}>

              <h3>Add New Question</h3>

              <input
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Option 1"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Option 2"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Option 3"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Option 4"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Correct Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={inputStyle}
              />

              <button
                onClick={addQuestion}
                style={{
                  width:"100%",
                  padding:"12px",
                  background:"#22c55e",
                  color:"#fff",
                  border:"none",
                  borderRadius:"6px",
                  cursor:"pointer"
                }}
              >
                Add Question
              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

const inputStyle = {
  width:"100%",
  padding:"10px",
  marginBottom:"10px",
  border:"1px solid #ccc",
  borderRadius:"5px"
};

export default Quiz;