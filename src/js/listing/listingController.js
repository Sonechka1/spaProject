import * as view from './listingView';

export default function(state){
    console.log('listing');
    //рендер контейнера для карточек
    view.render();

    //рендер карточек
    state.results.forEach(item => {
        view.renderCard(item,state.favourites.isFav(item.id));
    });

    addToFavListiner();

    state.emitter.subscribe('event:render-listing', ()=>{
        //очистить контейнер с карточками
        view.clearListingContainer();
        //отрендарить карточки
        state.results.forEach(item => {
            view.renderCard(item,state.favourites.isFav(item.id));
        });
        addToFavListiner();
    });

     function addToFavListiner(){
        Array.from(document.getElementsByClassName('card__like')).forEach((item)=>{
            item.addEventListener('click', function(e){
                e.preventDefault();
    
                const currentId = e.target.closest('.card').dataset.id;
                state.favourites.toggleFav(currentId);
    
                view.toggleFavIcon(e.target.closest('.card__like'),state.favourites.isFav(currentId))
    
            })
         })
     }
} 