import Todos from "./Todos";
import Tabs from "./Tabs";
import Heading from "./Heading";
import Form from "./Form";
import { useState } from "react";
import axios from "axios";

function App() {
  const origin = 'http://localhost:3000/';

  const [task, setTask] = useState("");

  function inputTask(e, val) {
    e.preventDefault();
    setTask(val);
    axios.post(origin + 'newTask', {task: val});
  }
  console.log(task);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 w-100 h-100">
        <Heading />
        <Form inputTask={inputTask}/>
        <Tabs />
        <Todos />
      </div>
    </>
  );
}

export default App;
