import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import TeaList from "./components/TeaList";
import Tea from "./components/Tea";
import Health from "./components/Health"
import Header from "./components/Header"
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                </div>
                <div className="App">

                    <div>
                        <h1>Poet-Tea</h1>
                        <div>
                            <div><Link to="/">All Teas</Link></div>
                        </div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={TeaList}/>
                      <Route exact path="/teas/:teaId" component={Tea}/>
                      <Route exact path="/health" component={Health}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;