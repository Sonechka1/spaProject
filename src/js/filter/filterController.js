import * as fiterView  from './filterView';
import Filter from './filterModel'

 
export default async function(state){
   //создание объекта фильтра
    if(!state.filter){
        state.filter = new Filter();
    }
    //получение параметроа для фильтра
    await state.filter.getParams()
    //отрисовка фильтра
    fiterView.render(state.filter.params);
    //запрос на сервер 
    await state.filter.getResults();
    state.results = state.filter.result;
    //обновляем счетчик на кнопке фильтра
    fiterView.changeButtonText(state.filter.result.length);

    //прослушки событий формы
    const form = document.querySelector('#filter-form'); 

    //изменение формы
    form.addEventListener('change', async function(e){
        e.preventDefault();
        state.filter.query = fiterView.getInput();
        await state.filter.getResults();
        state.results = state.filter.result;
        fiterView.changeButtonText(state.filter.result.length);

    });
    //сброс формы
    form.addEventListener('reset', async function(){
        state.filter.query = '';
        await state.filter.getResults();
        fiterView.changeButtonText(state.filter.result.length);
    });


    //отправка формы
    form.addEventListener('submit',  function(e){
       e.preventDefault()
       console.log('submit');
        state.emitter.emit('event:render-listing', {});
        
       
    })
    
}