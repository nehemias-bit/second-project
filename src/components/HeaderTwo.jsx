import React from 'react';
// import { Link } from 'react-router-dom';


export default function HeaderTwo(props) {
  return (
    <div>
      <header id="header-two">
        <form onSubmit={props.handleSubmit} >
          <input type="text" placeholder="Food Item, Restaurant Name..." name="restaurant" onChange={props.handleChange} />
          <input type="text" placeholder="City or Address or Zip Code..." name="location" onChange={props.handleChange}  />
          <select onChange={props.handleChange} name="price" defaultValue="Price Option">
            <option disabled value="Price Option">Price Option</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          <button>Search</button>
        </form>
      </header>
    </div>
  )
}