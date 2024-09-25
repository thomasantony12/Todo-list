// import { useState } from "react";

function Todos (){
return (
    <div className="d-flex col-2 justify-content-between text-bg-light p-3 w-25 border border-primary rounded-4">
          <div className="d-flex flex-column justify-content-evenly align-items-start text-bg-light ">
            <p className="bg-light text-dark">Buy Milk</p>
            <p className="bg-light text-dark">12/04/2024 10:00</p>
            <p className="bg-light text-dark">status: active</p>
          </div>
          <div className="d-flex flex-column justify-content-evenly align-items-end text-bg-light ">
            <button className="btn link-primary btn-sm">Edit</button>
            <button className="btn link-danger btn-sm">Delete</button>
            <button className="btn link-success btn-sm">Complete</button>
          </div>
        </div>
)
}

export default Todos