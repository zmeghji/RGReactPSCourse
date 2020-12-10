import React, {Component} from 'react';
import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';
import SearchResults from '../search-results'
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
  filterHouses = (country) => {
    this.setState({activeHouse: null});
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({filteredHouses});
    this.setState({country});
  }
  setActiveHouse = (house) => {
    this.setState({activeHouse: house});
  }
  render(){
    let activeComponent = null;
    if (this.state.country){
      activeComponent = <SearchResults 
        country={this.state.country}
        filteredHouses={this.state.filteredHouses}
        setActiveHouse={this.setActiveHouse} />
    }
    // else if (this.state.activeHouse){
    //   activeComponent = <HouseDetail 
    //     house={this.state.activeHouse} />
    // }
    else if (!activeComponent){
      activeComponent = <FeaturedHouse house={this.state.featuredHouse}/>;
    }

    return (
      <div className="container">
        <Header subtitle="Providing houses all over the world" />
        <HouseFilter 
          countries={this.state.countries}
          filterHouses={this.filterHouses} />
        {activeComponent}
      </div>
    );
  }
}

export default App;
