jquery-symfony2-collection
==========================

Read about collections here:
http://symfony.com/doc/current/reference/forms/types/collection.html


```js
$(function() {
  $("#tags").collection();
});
```

"#tags" can be replaced by the name of your collection, some examples: "#user_tags", "#order_items"

Advanced use:

```js
$("#collection").collection({
  addButton: $('<a href="#" class="add-collection-item">Add</a>'),
  deleteButton: $('<a href="#" class="delete-collection-item">Delete</a>'),
  deleteButtonPath: null, // where to append the delete button in the new child
  addButtonContainer: null, // where should the plugin put the add button
  newChildrenContainer: null, // where should it put new children
  onAdd: function (child) {
      $(child).find('select').select2(); // some random examples
      $(child).find('.datetime').datepicker();
  }, 
  onDelete: function (child) {
      // do something here after deleting a child
  },
});
```

