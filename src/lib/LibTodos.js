//
export default {
  get_complete_items: function(){
    var arr = [
      /*
      {id:1, name:'not completed' ,value: 0,},
      {id:2, name:'Completed' ,value: 1,},
      {id:2, text:'item-3'},
      */
      {id:0, text:'not completed' },
      {id:1, text:'Completed'},
    ]
    return arr
  },
  get_selected_complete: function(items, value){
    var ret = {}
    items.forEach(function(item){
//console.log(item.id);
      if(parseInt(item.id) === parseInt(value) ){
        ret = item
      }
    });      
    return ret
  },
  get_item: function(items, complete){
    var ret = [];
    items.forEach(function(item){
//console.log(item.complete , item.id);
      if(parseInt(item.complete) === parseInt(complete) ){
        ret.push(item)
      }
    });
    return ret
  },
}
