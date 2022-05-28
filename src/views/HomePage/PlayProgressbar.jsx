import React from "react";

import Progressbar from "../../components/Progressbar";

function PlayProgressbar(props) {
  let { setCurrentPercent, setCurrentTime } = props;

  return (
    <div style={Style.p_container}>
      <span>{props.current}</span>
      <Progressbar
        curPercent={props.curPercent}
        prePercent={props.prePercent}
        setCurrentPercent={(percent, isDrag) => {
          setCurrentPercent && setCurrentPercent(percent, isDrag);
        }}
        setCurrentTime={(percent, isDrag) => {
          setCurrentTime && setCurrentTime(percent, isDrag);
        }}
      ></Progressbar>
      <span>{props.duration}</span>
    </div>
  );
}

const Style = {
  p_container: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    width: "100%",
    height: "64px",
    padding: "0 5%",
    color: "white",
    userSelect: "none",
  },
};

export default PlayProgressbar;
