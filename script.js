var bins = {};

// Load saved items from local storage
if (localStorage.getItem("bins")) {
  bins = JSON.parse(localStorage.getItem("bins"));
}

function searchBin() {
  var searchBox = document.getElementById("searchBox");
  var item = searchBox.value.toLowerCase();
  var result = document.getElementById("result");

  if (item in bins) {
    result.innerText = "Item goes in: " + bins[item] + '.';
  } else {
    result.innerText = "Item not found.";
  }
}

function addItem() {
  var addItemBox = document.getElementById("addItemBox");
  var newItem = addItemBox.value.toLowerCase();

  if (newItem.trim() !== "") {
    let which_bin = prompt("Which bin does it go in (recycling, garbage, compost)?: ").toLowerCase();
    if (which_bin === 'recycling' || which_bin === 'garbage' || which_bin === 'compost') {
        bins[newItem] = which_bin;
        addItemBox.value = "";
        saveToLocalStorage();
        alert("New item added successfully!");
        displayDictionary();
    } else {
        alert('Please enter a valid item.');
    }


  } else {
    alert("Please enter a valid item.");
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
