var bins = {};

// Load saved items from local storage
if (localStorage.getItem("bins")) {
  bins = JSON.parse(localStorage.getItem("bins"));
}

function searchBin() {
  var searchBox = document.getElementById("searchBox");
  var item = searchBox.value.toLowerCase();
  var result = document.getElementById("result");
  var bin_with_s = item + 's'
  var bin_with_es = item + 'es'

  if (item in bins) {
    result.innerText = "Item goes in: " + bins[item] + '.';
  } else if (bin_with_s in bins){
    result.innerText = "Item goes in: " + bins[bin_with_s] + '.';
  } else if (bin_with_es in bins) {
    result.innerText = "Item goes in: " + bins[bin_with_es] + '.';
  } else {
      result.innerText = "Item not found.";
  }
}

function addItem() {
  var addItemBox = document.getElementById("addItemBox");
  var newItem = addItemBox.value.toLowerCase();

  if (newItem.trim() !== "") {
    if (newItem in bins) {
      alert("Item already exists in the bins.");
    } else {
      let which_bin = prompt("Which bin does it go in (recycling, garbage, compost)?: ").toLowerCase();

      var variable = prompt("yo");
      while (variable !== 'hi') {
        let thing = prompt('Enter an item');
        variable = prompt("Enter a bin");
        bins[thing] = variable;
        displayDictionary();
      }
    }
  } else {
    alert("Please enter a valid item.");
  }

  addItemBox.value = "";
  saveToLocalStorage();
}


function bulkAddItemsFromArray(itemArray, bin) {
  if (Array.isArray(itemArray)) {
    for (var i = 0; i < itemArray.length; i++) {
      var item = itemArray[i].toLowerCase();
      if (item.trim() !== "") {
        bins[item] = bin;
      }
    }
    saveToLocalStorage();
    displayDictionary();
  }
}

function deleteItem() {
  var deleteItemBox = document.getElementById("deleteItemBox");
  var itemToDelete = deleteItemBox.value.toLowerCase();

  if (itemToDelete in bins) {
    delete bins[itemToDelete];
    deleteItemBox.value = "";
    saveToLocalStorage();
    alert("Item deleted successfully!");
    displayDictionary();
  } else {
    alert("Item not found.");
  }
}

function saveToLocalStorage() {
  localStorage.setItem("bins", JSON.stringify(bins));
}

function displayDictionary() {
  var dictionaryContainer = document.getElementById("dictionary");
  dictionaryContainer.innerHTML = "";

  var dictionaryHTML = "<ul>";
  for (var item in bins) {
    dictionaryHTML += "<li>" + item + " - " + bins[item] + "</li>";
  }
  dictionaryHTML += "</ul>";

  dictionaryContainer.innerHTML = dictionaryHTML;
}

// Display the dictionary on page load
window.addEventListener("load", displayDictionary);

// Example usage of bulkAddItemsFromArray()
var compostItems = ["Strawberry", "Blueberry", "Raspberry", "Pineapple", "Mango", "Watermelon", "Grapes", "Lemon", "Lime", "Peach", "Pear", "Plum", "Cherry", "Kiwi", "Coconut", "Avocado", "Papaya", "Fig", "Guava", "Cranberry", "Blackberry", "Pomegranate", "Apricot", "Grapefruit", "Passion fruit", "Lychee", "Cantaloupe", "Honeydew melon", "Nectarine", "Tangerine", "Clementine", "Persimmon", "Dragonfruit", "Jackfruit", "Kiwifruit", "Olive", "Date", "Grass clippings", "Grass", "Leaves", "Branches"];
bulkAddItemsFromArray(compostItems, 'compost');

var garbageItems = ['Plastic wrappers', 'Packaging materials', 'Styrofoam containers', 'Cutlery', 'Straws', 'Bags', 'Used tissues', 'Paper towels', 'Disposable paper plates', 'Cups', 'greasy paper', 'Broken glassware', 'Mirrors', 'Window glass', 'Batteries', 'Paints', 'Solvents', 'Chemicals', 'Electronic waste', 'e-waste', 'e waste', 'Used diapers', 'Sanitary pads', 'Tampons'];
bulkAddItemsFromArray(garbageItems, 'garbage');

var recyclingItems = ['Newspapers', 'magazines', 'Office paper', 'envelopes', 'Cardboard boxes', 'cardboard box', 'Cardboard', 'cereal box', 'cereal boxes', 'paper', 'Plastic bottles', 'water bottles', 'soda bottles', 'shampoo bottles', 'Plastic food containers', 'yogurt cups', 'butter tubs', 'butter tub', 'Plastic jars', 'plastic jar', 'peanut butter jars', 'peanut butter jar', 'sauce jars', 'sauce jar', 'Plastic lids', 'plastic lid', 'glass', 'glass bottle', 'bottle', 'Glass jars', 'metal', 'metal can', 'Aluminum cans', 'soda cans', 'canned food', 'Steel cans', 'soup cans', 'vegetable cans', 'Empty aerosol cans', 'carton', 'aerosol cans', 'Milk', 'milk carton', 'juice cartons', 'Soup', 'soup carton', 'broth cartons', 'Drink boxes', 'juice box', 'aluminum foil', 'aluminum', 'foil', 'foil container', 'Plastic bags', 'Plastic grocery bags', 'Bread bags', 'Dry cleaning bags', 'Plastic wrap', 'film', 'reusable watter bottle'];
bulkAddItemsFromArray(recyclingItems, 'recycling');
