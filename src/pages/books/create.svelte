<script>
import Dexie from 'dexie';  
import moment from 'moment';
import LibTask from '../../lib/LibTask';
import LibBook from '../../lib/LibBook'
import LibDexie from '../../lib/LibDexie';

const book_types = LibBook.get_type_items()
const category_items = LibBook.get_category_items()
const tag_items = LibBook.get_tag_items()
console.log(tag_items[0].id)
//var selected_type = book_types[0]
var config = LibTask.get_const()
var db = new Dexie( config.DB_NAME );
db.version(config.DB_VERSION).stores( config.DB_STORE );  
var dt_now = moment().format('YYYY-MM-DD')
//var elem = document.getElementById('pub_date');
//elem.value = dt

export let selected_type = book_types[0] , selected_category=category_items[0].id
export let selected_tags= [1] , pub_date=dt_now;
//
function onChangeCategory(event) {
  selected_category = event.currentTarget.value;
//console.log("selected=", selected_category)
}
async function handleClick() {
//  alert('clicked')
  await add_item()
}
async function add_item(){
  try {
    var elemTitle = document.getElementById('title');
    var elemContent = document.getElementById('content');
    var elemDate = document.getElementById('pub_date');
    var elemPrice = document.getElementById('price');
// console.log(pub_date)
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
    await db.books.add( item )
    window.location.href = '/#/books/'
  } catch (error) {
    console.error(error);
  }    
}
</script>

<!-- -->
<div class="container pb-4 mb-4">
	<h3>Books - Create</h3>
  <hr />
  <div class="form-group w-75 pb-4 mb-4">
    <label class="w-100">Title:
      <input type="text" class="form-control" name="title" id="title" />
    </label><br />
    <label class="w-100">Content:
      <input type="text" class="form-control" name="content" id="content" />
    </label><br />
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
      value={0} />
    </label><br />            
    <hr />
    <button on:click={handleClick} class="btn btn-primary">Create
    </button>
  
  </div>
</div>
