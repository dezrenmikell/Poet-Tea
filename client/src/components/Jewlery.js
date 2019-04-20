import React, { Component } from "react";
import axios from "axios";


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
      <div>
        <button onClick={() => this.deleteJewlery(this.state.jewlery.id)}>
          Delete Jewlery
        </button>
        <img src={this.state.jewlery.photo_url} alt="" />
        <h1>{this.state.jewlery.title}</h1>
        <h4>{this.state.jewlery.description}</h4>
        
        </div>
     
    );
  }
}

export default Jewlery;
