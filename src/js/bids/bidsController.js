import * as view from './bidsView';
import Bids from './bidsModel';


export default  async function(state){
   if(!state.bids){
        state.bids = new Bids();
   }
   
   //получение заявок
  await state.bids.getBids()
  //рендер заявок
  view.renderBids( state.bids.bids);
  
  
}