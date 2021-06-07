<script>
import {link} from 'svelte-spa-router'
import Dexie from 'dexie';  
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';
import LibBook from '../../lib/LibBook';
//
var book_item = {
  title: '', content:''
}
const book_types = LibBook.get_type_items()
const category_items = LibBook.get_category_items()
const tag_items = LibBook.get_tag_items()
var config = LibTask.get_const()
var db = new Dexie( config.DB_NAME );
db.version(config.DB_VERSION).stores( config.DB_STORE );  
export let params = Params , selected_type = book_types[0], item = book_item;
export let selected_category=category_items[0].id , selected_tags=[] ;
export let pub_date='' , price=0;

function onChangeCategory(event) {
  selected_category = event.currentTarget.value;
//console.log("selected=", selected_category)
}
const  get_item = async function (db, id){
  var book = await db.books.get(parseInt(id) );
  item = book
console.log(item)
  selected_type = LibBook.get_selected_type(book_types, item.book_type )
  selected_category = parseInt(item.category_id)
  selected_tags = item.tag_ids
  pub_date = item.pub_date
 price = item.price
  return book
}
get_item(db, params.id)

async function handleClick() {
//  alert('clicked')
  await save_item(db)
}
async function handleClickDelete() {
console.log('handleClickDelete')
  await delete_item(db)
}
async function delete_item(db){
  try {
    await db.books.delete(parseInt(params.id) );
    window.location.href = '/#/books/'
  } catch (error) {
    console.error(error);
  }
}
async function save_item(db){
  try {
console.log(selected_tags)
    var elemTitle = document.getElementById('title');
    var elemContent = document.getElementById('content');
    var elemDate = document.getElementById('pub_date');
    var elemPrice = document.getElementById('price');
    var item = {
      book_type: selected_type.id,
      category_id: selected_category, 
      tag_ids: selected_tags,     
      title: elemTitle.value,
      content: elemContent.value,
      pub_date : elemDate.value,
      price: elemPrice.value,
      created_at: new Date(),
    }
console.log(item)
    await db.books.update(parseInt(params.id) , item);
    window.location.href = '/#/books/'
  } catch (error) {
    console.error(error);
  }    
}
</script>

<!-- -->
<div class="container pb-4">
	<h3>Books - edit</h3>
  <hr />
  <div class="form-group w-75 pb-4 mb-4">
    <label class="w-100">Title:
      <input type="text" class="form-control" name="title" id="title" 
      value={item.title} />
    </label>
    <label class="w-100">Content:
      <input type="text" class="form-control" name="content" id="content"
      value={item.content} />
    </label>
    <hr />
    BookType:
    <select id="complete" name="complete"
      class="form-select mt-2" bind:value ={selected_type}>
      {#each book_types as item}
        <option value={item}>{item.text}</option>
      {/each}
    </select>
    <hr />
    Category選択:<br />
    {#each category_items as item}
    <label class="mx-1"> 
      <input checked={selected_category===item.id } type="radio"
        name="category_id" value={item.id} on:change={onChangeCategory} /> {item.name}
    </label>
    {/each}
    <hr />
    Tag選択:<br />
    {#each tag_items as item}
    <label class="mx-1"> 
      <input type="checkbox" bind:group={selected_tags} value={item.id} /> {item.name}
    </label>
    {/each}  
    <hr />  
    <label class="w-100">pub_date:
      <input type="date" class="form-control" name="pub_date" id="pub_date"
      value={pub_date} />
    </label><br />
    <hr />
    <label class="w-100">Price:
      <input type="number" class="form-control" name="price" id="price"
      value={price} />
    </label><br />            
    <hr />        
    <button on:click={handleClick} class="btn btn-primary">Save</button>
    <hr />
    <button on:click={handleClickDelete} class="btn btn-outline-danger">Delete
    </button>
    <hr />
    <span>ID : {params.id}</span>
  </div>


</div>
