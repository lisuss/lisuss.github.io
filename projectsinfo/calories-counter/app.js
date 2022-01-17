
// STORAGE CONTROLLER
const StrCtrl = (function(){
    return {
        // Public methods
        storeItem: function(item) {
            let ites;

            // Check for any items in LS
            if(localStorage.getItem('items') === null) {
                items = [];
                // push new item
                items.push(item);
                // Set ls
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem('items'));

                // Push new item
                items.push(item);
                
                // Reset ls
                localStorage.setItem('items', JSON.stringify(items));

            }
        },
        getItemsFromLS: function() {
            let items;
            if(localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }

            return items;
        },
        updateLS: function(update) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(update.id === item.id) {
                    items.splice(index, 1, update);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromLS: function(id) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(id === item.id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearLS: function() {
            localStorage.removeItem('items');
        }   
    }
})();

// Item controller
const ItemCtrl = (function() {
    // Constructor for item

    const Item = function(id, name, kcal) {
        this.id = id;
        this.name = name;
        this.kcal = kcal;
    }

    // Data structure
    const state = {
        items: StrCtrl.getItemsFromLS(),
        currentItem: null,
        totalKcal: 0
    }

    return {
        getItems: function(){
            return state.items;
        },
        addItem: function(name, kcal){
            let ID;
            // generate id
            if(state.items.length > 0){
                ID = state.items[state.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Callories must be numbers
            kcal = parseInt(kcal);

            // Create new item
            newItem = new Item(ID, name, kcal);

            state.items.push(newItem);

            return newItem;

        },
        getTotalKcal: function(){
            let total = 0;

            state.items.forEach(function(item) {
                total += item.kcal;
            });

            state.totalKcal = total;

            return state.totalKcal;
        },
        getItemById: function(id){
            let found = null;
            state.items.forEach(function(item) {
                if(item.id === id){
                    found = item;
                }
            });

            return found;
        },
        updateItem: function(name, kcal) {
            kcal = parseInt(kcal);

            let found = null;

            state.items.forEach(function(item) {
                if(item.id === state.currentItem.id) {
                    item.name = name;
                    item.kcal = kcal;
                    found = item;
                }
            }); 

            return found;
        },
        deleteItem: function(id) {
            const ids = state.items.map(function(item){
                return item.id;
            });

            // get index
            const index = ids.indexOf(id);

            // Remove from array
            state.items.splice(index, 1);
        },
        clearAllItems: function() {
            state.items = [];
        },
        setCurrent: function(item){
            state.currentItem = item;
        },
        getCurrentItem: function() {
            return state.currentItem;
        },
        logState: function() {
            return state;
        }
    }
})();


// UI controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemKcalInput: '#item-kcal',
        totalKcal: '.total-kcal',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        listItems: '#item-list li'
    }

    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.kcal} Kcal</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"> </i>
            </a>
            </li>`;
            });

            // insert list items

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                kcal: document.querySelector(UISelectors.itemKcalInput).value
            }
        },
        addListItem: function(item){
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create list item element
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;

            // Add html
            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.kcal} Kcal</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"> </i>
            </a>
            `;
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearFields: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemKcalInput).value = '';
        },
        hidelist: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalKcal: function(totalKcal){
            document.querySelector(UISelectors.totalKcal).textContent = totalKcal;
        },
        clearEditState: function(){
            UICtrl.clearFields();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemKcalInput).value = ItemCtrl.getCurrentItem().kcal;
            UICtrl.showEditState();
        },
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            // convert node list into array
            listItems = Array.from(listItems);

            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `
                    <strong>${item.name}: </strong> <em>${item.kcal} Kcal</em>
                        <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"> </i>
                 </a>
                    `;
                }
            });
        },
        deleteListItem: function(id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        clearItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            
            // nodelist to array
            listItems = Array.from(listItems);

            listItems.forEach(function(item) {
                item.remove();
            });
        },
        getSelectors: function(){
            return UISelectors;
        }

    }
})();



// APP controller3
const AppCtrl = (function(ItemCtrl, UICtrl, StrCtrl) {
    // Create Load event listeners
    const loadEventListeners = function() {
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', addItem);

        // Disable enter
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // Edit icon event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEdit);

        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdate);

        // Back button
        document.querySelector(UISelectors.backBtn).addEventListener('click', function(e) {
            e.preventDefault();
            UICtrl.clearEditState();
        });

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDelete);

        // Clear item event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAll);
    }

    // Add item
    const addItem = function(e) {
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        if(input.name !== '' && input.kcal !== ''){
           const newItem = ItemCtrl.addItem(input.name, input.kcal);

           // ADD item to UI
         UICtrl.addListItem(newItem);

         // Total calories
         const totalKcal = ItemCtrl.getTotalKcal();

         UICtrl.showTotalKcal(totalKcal);

         // Store in local storage
         StrCtrl.storeItem(newItem);

         // clear
         UICtrl.clearFields();
        }

        e.preventDefault();
    }

    const itemEdit = function(e) {
        if(e.target.classList.contains('edit-item')){
            // Get item
            const listId = e.target.parentNode.parentNode.id;

            const listIdArray = listId.split('-');

            const id = parseInt(listIdArray[1]);

            const itemToEdit = ItemCtrl.getItemById(id);
            // Set item to current item
            ItemCtrl.setCurrent(itemToEdit);

            // add to form
            UICtrl.addItemToForm();

        }
        e.preventDefault();
    }

    const itemUpdate = function(e) {
        const input = UICtrl.getItemInput();

        const update = ItemCtrl.updateItem(input.name, input.kcal);

        // update UI
        UICtrl.updateListItem(update);

        // Total calories
        const totalKcal = ItemCtrl.getTotalKcal();

        UICtrl.showTotalKcal(totalKcal);

        

        // UPDATE ls
        StrCtrl.updateLS(update);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    const itemDelete = function(e) {
        // Getting id of current item
        let currentItem = ItemCtrl.getCurrentItem();

        // Delete it from structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete it from UI
        UICtrl.deleteListItem(currentItem.id);

        // DELTE FROM LS
        StrCtrl.deleteItemFromLS(currentItem.id);

         // Total calories
         const totalKcal = ItemCtrl.getTotalKcal();

         UICtrl.showTotalKcal(totalKcal);
 
         UICtrl.clearEditState();

        e.preventDefault();
    }

    const clearAll = function() {
        // Delete all from structure
        ItemCtrl.clearAllItems();

        // Total calories
        const totalKcal = ItemCtrl.getTotalKcal();

        // Delete from LS
        StrCtrl.clearLS();

        UICtrl.showTotalKcal(totalKcal);

        // Delete from UI
        UICtrl.clearItems();

        UICtrl.hidelist();
    }

    return {
        init: function() {

            UICtrl.clearEditState();
            //Fetch items from state structure
            const items = ItemCtrl.getItems();

            // Check if list is empty
            if(items.length === 0) {
                UICtrl.hidelist();
            } else {
                 // Populate list with items
            UICtrl.populateItemList(items);
            }

            const totalKcal = ItemCtrl.getTotalKcal();

            UICtrl.showTotalKcal(totalKcal);

           

            // Load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl, StrCtrl);

// Initialize App
AppCtrl.init();
