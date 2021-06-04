//
export default {
  get_complete_items: function(){
    var arr = [
      {id:1, name:'not completed' ,value: 0,},
      {id:2, name:'Completed' ,value: 1,},
    ]
    return arr
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
