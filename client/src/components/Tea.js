import React, { Component } from "react";
import axios from "axios";
import Ingredient from "./Ingredient";
import styled from "styled-components";

const StuffWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid silver;
  margin: 0 auto;
  margin-top: 5px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  

  img {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid black;
  }

  input,
  textarea {
    font-size: 1.8em;
    background-color: silver;
    text-align: center;
    margin: 0 auto;
    border-radius: 50px;
    display: flex;
    border: 4px solid orange;
    font-family: 'Lobster', cursive;
    width: 300px;
  }
  input {
    font-weight: bold;
    font-size: 2em;
    border-radius: 50px;
    background-color: silver;
    text-align: center;
  }
  textarea {
    display: flex;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
  }
`;

const PageWrapper = styled.div`
    border: 4px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  
h2{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: orange;
    border: 4px solid black
    border-radius: 30px;
    padding: 5px;

}
h4{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: orange;
  border: 4px solid black
  border-radius: 30px;
  padding: 5px;
}

h3{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: orange;
  border: 4px solid black
  border-radius: 30px;
  padding: 8px;
}

p{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: orange;
  border: 4px solid black
  border-radius: 30px;
  padding: 8px;
}

.ingredient-form {
  display: flex;
  flex-direction: column;
}
`;

const DeleteButton = styled.button`
  margin: 0 auto;
  marigin-top: 20px;
  border-radius: 10px;
  background: red;
  font-weight: bold;
  font-family: 'Lobster', cursive;
`;

const AddButton = styled.button`
  margin: 0 auto;
  marigin-top: 20px;
  border-radius: 10px;
  background: green;
  font-weight: bold;
  border: 1px solid silver;
  font-family: 'Lobster', cursive;
`;
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
    console.log(ingredient);
    axios.put(`/api/v1/ingredients/${ingredient.id}/`, ingredient).then(res => {
      this.setState({ ingredient: res.data });
    });
  };

  toggleEditForm = () => {
    this.setState((state, props) => {
        return {isEditFormDisplayed: !state.isEditFormDisplayed}
    })
}

toggleAddForm = () => {
  this.setState((state, props) => {
      return {isAddFormDisplayed: !state.isAddFormDisplayed}
  })
}

  render() {
    return (
      <PageWrapper>
        <h2>{this.state.tea.title}</h2>
        <h4>{this.state.tea.description}</h4>
        <div>
          <img src={this.state.tea.photo_url} alt="" />
        </div>
        <DeleteButton onClick={() => this.deleteTea(this.state.teaId)}>
          Delete Tea
        </DeleteButton>

        <h2>Ingredients:</h2>
        <div><AddButton onClick={this.toggleAddForm}>
                    {this.state.isAddFormDisplayed === true ? 'Finished' : 'Add Ingredient'}
                </AddButton></div>
                {
                    this.state.isAddFormDisplayed
                        ?  
        <form className="ingredient-form" onSubmit={this.createIngredient}>
          <StuffWrapper>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.handleNewIngredientChange}
              />
            </div>
            <div>
              <textarea
                name="description"
                placeholder="Description"
                cols="30"
                rows="10"
                onChange={this.handleNewIngredientChange}
              />
            </div>
          </StuffWrapper>
          <AddButton>ADD</AddButton>
        </form> :null}
        <div>
          {this.state.ingredients.map(ingredient => {
            return (
              <StuffWrapper key={ingredient.id}>
                <h3>{ingredient.name}</h3>
                <p>{ingredient.description}</p>
                <div><AddButton onClick={this.toggleEditForm}>
                    {this.state.isEditFormDisplayed === true ? 'Finished' : 'Edit Ingredients'}
                </AddButton></div>
                {
                    this.state.isEditFormDisplayed
                        ?
                <Ingredient
                  key={ingredient.id}
                  ingredient={ingredient}
                  teaId={this.state.tea.teaId}
                  //   ingredient.tea={this.state.tea.teaId}
                  deleteIngredient={this.deleteIngredient}
                  handleChange={this.handleChange}
                  updateIngredient={this.updateIngredient}
                />
                :null}
              </StuffWrapper>
            );
          })}
        </div>
      </PageWrapper>
    );
  }
}

export default Tea;
