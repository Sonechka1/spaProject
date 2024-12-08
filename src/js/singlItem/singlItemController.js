import SingleItem from './singlItemModel';
import * as view from './singlItemView';

export default async function(state){
    //Создание нового объекта singlItem
    state.singlItem = new SingleItem(state.routeParams);

    //получение данных с сервера
    await state.singlItem.getItem();

    //рендер нового объекта
    view.render(state.singlItem.result, state.favourites.isFav(state.singlItem.id));



    /*********прослушки событий*******/

    //открытие модального окна
    document.querySelector('.button-order').addEventListener('click', function(){
        view.showModal();
    });

    //закрытие модального окна по клику кнопки
    document.querySelector('.modal__close').addEventListener('click', function(){
        view.hideModal();
    });

    //закрытие модального окна по клику фона
    document.querySelector('.modal-wrapper').addEventListener('click', function(e){
        if(e.target.closest('.modal')){
            return null
        }else{
            view.hideModal();
        }
    });

    //отправка формы и добавление заявок
    document.querySelector('.modal__form').addEventListener('submit',async function(e){
        e.preventDefault();
        const formData = view.getInput();
        await state.singlItem.submitForm(formData);
        const response = state.singlItem.response;
        
        if(response.message === 'Bid Created'){
            alert('Ваша заявка успешно отправлена!');
            view.hideModal();
            view.clearInput();
        }else if (response.message === 'Bid Not Created'){
            response.errors.forEach(item => {
                alert(item)
            });
            
        }
        
    });

     //добавление в избранное
    document.querySelector('.button-favourite').addEventListener('click', function(){
        const id = state.singlItem.id;
        state.favourites.toggleFav(id);
        view.tolleFavoriteBtn(state.favourites.isFav(state.singlItem.id))
    })

    

}