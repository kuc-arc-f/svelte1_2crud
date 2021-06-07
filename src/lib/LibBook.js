
//
export default {
  get_type_items: function(){
    var arr = [
      {id:1, text:'type-1' },
      {id:2, text:'type-2'},
      {id:3, text:'type-3'},
    ]
    return arr
  },
  get_selected_type: function(items, value){
    var ret = {}
    items.forEach(function(item){
//console.log(item.id);
      if(parseInt(item.id) === parseInt(value) ){
        ret = item
      }
    });      
    return ret
  },  
  get_category_items: function(){
    var arr = [
      {id: 1 , name: 'news'} ,
      {id: 2 , name: 'food'} ,
      {id: 3 , name: 'その他'} ,
    ]
    return arr
  },
  get_tag_items: function(){
    var arr = [
      {id: 1 , name: '小学生向け'} ,
      {id: 2 , name: '新着の書籍'} ,
      {id: 3 , name: '絵本こども用'} ,
    ]
    return arr
  },
  get_category_item : function(id , categories){
    try{
      var ret = {id:0, name:""}
      categories.forEach(function (category){
        if( id === category.id ){
          ret = category
        }
      });
      return ret;  
    } catch (e) {
      console.log(e);
      throw new Error('Error , get_category_item');
    } 
  },    
  get_tags : function(ids , tags){
    try{
      var ret = []
      ids.forEach(function (item){
        tags.forEach(function (tag){
          if( item === tag.id ){
//            ret = category
            ret.push(tag)
          }
        });
//        item.category = { name: ""}
//console.log(item)
      });
      return ret;  
    } catch (e) {
      console.log(e);
      throw new Error('Error , get_tags');
    } 
  },
  add_init_data: async function(db, title, content){
    try {
      var item = {
        title: title,
        content: content,
        created_at: new Date(),
        category_id: "0",
        tag_ids : "[]",
        pub_date: "2021-05-19",
        price: "10",
      }
//      console.log(item)
      await db.books.add( item )
    } catch (error) {
      console.error(error);
      throw new Error('Error , add_init_data');    
    }  
  },
  add_init_items: async function(db){
    try {
      for(var i=1; i < 4; i++){
        var item = {
          title: "title-" + String(i),
          content: "content-" + String(i),
        }
        await this.add_init_data(db, item.title, item.content);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error , add_init_items');    
    }  
  },    

}
