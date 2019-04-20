import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class JewleryList extends Component {
    state = {
        error: '',
        jewlerys: [],
        jewlery:{
            title: "",
            description:"",
            photo_url:"",
        },
        redirectToHome: false,
        createdJewlery: {}
    };

    componentDidMount(){
        this.fetchJewlerys();
    }

    fetchJewlerys = async () => {
        try {
            const res = await axios.get('/api/v1/jewlerys/');
            this.setState({jewlerys: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    createJewlery = ()=>{
        axios.post("/api/v1/jewlerys/", this.state.jewlery).then(res =>{
            this.setState({redirectToHome: true, createdTea: res.data});
        });
    };

    handleChange = e =>{
        const newJewlery = { ...this.state.jewlery};
        newJewlery[e.target.name] = e.target.value;
        this.setState({tea: newJewlery});
    };

    handleCreation = e => {
        e.preventDefault();
        this.createJewlery();
    };

    deleteJewlery = () =>{
        const jewleryId = this.props.match.params.jewleryId;
        axios.delete(`api/v1/jewlery/${jewleryId}/`);
        this.props.history.goBack();
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        if(this.state.redirectToHome === true){
            return <Redirect to={`/jewlerys/${this.state.createdJewlery.id}/`} />;
        }
        return (
            <div>
                <h1>All Jewlery</h1>
                {this.state.jewlerys.map(jewlery => {
                    return(
                    <div key={jewlery.id}>
                        <Link to={`/jewlerys/${jewlery.id}/`} key={jewlery.id}>{jewlery.title}</Link>
                        <div>
                            <img src={jewlery.photo_url} alt=""/>
                        </div>
                    </div>
                )})}
                <h2> Create Jewlery</h2>
                <form onSubmit={this.handleCreation}>
                    <div>
                        <label htmlFor="title">Jewlery Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={this.handleChange}
                            value={this.state.jewlery.title}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            onChange={this.handleChange}
                            value = {this.state.jewlery.description}
                        />

                    </div>
                    <div>
                        <label htmlFor="photo_url">Picture Link</label>
                        <input
                            type="text"
                            name="photo_url"
                            onChange={this.handleChange}
                            value={this.state.jewlery.photo_url}
                        />
                    </div>
                    <button onClick={this.handleCreation}> Create Jewlery</button>
                </form>
            </div>
        );
    }
}

export default JewleryList;