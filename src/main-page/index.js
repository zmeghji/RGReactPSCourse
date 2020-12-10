import React, {Component} from 'react';
import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';

class App extends Component{

  //could initialize state using constructor
  // constructor(props){
  //   //call base component constructor
  //   super(props);
  //   //initialize state 
  //   this.state = {};
  // }
  // But initializing using property is cleaner
  state ={}

  //called after component is mounted
  //good for fetching data
  componentDidMount(){
    this.fetchHouses();
  }
  fetchHouses = () => {
    fetch('/houses.json')
    .then(rsp => rsp.json())
    .then(allHouses => {
      this.allHouses = allHouses;
      this.determineFeaturedHouse();
    })
  }
  determineFeaturedHouse = () => {
    if (this.allHouses){
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      //store in state of component
      this.setState({featuredHouse});
    }
  }
  render(){
    return (
      <div className="container">
        <Header subtitle="Providing houses all over the world" />
        <FeaturedHouse house={this.state.featuredHouse}/>
      </div>
    );
  }
}

export default App;
