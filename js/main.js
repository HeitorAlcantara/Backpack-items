const form = document.getElementById("novoItem");
const list = document.querySelector(".lista");
const items = JSON.parse(localStorage.getItem("items")) || [];

items.forEach(element => {
    addElement(element);
});

form.addEventListener("submit", event => {
    event.preventDefault();

    const name = event.target.elements['nome'].value;
    const quantity = event.target.elements['quantidade'].value;
    const localItem = {
        name,
        quantity
    };

    const exists = items.find(element => (element.name === name));
    
    if(exists) {
        localItem.id = exists.id;

        updateElement(localItem);

        items[items.findIndex(element => element.id === exists.id)] = localItem;

    }else {
        localItem.id = items[items.length - 1] ? items[items.length - 1].id + 1 : 0; 
        console.log(localItem);
        addElement(localItem);

        items.push(localItem);
    }

    localStorage.setItem("items", JSON.stringify(items)); //localStorage apenas le String

    form.reset(); //reseta para os values original
})

function addElement(dataItem) {
    const li = document.createElement("li");
    li.classList.add("item"); //className apaga todas as outras classes

    const strong = document.createElement("strong");
    strong.innerHTML = dataItem.quantity;
    strong.dataset.id = dataItem.id;

    li.appendChild(strong);
    li.innerHTML += dataItem.name;
    li.appendChild(deleteButton(dataItem.id));

    list.appendChild(li);
}

function updateElement(itemUpdate) {
    document.querySelector(`[data-id="${itemUpdate.id}"]`).innerHTML = itemUpdate.quantity;
}

function deleteButton (id) {
    const button = document.createElement("button");
    button.innerText = '❌';

    button.addEventListener("click", function () {
        deleteElement(this.parentNode, id)
    })

    return button;
}

function deleteElement (tag, id) {
    tag.remove();

    items.splice(items.findIndex(element => element.id === id), 1);
    
    localStorage.setItem("items", JSON.stringify(items));
}