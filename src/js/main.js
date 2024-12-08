import homePage from './pages/homePage';
import singlItem from './pages/singlItem';
import favoritePage from './pages/favoritePage';
import bidsPage from './pages/bidsPage';
import errorPage from './pages/errorPage';
import EventEmitter from './utils/EventEmitter';
import Favourites from './fav/favModel';


const state = {
    results: [], 
    emitter: new EventEmitter(),
    favourites: new Favourites()

};




//test - after delete!
window.state = state;


//массив с маршрутами 
const routes = [
    {path: '/' , component: homePage},
    {path: 'item' , component: singlItem},
    {path: 'favourite' , component: favoritePage},
    {path: 'bids' , component: bidsPage},
    
];

function findcompanentByPath(path, routes){
    return routes.find(function(route){
        return route.path === path;
    })
};

function router(){
    const pathArray = location.hash.split('/');
    let currentPath = pathArray[0] === '' ? '/' :pathArray[1];
    currentPath = currentPath ===''? '/' : currentPath;

    //save route params
    state.routeParams =  pathArray[2] ?pathArray[2]: '';

    const {component = errorPage} = 
             findcompanentByPath(currentPath,routes)||{};
     component(state);      
}

window.addEventListener('hashchange' , router);
window.addEventListener('load', router);

