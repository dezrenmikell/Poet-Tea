import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  background: orange;
  text-align: center;
  border-radius: 15px;
  border: 2px solid black;
  padding: 5px;
`;
const StuffWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 7px solid black;
    margin: 0 auto;
    background: silver;

    width: 180px;
    height: 230px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    border: 4px solid black;
    margin-top: 10px;

    input,textarea {
        margin-bottom: 30px;
        font-size: 1.8em;
        background-color: orange;        
        text-align: center;
        margin: 0 auto;
        width: 300px;
        border-radius: 50px;
        display: flex;
    }
    input{
        font-weight: bold;
        font-size: 2em;
        
        height: 50px;

        border: 4px solid silver;
        border-radius: 50px;
        background-color: orange;        
        text-align: center;

 
    }
    textarea{
        display: flex;
        text-align: center;
        vertical-align: middle;
        height: 50px;
        border: 4px solid silver;
        justify-content: center;
        align-items: center;
        padding: 15px;
        width 270px;
    }
    `;
const PageWrapper = styled.div`
        border: 4px solid black;

        border-radius: 10px;
    h2{
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: orange;
        border: 4px solid black
        border-radius: 30px;

    }
    
`;
const NewButton = styled.button`
    background green;
    border-radius: 30px;
    font-weight: bold;
    text-align: center;
    border: 4px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    
`;

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
            this.setState({redirectToHome: true, createdJewlery: res.data});
        });
    };

    handleChange = e =>{
        const newJewlery = { ...this.state.jewlery};
        newJewlery[e.target.name] = e.target.value;
        this.setState({jewlery: newJewlery});
    };

    handleCreation = e => {
        e.preventDefault();
        this.createJewlery();
    };

    deleteJewlery = () =>{
        const jewleryId = this.props.match.params.jewleryId;
        axios.delete(`api/v1/jewlerys/${jewleryId}/`);
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
            <PageWrapper>
                <h2>All Jewlery</h2>
                {this.state.jewlerys.map(jewlery => {
                    return(
                    <StuffWrapper key={jewlery.id}>
                        <StyledLink to={`/jewlerys/${jewlery.id}/`} key={jewlery.id}>{jewlery.title}</StyledLink>
                        <div>
                            <img src={jewlery.photo_url} alt=""/>
                        </div>
                    </StuffWrapper>
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
                    <NewButton onClick={this.handleCreation}> Create Jewlery</NewButton>
                </form>
            </PageWrapper>
        );
    }
}

export default JewleryList;