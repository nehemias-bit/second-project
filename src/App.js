import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Header from './components/Header';
import HeaderTwo from './components/HeaderTwo';
import Home from './components/Home';
import SpecificSearch from './components/SpecificSearch';
import Footer from './components/Footer';
import { getYelp } from './services/api-helper';
import { getYelpOnLoad } from './services/api-helper';
import { onLoadOptions } from './services/api-helper';
import './App.css';
import image1  from './images/1.jpg';
import image2  from './images/2.jpg';
import image3  from './images/3.jpg';
import image4  from './images/4.jpg';
import image5  from './images/5.jpg';
import image6  from './images/6.jpg';
import image7  from './images/7.jpg';
import image8  from './images/8.jpg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImg: [],
      city: '',
      onLoad: [],
      location: '',
      restaurant: '',
      price: '',
      search: [],
      // Tracks the pages y-axis.
      scrollY: null,
      images:[image1,image2,image3,image4,image5,image6,image7,image8],
      style: {
        backgroundImage: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundPosition: ""
      }
    }
  }

  componentDidMount = async () => {
    //Add window event listener.
    window.addEventListener('scroll', this.handleScroll)
    let location = await onLoadOptions();
    let city = location.data.city;
    this.setState({
      city: city
    })
    this.changeImage();
    let onLoad = await getYelpOnLoad(this.state.city)
    let businesses = onLoad.data.businesses
    this.setState({
      onLoad: businesses
    })
  }

  //Updates state with the Y-Axis as the user scrolls.
  handleScroll = () => {
    this.setState({
      scrollY: window.scrollY
    });
  } 

 

  changeImage = () => {
    let index = Math.floor(Math.random() * 8);
    let currentImage = this.state.images[index]
    this.setState({
      style: {
        backgroundImage: `url(${currentImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "center center",
        backgroundAttachment: "fixed"
      }
    })
  }



  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let userSearch = await getYelp(this.state.restaurant, this.state.location, this.state.price);
    
    this.setState({
      search: userSearch.data.businesses
    })
    this.props.history.push('/specific-search');
    // On submit this form will route to the SpecificSearch component with the route
    // in this render function. This history.push('/specific-search') is acting as a link.
  }

  render() {
    //Declare a variable, that upon hitting a specific Y index, will recieve the HeaderTwo component as its value.
    //I'm passing HeaderTwo these props because HeaderTwo is technically a form css'ed to look like a header.
    let header;
    if (this.state.scrollY > 425) {
      header = <HeaderTwo handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
    } 
    
    return (
      <div className="app" style={this.state.style}>
      <Header />
        {
          //Then render that variable inside of curly braces(because its a variable).
          //I also rendered the original header component above the HeaderTwo component because if I dont then the screen
          //develops a glich when you hit the correct Y-axis for the HeaderTwo render. My normal Header component
          //is also completely different from my HeaderTwo component.
          //All you have to do now is create a HeaderTwo component and add css to it.
        }  
        {header}
        
      <Route exact path="/" render={() => (<Home handleChange={this.handleChange} handleSubmit={this.handleSubmit} onLoad={this.state.onLoad} />)} />
      <Route exact path="/specific-search" render={() => (<SpecificSearch search={this.state.search} />)} />
      <Footer />
      </div>
    );
  }
}
export default withRouter(App);
