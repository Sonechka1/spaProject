export default class Filter{
    constructor(){
        this.query = '';
    }
    //Получение значений для фильтра щапросом на сервер
   async getParams(){
        try{
            const queryString = 'https://jsproject.webcademy.ru/itemsinfo';
            const response = await fetch(queryString);
            const data = await response.json();
            this.params = await data;
        }catch(error){
            alert(error)
        }
    }


   async getResults(){
        try{
            const queryString = `https://jsproject.webcademy.ru/items${this.query}`;
            const response = await fetch(queryString);
            const data  = await response.json();
            this.result = await data;  
            console.log('result' , this.result)
           
        }catch(error){
            alert(error)
        }
    }
}