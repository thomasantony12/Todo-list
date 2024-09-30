import { useState } from "react";


function Form(props) {
    

    function inputTodo (e) {
        props.setTodo(e.target.value);
    }
    
    function insertHandler(e){
        props.inputTask(props.todo);
        props.setTodo("");
    }
    function updateHandler(e){
        props.updateTask(props.todo, props.id);
        props.setTodo("");
    }
  return (
    <div>
      <form className="d-inline-flex align-items-center mw-100 gap-3">
        <input
          className="form-control"
          type="text"
          name="todo"
          onChange={inputTodo}
          value={props.todo}
          autoFocus
          placeholder="Enter Todo"
        />
        <button className=" btn btn-outline-primary " onClick={ props.insertOrUp ? insertHandler : updateHandler}>{props.insertOrUp ? "Add" : "Update"}</button>
      </form>
    </div>
  );
}

export default Form;
