import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import './AurthorQuiz.css';
import './bootstrap.min.css'
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

function Hero(){
  return(
    <div className="rwo">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>select book written by author</p>
      </div>
    </div>
  )
}

function Book({title, onClick}){
  return(
    <div className="answer" onClick={()=>{onClick(title)}}>
      <h4>{title}</h4>
    </div>
  );
}

function Turn({author,books, highlight,onAnswerSelected}) {
  function highlighttoBgColor(highlight) {
    const mapping={
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return(
  <div className="row" style={{backgroundColor:highlighttoBgColor(highlight)}} >
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="aurthorimage" alt="author" height="350px"/>
    </div>
    <div className="col-6">
      {books.map((title) =><Book title={title} key={title} onClick={onAnswerSelected}/>)}
    </div>
  </div>
  );
}

Turn.propTypes={
  author:PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired

  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Continue({show, onContinue}){
  return(<div className="row continue">
    {
      show
      ?<div className="col-11">
        <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
          </div>
        :null
    }

  </div>);
}
function Footer() {
  return(<div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">All images are from wikipedia</p>
    </div>
  </div>);
}

function AurthorQuiz({turnData,highlight,onAnswerSelected, onContinue}) {
  
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
      <Continue show={highlight==='correct'} onContinue={onContinue} />
      <p><Link to="/add">Add an author</Link> </p>
      <Footer />
    </div>
  );
  
}

export default AurthorQuiz;
