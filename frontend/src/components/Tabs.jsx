import { useState } from "react";

function Tabs() {

  const [tab, setTab] = useState(1);

  function handleClick(val) {
    setTab(val);
  }


  return (
    <div className=" d-flex col-2 justify-content-between mt-2 p-3 w-25 ">
      <p
        onClick={() => handleClick(1)}
        style={{ color: tab == 1 ? "aqua" : "black", cursor: "pointer" }}
      >
        All
      </p>
      <p
        onClick={() => handleClick(2)}
        style={{ color: tab == 2 ? "aqua" : "black", cursor: "pointer" }}
      >
        Active
      </p>
      <p
        onClick={() => handleClick(3)}
        style={{ color: tab == 3 ? "aqua" : "black", cursor: "pointer" }}
      >
        Completed
      </p>
    </div>
  );
}

export default Tabs;
