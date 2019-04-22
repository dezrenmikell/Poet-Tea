import React, { Component } from "react";
import axios from "axios";
import styled from 'styled-components';

const CoolA = styled.div`
a{
  background: orange;
  text-align: center;
  border-radius: 15px;
  border: 2px solid black;
}
h2{
  background: orange;
  text-align: center;
  border-radius: 15px;
  border: 2px solid black;
}
`;

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
          const tips = response.data.Result.Topics.RelatedItems;
          
          this.setState({ healthTips: tips });
        })
        .catch(err => {
          console.log("you messed up!", err);
        });
    };
    render() {
      const healthTips = this.state.healthTips.map((tip, index) => (
        <CoolA key={index}>
          <a href={tip.Url}>{tip.Title}</a>
        </CoolA>
      ));
      return (
        <div>
          <CoolA>
            <h2>HEALTH TIPS</h2>
            <div>{healthTips}</div>
          </CoolA>
        </div>
      );
    }
  }
  export default Health;