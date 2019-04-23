import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const StuffWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 7px solid orange;
    margin: 0 auto;
    margin-top: 5px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    border: 4px solid orange;
    width: 250px;
    height: 400px;

    img{
      display: flex;
      align-items: center;
      justify-content: center;
      border: 4px solid black;
    }

    input,textarea {
        font-size: 1.8em;
        background-color: orange;        
        text-align: center;
        margin: 0 auto;
        border-radius: 50px;
        display: flex;
    }
    input{
        font-weight: bold;
        font-size: 2em;
        border: 4px solid silver;
        border-radius: 50px;
        background-color: orange;        
        text-align: center;

 
    }
    textarea{
        display: flex;
        text-align: center;
        vertical-align: middle;
        border: 4px solid silver;
        justify-content: center;
        align-items: center;
    }

    h2{
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: orange;
      border: 4px solid black
      border-radius: 30px;
      padding: 8px;
  }
  h4{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: orange;
    border: 4px solid black
    border-radius: 30px;
    padding: 8px;
  }
  
  h3{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: orange;
    border: 4px solid black
    border-radius: 30px;
  }
  
  p{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: orange;
    border: 4px solid black
    border-radius: 30px;
  }
    
    `;

    
const DeleteButton = styled.button`
  margin: 0 auto;
  marigin-top: 20px;
  border-radius: 10px;
  background: red;
  font-weight: bold;
`;

class Jewlery extends Component {
  state = {
    jewlery: {
      title: "",
      jewleryId: ""
    },
    
  };

  componentDidMount() {
    const jewleryId = this.props.match.params.jewleryId;
    this.fetchJewlery(jewleryId);
  }

  fetchJewlery = async jewleryId => {
    try {
      const jewleryResponse = await axios.get(`/api/v1/jewlerys/${jewleryId}/`);
      this.setState({
        jewlery: jewleryResponse.data,
        
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    }
  };

  
  
  deleteJewlery= jewleryId => {
    jewleryId = this.props.match.params.jewleryId;
    axios.delete(`/api/v1/jewlerys/${jewleryId}/`).then(() => {
      this.props.history.goBack();
    });
  };


  render() {
    return (
      <StuffWrapper>
        <DeleteButton onClick={() => this.deleteJewlery(this.state.jewlery.id)}>
          Delete Jewlery
        </DeleteButton>
        <img src={this.state.jewlery.photo_url} alt="" />
        <h2>{this.state.jewlery.title}</h2>
        <h4>{this.state.jewlery.description}</h4>
        
        </StuffWrapper>
     
    );
  }
}

export default Jewlery;
