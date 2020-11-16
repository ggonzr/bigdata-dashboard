import React, { Component } from "react";
import { Card } from "components/Card/Card.jsx";
import {
    Grid    
} from "react-bootstrap";

class Tweet extends Component {
  constructor(props) {
      super(props);
      this.state = {
          title: this.props.title,
          text: this.props.text
      }
  }
  render() {
    const { title, text } = this.state;
    return (
      <Card
        title={title}
        category="Analisis de sentimientos"
        ctTableFullWidth
        ctTableResponsive
        content={
          <div className='content'>
              <Grid fluid>
                <p>{text}</p>
              </Grid>            
          </div>          
        }
      />
    );
  }
}

export default Tweet