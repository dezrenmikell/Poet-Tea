import React, {Component} from "react";
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import TeaList from "./components/TeaList";
import Tea from "./components/Tea";
import Health from "./components/Health"
import Header from "./components/Header"
import JewleryList from "./components/JewleryList"
import Jewlery from "./components/Jewlery"
import "./App.css";

const StyledLink = styled(Link)`
  background: silver;
  border: 2px solid black;
  border-radius: 8px;
  width: 100px;
  text-align: center;
  padding: 3px;
  height: 55px;
`;

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                </div>
                <div className="App">

                    <div>

                        <div>
                            <div><StyledLink to="/">All Teas</StyledLink></div>
                        </div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={TeaList}/>
                      <Route exact path="/teas/:teaId" component={Tea}/>
                      <Route exact path="/jewlerys" component={JewleryList}/>
                      <Route exact path="/jewlerys/:jewleryId" component={Jewlery}/>
                      <Route exact path="/health" component={Health}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;