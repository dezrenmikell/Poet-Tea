import React, {Component} from 'react';
import axios from 'axios';
import Ingredient from './Ingredient';

class Tea extends Component {

    state = {
            tea: {
                title: "",
                teaId:"",
            },
            ingredients: [],
    }

    componentDidMount() {
        const teaId = this.props.match.params.teaId;
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
        const teaId = this.props.match.params.teaId;
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
    deleteTea = (teaId) =>{
        teaId = this.props.match.params.teaId;
        axios.delete(`/api/v1/teas/${teaId}/`).then(() =>{
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
        const teaId = this.props.match.params.teaId;
        axios
          .patch(`/api/v1/teas/${teaId}/ingredients/${ingredient.id}`, { ingredient })
          .then(res => {
            this.setState({ ingredients: res.data.ingredients });
          });
      };

    render() {
        return (
            <div>
                <button onClick={()=> this.deleteTea(this.state.teaId)}>
                Delete Tea
                </button>
                <img src={this.state.tea.photo_url} alt=""/>
                <h1>{this.state.tea.title}</h1>
                <h4>{this.state.tea.description}</h4>
                <h2>Ingredients:</h2>
                <button onClick={this.createIngredient}> +New ingredient</button>
                <div>
                {this.state.ingredients.map(ingredient => {
                    return(
                        <div>
                    <Ingredient
                     key={ingredient.id}
                    ingredient={ingredient}
                    deleteIngredient={this.deleteIngredient}
                    handleChange={this.handleChange}
                    updateIngredient={this.updateIngredient}
                     />
                     {ingredient.name}
                        <p>{ingredient.description}</p>
                     </div>
                     
                    )
                    })}
                        
                    
                </div>

            </div>
        );
    }
}

export default Tea;
