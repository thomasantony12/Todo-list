import { useState } from "react";

function Tabs(props) {

  

  function handleClick(val) {
    props.setTab(val);
  }


  return (
    <div className=" d-flex col-2 justify-content-between mt-2 p-3 w-25 ">
      <p
        onClick={() => handleClick(1)}
        style={{ color: props.tab == 1 ? "aqua" : "black", cursor: "pointer" }}
      >
        All
      </p>
      <p
        onClick={() => handleClick(2)}
        style={{ color: props.tab == 2 ? "aqua" : "black", cursor: "pointer" }}
      >
        Active
      </p>
      <p
        onClick={() => handleClick(3)}
        style={{ color: props.tab == 3 ? "aqua" : "black", cursor: "pointer" }}
      >
        Completed
      </p>
    </div>
  );
}

export default Tabs;
