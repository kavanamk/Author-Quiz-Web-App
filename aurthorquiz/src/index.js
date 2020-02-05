import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter} from 'react-router-dom';
import './AurthorQuiz.css';
import AddAuthorForm from './AddAuthorForm';
import AurthorQuiz from './AurthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';


const authors=[
    {
        name : 'MarkTwain',
        imageUrl :'images/authors/marktwain.jpg',
        imageSource : 'wikipedia',
        books: ['Adventures of Hukkleberry Finn', 'Life of Pi','Alchemist','Tom Swayer']
    },
    {
        name : 'JK Rowling',
        imageUrl :'images/authors/jkrowling.jpg',
        imageSource : 'wikipedia',
        books: ['philosophers stone', 'chamber of secrets','prisioners of askhaban','order of pheonix']
    },
    {
        name : 'Sam Harris',
        imageUrl :'images/authors/samharris.jpg',
        imageSource : 'wikipedia',
        books: ['The End of Faith', 'Waking up','free will','Moral landscape']
    },
    {
        name : 'Stephen King',
        imageUrl :'images/authors/stephenking.jpg',
        imageSource : 'wikipedia',
        books: ['It','Outsider','Doctor sleep','carrie']
    }
];

function getTurnData(authors){
    const allBooks = authors.reduce(function(p,c,i){
        return p.concat(c.books);
    },[]);
    //shuffle into random order
    const fourRandomBooks=shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);
    return{
        books: fourRandomBooks,
        author: authors.find((author) =>
        author.books.some((title) =>
        title==answer))
    }
}
function resetState(){
    return {
        turnData : getTurnData(authors),
        highlight: ''
    };
}
let state= resetState();

function onAnswerSelected(answer){
    const isCorrect = state.turnData.author.books.some((book)=>book == answer);
    state.highlight = isCorrect? 'correct' : 'wrong';
    if(state.highlight=='wrong'){
        alert("Game over!");
    }
    render();
}



function App(){
    return <AurthorQuiz {...state} 
    onAnswerSelected={onAnswerSelected}
    onContinue={() =>{
        state=resetState();
        render();
    }}/>;  
}
const AuthorWrapper = withRouter(({history}) => 
    <AddAuthorForm onAddAuthor={(author) =>{
        authors.push(author);
        history.push('/');
    }}/>
    );


function render(){
ReactDOM.render(
<BrowserRouter>
<React.Fragment>
<Route exact path="/" component={App} />
  <Route path="/add" component={AuthorWrapper} />
</React.Fragment>
  </BrowserRouter>, document.getElementById('root'));
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
