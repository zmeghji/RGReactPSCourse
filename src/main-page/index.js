import React, {Component} from 'react';
import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';
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
      this.determineUniqueCountries()
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
  determineUniqueCountries = () =>{
    const countries = this.allHouses
      ? Array.from(new Set(this.allHouses.map(h => h.country)))
      : [];
      countries.unshift(null);
      this.setState({countries});
  }
  render(){
    return (
      <div className="container">
        <Header subtitle="Providing houses all over the world" />
        <HouseFilter countries={this.state.countries} />
        <FeaturedHouse house={this.state.featuredHouse}/>
      </div>
    );
  }
}

export default App;
