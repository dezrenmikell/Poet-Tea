import React, { Component } from "react";
import axios from "axios";
// import styled from "styled-components";

class Health extends Component {
    state = {
      healthTips: []
    };
  
    componentDidMount() {
      this.getHealthTips();
    }
  
    getHealthTips = () => {
      axios
        .get("https://healthfinder.gov/FreeContent/Developer/Search.json?api_key=uounkvswngttjqjs&TopicID=21")
        .then(response => {
          const tips = response.Result;
          this.setState({ healthTips: tips });
        })
        .catch(err => {
          console.log("you messed up!", err);
        });
    };
    render() {
      const healthTips = this.state.healthTips.map((tip, index) => (
        <div key={index}>
          <h3>{tip.Topics.RelatedItems.Title}</h3>
          <h3>{tip.Topics.RelatedItems.Url}</h3>
        </div>
      ));
      return (
        <div>
          <div>
            <h1>HEALTH TIPS</h1>
            <div>{healthTips}</div>
          </div>
        </div>
      );
    }
  }
  export default Health;