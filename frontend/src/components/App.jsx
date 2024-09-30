import Todos from "./Todos";
import Tabs from "./Tabs";
import Heading from "./Heading";
import Form from "./Form";
import toast, { Toaster  } from 'react-hot-toast';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const origin = "http://localhost:3000/";

  // Input state
  const [todo, setTodo] = useState("");
  // Insert or update variable
  const [insertOrUp, setInsertOrUp] = useState(true);
  // Tab filter
  const [tab, setTab] = useState(1);
  // All todo state
  const [result, setResult] = useState([]);
  // Current id
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(origin);
      if (tab == 1){
        setResult(response.data);
      } else if (tab == 2) {
        const res = response.data.filter( item => {
          return item.status === "Active"
        })
        setResult(res);
      } else if (tab == 3) {
        const res = response.data.filter( item => {
          return item.status === "Completed"
        })
        setResult(res);
      }
    }
    fetch();
  });

  function inputTask(val) {
    if(val){
      const time = new Date().toLocaleDateString();
      axios.post(origin + "newTask", { task: val, time: time });
    } else {
      alert("Enter any Todo");
    }
  }
  
  function editTask(id) {
    const res = result.filter(item => {return item.id === id})
    const content = res[0].task;
    setInsertOrUp(false);
    setTodo(content);
    setId(res[0].id);
  }

  async function updateTask(task, id){
    await axios.patch(origin + 'updateTask', {task: task, dId: id})
    setInsertOrUp(true);
    setId("");
  }

 async function deleteTask(tId) {
    await axios.delete(origin + "deleteTask", { data: {dId: tId} });
    // console.log(id);
  }

  function completeTask(status, tId) {
    // e.preventDefault();
    if(status == "Active"){
      axios.patch(origin + "updateStatus", { dId: tId, status:"Completed" });
    } else if ( status == "Completed" ){
      axios.patch(origin + "updateStatus", { dId: tId, status:"Active" });
    }
  }


  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 w-100 h-100">
      
        <Heading />
        <Form inputTask={inputTask} id={id} updateTask={updateTask} insertOrUp={insertOrUp} setTodo={setTodo} todo={todo} />
        
        <Tabs setTab={setTab} tab={tab} />
        {result.map((item) => (
          <Todos
            key={item.id}
            id={item.id}
            task={item.task}
            date={new Date(item.date).toLocaleDateString()}
            status={item.status}
            editTask={editTask}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        ))}
      </div>
    </>
  );
}

export default App;
