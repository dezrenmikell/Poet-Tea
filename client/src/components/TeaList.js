import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  background: orange;
  text-align: center;
  border-radius: 15px;
  padding: 5px;
`;
const StuffWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 7px solid black;
    margin: 0 auto;
    background: silver;

    width: 180px;
    height: 250px;
    border-radius: 50px;
 
    align-items: center;
    justify-content: center;
    border: 4px solid black;
    margin-top: 10px;

    input,textarea {
        margin-bottom: 30px;
        font-size: 1.8em;
        background-color: silver;        
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
        background: orange;
        align-items: center;
        justify-content: center;
        text-align: center;
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
const AddButton = styled.button`
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

    toggleAddForm = () => {
        this.setState((state, props) => {
            return {isAddFormDisplayed: !state.isAddFormDisplayed}
        })
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        if(this.state.redirectToHome === true){
            return <Redirect to={`/teas/${this.state.createdTea.id}/`} />;
        }
        return (
            <PageWrapper>
            <h2> All Teas </h2>
                {this.state.teas.map(tea => {
                    return(
                    <StuffWrapper key={tea.id}>
                        <h2><StyledLink to={`/teas/${tea.id}/`} key={tea.id}>{tea.title}</StyledLink></h2>
                        <div>
                            <img src={tea.photo_url} alt=""/>
                        </div>
                    </StuffWrapper>
                )})}
                <div><AddButton onClick={this.toggleAddForm}>
                    {this.state.isAddFormDisplayed === true ? 'Finished' : 'Create A Tea'}
                </AddButton></div>
                <h2> Create A Tea</h2>
                
                {
                    this.state.isAddFormDisplayed
                        ?  
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
                    <NewButton onClick={this.handleCreation}> Add Tea to List</NewButton>
                </form>:null}
            </PageWrapper>
        );
    }
}

export default TeaList;