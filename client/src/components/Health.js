import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
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
        .get("https://healthfinder.gov/FreeContent/Developer/Search.json?api_key=uounkvswngttjqjs&TopicID=21/")
        .then(response => {
          const tips = response.data.Result.Topics.RelatedItems;
          console.log (tips)
          this.setState({ healthTips: tips });
        })
        .catch(err => {
          console.log("you messed up!", err);
        });
    };
    render() {
      const healthTips = this.state.healthTips.map((tip, index) => (
        <div key={index}>
          <a href={tip.Url}>{tip.Title}</a>
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