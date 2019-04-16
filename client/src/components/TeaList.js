import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TeaList extends Component {
    state = {
        error: '',
        teas: []
    }

    componentDidMount(){
        this.fetchTeas();
    }

    fetchTeas = async () => {
        try {
            const res = await axios.get('/api/v1/teas');
            this.setState({teas: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <h1>All Teas</h1>
                {this.state.teas.map(tea => (
                    <div key={tea.id}>
                        <Link to={`/teas/${tea.id}`} >{tea.title}</Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default TeaList;