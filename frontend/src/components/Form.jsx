import { useState } from "react";

function Form(props) {
    const [todo, setTodo] = useState("");

    function inputTodo (e) {
        setTodo(e.target.value);
    }
    
    function clickHandler(e){
        props.inputTask(e, todo);
        setTodo("");
    }
  return (
    <div>
      <form className="d-inline-flex align-items-center mw-100 gap-3">
        <input
          className="form-control"
          type="text"
          name="todo"
          onChange={inputTodo}
          value={todo}
          autoFocus
          placeholder="Enter Todo"
        />
        <button className=" btn btn-outline-primary " onClick={clickHandler}>Add</button>
      </form>
    </div>
  );
}

export default Form;
