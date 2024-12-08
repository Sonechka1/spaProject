import singlItem from './../singlItem/singlItemController';


export default function(state){
 //очищеаем контейнер приложения
     document.querySelector('#app').innerHTML = '';

     //запускаем компонент singlItem
     singlItem(state);
}