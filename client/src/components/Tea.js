import React, {Component} from 'react';
import axios from 'axios';

class Tea extends Component {

    state = {
            tea: {
                title: "",
                teaId:"",
            },
            ingredients: [],
    }

    componentDidMount() {
        const teaId = this.props.match.params.id;
        this.fetchTea(teaId)
    }

    fetchTea = async (teaId) => {
        try {
            const teaResponse = await axios.get(`/api/v1/teas/${teaId}/`)
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

    createIngredient = () => {
        const teaId = this.props.match.params.tea._id;
        axios.post(`/api/v1/teas/${teaId}/ingredients`).then(res =>{
            const newIngredients = [...this.state.ingredients];
            newIngredients.unshift(res.data);
            this.setState({ ingredient: newIngredients});
        })
    }
    deleteIngredient = ingredient =>{
        const teaId = this.props.match.params.teaId;
        const ingredientId = ingredient._id;
        axios.delete(`/api/v1/teas/${teaId}/ingredients/${ingredientId}/`).then(res=>{
            this.setState({ ingredients: res.data});
        });
    };
    deleteTea = (tea) =>{
        tea = this.props.match.params.tea;
        axios.delete(`/api/v1/teas/${tea.id}/`).then(() =>{
            this.props.history.goBack();
        });

    };

    handleChange = (ingredient, event) => {
        const newIngredients = [...this.state.ingredients];
    
        const ingredients = newIngredients.map(savedIngredient => {
          if (savedIngredient.id === ingredient.id) {
            savedIngredient[event.target.name] = event.target.value;
          }
          return savedIngredient;
        });
        this.setState({ ingredients: ingredients });
    };

    updateIngredient = (ingredient, e) => {
        const teaId = this.props.match.params.tea.id;
        axios
          .patch(`/api/v1/teas/${teaId}/ingredients/${ingredient.id}`, { ingredient })
          .then(res => {
            this.setState({ ingredients: res.data.ingredients });
          });
      };

    render() {
        return (
            <div>
                <button onClick={()=> this.deleteTea(this.state.tea.id)}>
                Delete Tea
                </button>
                <img src={this.state.tea.photo_url} alt=""/>
                <h1>{this.state.tea.title}</h1>
                <h4>{this.state.tea.description}</h4>
                <h2>Ingredients:</h2>
                <button onClick={this.createIngredient}> +New ingredient</button>
                {this.state.ingredients.map(ingredient => (
                    
                    <div key={ingredient.id}>
                        
                        <h3> * {ingredient.name}-</h3>
                        <p>{ingredient.description}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Tea;
