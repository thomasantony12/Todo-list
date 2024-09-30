// import { useState } from "react";

function Todos(props) {
  return (
    <div className="d-flex col-2 justify-content-between text-bg-light mt-3 p-3 w-25 border border-primary rounded-4">
      <div className="d-flex flex-column justify-content-evenly align-items-start text-bg-light ">
        <h6 className="bg-light text-dark font-weight-bold m-0">{props.task}</h6>
        <p className="bg-light text-dark m-0">{props.date}</p>
        <p className="bg-light text-dark m-0">Status: {props.status}</p>
      </div>
      <div className="d-flex flex-column justify-content-evenly align-items-end text-bg-light ">
        <button className="btn link-primary btn-sm" onClick={() => props.editTask(props.id)}>Edit</button>
        <button className="btn link-danger btn-sm" onClick={() => props.deleteTask(props.id)}>Delete</button>
        <button className="btn link-success btn-sm" onClick={() => props.completeTask(props.status, props.id)}>{props.status == "Active" ? "Complete" : "Activate" }</button>
      </div>
    </div>
  );
}

export default Todos;
