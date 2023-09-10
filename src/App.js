import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
export default class App extends Component {
  c = "hello world";
  apiKey = process.env.REACT_APP_NEWS_API
  
  render() {
    return (
      <>
        <Router>
          <Navbar changeCategory={{}} />
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={12} apiKey={this.apiKey} country="in" category="general" />} />
            <Route exact path="/business" element={<News key="Business" pageSize={12} apiKey={this.apiKey} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News key="Entertainment" pageSize={12} apiKey={this.apiKey} country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News key="Health" pageSize={12} apiKey={this.apiKey} country="in" category="health" />} />
            <Route exact path="/science" element={<News key="Science" pageSize={12} apiKey={this.apiKey} country="in" category="science" />} />
            <Route exact path="/sports" element={<News key="Sports" pageSize={12} apiKey={this.apiKey} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News key="Technology" pageSize={12} apiKey={this.apiKey} country="in" category="technology" />} />
          </Routes>
        </Router>
      </>
    )
  }
}
