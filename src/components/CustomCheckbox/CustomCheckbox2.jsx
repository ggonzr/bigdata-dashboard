/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";

class CustomCheckbox extends Component {
  constructor(props) {
    super(props);
    let { data } = this.props;
    data.checked = false;
    this.state = {
      id: data.number
    };
    this.handleClick = this.handleClick.bind(this);
  }  

  handleClick(value) {
    this.props.handleChanges(this.state.id, value);    
  }
  render() {
    const { data, selectedId, inline } = this.props;    
    const classes = inline !== undefined ? "checkbox checkbox-inline" : "checkbox";
    return (
      <div className={classes}>
        <input
          id={data.number}
          type="checkbox"          
          disabled={selectedId && selectedId !== data.number}
          onChange={e => this.handleClick(e.target.checked)}                 
        />
        <label htmlFor={data.number}>{data.label}</label>
      </div>
    );
  }
}

export default CustomCheckbox;
