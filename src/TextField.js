import React, { Component } from "react";
import "./styles/TextField.css";

const TextField = (props) => {
    const {locations} = props;
    return (
      <div className="inputWrapper">
        <p>{props.title}</p>
        <input
          className="textField"
          type="text"
          list={"locations"}
          onChange={props.onChange}
          value={props.value}
        />
          <datalist id={"locations"}>
              {locations.map((location) => <option value={location}/> )}
          </datalist>
      </div>
    );
}

export default TextField;
