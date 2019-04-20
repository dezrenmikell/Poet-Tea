import React, { Component } from "react";
import axios from "axios";
import Ingredient from "./Ingredient";

class Tea extends Component {
  state = {
    tea: {
      title: "",
      teaId: ""
    },
    ingredients: [],
    oneNewIngredient: {
      name: "",
      description: "",
      tea: this.props.match.params.teaId
    }
  };

  componentDidMount() {
    const teaId = this.props.match.params.teaId;
    this.fetchTea(teaId);
  }

  fetchTea = async teaId => {
    try {
      const teaResponse = await axios.get(`/api/v1/teas/${teaId}/`);
      this.setState({
        tea: teaResponse.data,
        ingredients: teaResponse.data.ingredients
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    }
  };

  createIngredient = () => {
    let newIng = this.state.oneNewIngredient;
    axios.post(`/api/v1/ingredients/`, newIng).then(res => {
      const newIngredients = [...this.state.ingredients];
      newIngredients.tea = this.state.tea.teaId;
      console.log(newIngredients);
      newIngredients.unshift(res.data);
      this.setState({ ingredients: newIngredients });
    });
  };
  deleteIngredient = ingredient => {
    const ingredientId = ingredient.id;
    axios.delete(`/api/v1/ingredients/${ingredientId}/`).then(() => {
      const teaId = this.props.match.params.teaId;
      this.fetchTea(teaId);
    });
  };
  deleteTea = teaId => {
    teaId = this.props.match.params.teaId;
    axios.delete(`/api/v1/teas/${teaId}/`).then(() => {
      this.props.history.goBack();
    });
  };
  handleNewIngredientChange = e => {
    let newIng = { ...this.state.oneNewIngredient };
    newIng[e.target.name] = e.target.value;
    console.log(newIng);
    this.setState({ oneNewIngredient: newIng });
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
    e.preventDefault();
    console.log(ingredient)
    axios
      .put(`/api/v1/ingredients/${ingredient.id}/`,  ingredient )
      .then(res => {
        this.setState({ ingredients: res.data });

      });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.deleteTea(this.state.teaId)}>
          Delete Tea
        </button>
        <img src={this.state.tea.photo_url} alt="" />
        <h1>{this.state.tea.title}</h1>
        <h4>{this.state.tea.description}</h4>
        <h2>Ingredients:</h2>

        <form onSubmit={this.createIngredient}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleNewIngredientChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              cols="30"
              rows="10"
              onChange={this.handleNewIngredientChange}
            />
          </div>
          <button>ADD</button>
        </form>
        <div>
          {this.state.ingredients.map(ingredient => {
            
            return (
              <div key={ingredient.id}>
                <h3>{ingredient.name}</h3>
                <p>{ingredient.description}</p>
                <Ingredient
                  key={ingredient.id}
                  ingredient={ingredient}
                  teaId={this.state.tea.teaId}
                //   ingredient.tea={this.state.tea.teaId}
                  deleteIngredient={this.deleteIngredient}
                  handleChange={this.handleChange}
                  updateIngredient={this.updateIngredient}
                />
                
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Tea;
