import React, {Component} from 'react';
import axios from 'axios';

class Tea extends Component {

    state = {
            tea: {},
            ingredients: [],
    }

    componentDidMount() {
        const teaId = this.props.match.params.id;
        this.fetchTea(teaId)
    }

    fetchTea = async (teaId) => {
        try {
            const teaResponse = await axios.get(`/api/v1/teas/${teaId}`)
            this.setState({
                tea: teaResponse.data,
                ingredients: teaResponse.data.ingredients,
            })
        }
        catch (error) {
            console.log(error)
            this.setState({error: error.message})
        }
    }

    render() {
        return (
            <div>
                <img src={this.state.tea.photo_url} alt=""/>
                <h1>{this.state.tea.title}</h1>
                {this.state.ingredients.map(ingredient => (
                    <div key={ingredient.id}>
                        <h4>{ingredient.name}</h4>
                    </div>
                ))}
            </div>
        );
    }
}

export default Tea;
