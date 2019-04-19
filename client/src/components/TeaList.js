import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class TeaList extends Component {
    state = {
        error: '',
        teas: [],
        tea:{
            title: "",
            description:"",
            photo_url:"",
            ingredients:[],
        },
        redirectToHome: false,
        createdTea: {}
    };

    componentDidMount(){
        this.fetchTeas();
    }

    fetchTeas = async () => {
        try {
            const res = await axios.get('/api/v1/teas/');
            this.setState({teas: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    createTea = ()=>{
        axios.post("/api/v1/teas/", this.state.tea).then(res =>{
            this.setState({redirectToHome: true, createdTea: res.data});
        });
    };

    handleChange = e =>{
        const newTea = { ...this.state.tea};
        newTea[e.target.name] = e.target.value;
        this.setState({tea: newTea});
    };

    handleCreation = e => {
        e.preventDefault();
        this.createTea();
    };

    deleteTea = () =>{
        const teaId = this.props.match.params.teaId;
        axios.delete(`api/v1/tea/${teaId}/`);
        this.props.history.goBack();
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        if(this.state.redirectToHome === true){
            return <Redirect to={`/teas/${this.state.createdTea.id}/`} />;
        }
        return (
            <div>
                <h1>All Teas</h1>
                {this.state.teas.map(tea => {
                    return(
                    <div key={tea.id}>
                        <Link to={`/teas/${tea.id}/`} key={tea.id}>{tea.title}</Link>
                        <div>
                            <img src={tea.photo_url} alt=""/>
                        </div>
                    </div>
                )})}
                <h2> Create A Tea</h2>
                <form onSubmit={this.handleCreation}>
                    <div>
                        <label htmlFor="title">Tea Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={this.handleChange}
                            value={this.state.tea.title}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            onChange={this.handleChange}
                            value = {this.state.tea.description}
                        />

                    </div>
                    <div>
                        <label htmlFor="photo_url">Picture Link</label>
                        <input
                            type="text"
                            name="photo_url"
                            onChange={this.handleChange}
                            value={this.state.tea.photo_url}
                        />
                    </div>
                    <button> Create Tea</button>
                </form>
            </div>
        );
    }
}

export default TeaList;