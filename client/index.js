let toDos = [ 
            /*{
                category: "General",
                toDoList: [
                    {
                        id: 2756,
                        name: "get cards",
                        done: false
                    },
                    {
                        id: 1745,
                        name: "go to work",
                        done: false
                    },
                    {
                        id: 9784,
                        name: "play tarkov",
                        done: false
                    },
                ]
            },
            {
                category: "School",
                toDoList: [
                    {
                        id: 5678,
                        name: "swag",
                        done: false
                    },
                    {
                        id: 3462,
                        name: "steeeze",
                        done: false
                    },
                    {
                        id: 7846,
                        name: "cool",
                        done: false
                    },
                ]
            },
            {
                category: "Chores",
                toDoList: [
                    {
                        id: 0,
                        name: "dishes",
                        done: false
                    },
                    {
                        id: 1,
                        name: "clothes",
                        done: false
                    },
                    {
                        id: 2,
                        name: "cleaning",
                        done: false
                    },
                ]
            },*/
]
// got this function from MDN docs
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
  }
  

function pendingItems(arr) {
    const alertText = document.querySelector(".alert")
    let count = 0
    for (i = 0; i < arr.length; i ++) {
        for (const category of arr[i].toDoList) {
            if (category.done == false) {
                count += 1
            }
        }
    }

    alertText.textContent = `You have ${count} pending tasks.`
}

function setDoneItem(elem,arr) {
     elem.classList.add("done")
     for (i = 0; i < arr.length; i++) {
        for (const category of arr[i].toDoList) {
            if (elem.id == category.id) {
                category.done = true
            }
        }
    }
    pendingItems(toDos)
}

function showToDo(arr) {
    const list = document.querySelector(".listWrapper")
    list.innerHTML = ""
    let inputField = document.querySelector(".inputField")
    let radioDiv = document.querySelector("#radioDiv")
    radioDiv.innerHTML = ""
    inputField.after(radioDiv)

    for (i = 0; i < arr.length; i++) {    
        let categoryHeading = document.createElement("p")
        categoryHeading.textContent = `${arr[i].category}`
        let categoryRadio = document.createElement("input")
        categoryRadio.classList.add("radio")
        categoryRadio.setAttribute("type","radio")
        categoryRadio.setAttribute("name","radioButton")
        categoryRadio.setAttribute("value",`${arr[i].category}`)
        categoryRadio.id = `${arr[i].category}`
        radioDiv.appendChild(categoryRadio)
        radioDiv.appendChild(categoryHeading)
        
            
        let categoryList = document.createElement("ul")
        categoryList.id = arr[i].category
        categoryList.classList.add("list")
        let categoryTitle = document.createElement("h3")
        categoryTitle.textContent = `${arr[i].category}`
        let buttonMarkup = `<span class="editBtn" id="${arr[i].category}" onclick="editCategory(toDos,this)"><i class="fa fa-edit"></i></span>
        <span class="trashBtn" style="color: var(--main-red);" id="${arr[i].category}" onclick="deleteCategory(toDos,this);"> <i class="fa fa-trash"></i></span>`
        categoryList.appendChild(categoryTitle)
        categoryTitle.insertAdjacentHTML("afterend",buttonMarkup)

        for (const item in arr[i].toDoList) {
            const toDoItem = document.createElement("li")
            toDoItem.setAttribute("ondblclick","setDoneItem(this,toDos);")
            toDoItem.id = arr[i].toDoList[item].id
            toDoItem.textContent = `${arr[i].toDoList[item].name}`
            if (arr[i].toDoList[item].done == true) {
            toDoItem.classList.add("done")
            }

            const editBtn = document.createElement("span")
            editBtn.classList.add("editBtn")
            editBtn.id = arr[i].toDoList[item].id
            editBtn.setAttribute("onclick","editToDo(this,toDos);")
            const editIcon = document.createElement("i")
            editIcon.classList.add("fa", "fa-edit")
            editBtn.appendChild(editIcon)

            const trashBtn = document.createElement("span")
            trashBtn.classList.add("trashBtn")
            trashBtn.setAttribute("onclick","deleteToDo(this,toDos);")
            trashBtn.id = arr[i].toDoList[item].id
            const trashIcon = document.createElement("i")
            trashIcon.classList.add("fa", "fa-trash")
            trashBtn.appendChild(trashIcon)

            editBtn.id = arr[i].toDoList[item].id
            trashBtn.id = arr[i].toDoList[item].id

            toDoItem.appendChild(editBtn)
            toDoItem.appendChild(trashBtn)

            categoryList.appendChild(toDoItem) 
        }
        list.appendChild(categoryList)
    } 
    pendingItems(toDos)
}

function addToDo(arr) {
    const list = document.querySelector(".listWrapper")
    const inputField = document.querySelector(".newToDo")
    let checkedRadio = document.querySelector("input:checked").id

    for (i = 0; i < arr.length; i ++) {
        if (checkedRadio == arr[i].category) {
            arr[i].toDoList.push({
                id: getRandomInt(1,9999),
                name: `${inputField.value}`,
                done: false
            })
        } 
    }
        
    
    inputField.value = ""
    inputField.setAttribute("placeholder","Enter new task")
        
    radioDiv.innerHTML = ""
    list.innerHTML = ""
    showToDo(toDos)
}

function editToDo(elem,arr) {
    const wrapper = document.querySelector(".inputField")
    const addInput = document.querySelector(".newToDo")
    const addBtn = document.querySelector(".addBtn")
    addInput.remove()
    addBtn.remove()

    const editInput = document.createElement("input")
    editInput.classList.add("editInput")
    editInput.setAttribute("type","text")
    for (i = 0; i < arr.length; i++) {
        for (const category of arr[i].toDoList) {
            if (elem.id == category.id) {
                editInput.setAttribute("placeholder",`${category.name}`)
            }
        }      
    }

    const editBtn = document.createElement("button")
    editBtn.setAttribute("type","button")
    editBtn.setAttribute("onclick","finishEdit(toDos);")

    const icon = document.createElement("i")
    icon.classList.add("fas","fa-edit")

    editBtn.appendChild(icon)
    wrapper.appendChild(editInput)
    wrapper.appendChild(editBtn)
}

function finishEdit(arr) {
    const newInput = document.querySelector(".editInput")

    for (i = 0; i < arr.length; i ++) {
        for (const category of arr[i].toDoList) {
            if (category.name == newInput.placeholder) {
                category.name = newInput.value
            } 
        }
    }

    const wrapper = document.querySelector(".inputField")
    const editInput = document.querySelector("input")
    const editBtn = document.querySelector("button")
    editInput.remove();
    editBtn.remove();

    const addInput = document.createElement("input")
    addInput.setAttribute("type","text")
    addInput.setAttribute("placeholder","Enter new task")
    addInput.classList.add("newToDo")

    const addBtn = document.createElement("button")
    addBtn.setAttribute("type","button")
    addBtn.setAttribute("onclick","addToDo(toDos);")
    addBtn.classList.add("addBtn")

    const icon = document.createElement("i")
    icon.classList.add("fas","fa-plus")

    addBtn.appendChild(icon)
    wrapper.appendChild(addInput)
    wrapper.appendChild(addBtn)

    showToDo(toDos)
}

function deleteToDo(elem,arr) {
    for (i = 0; i < arr.length; i++) {
        for (const category of arr[i].toDoList) {
            if (category.id == elem.id) {
                arr[i].toDoList.splice(arr[i].toDoList.indexOf(category), 1)
            }
        }
    }
    showToDo(toDos)
}

function clearDoneItems(arr) {
    for (i = 0; i < arr.length; i++) {
        // I looked on stackoverflow for how to reverse iterate an object. A normal loop was skipping indexes because it was removing an element and incrementing i at the same time https://stackoverflow.com/questions/60373450/why-splice-method-does-not-work-and-delete-item-on-array-in-typescript
        j = arr[i].toDoList.length
        while (j--) {
            if (arr[i].toDoList[j].done == true) {
                arr[i].toDoList.splice(arr[i].toDoList[j], 1)
            }
        } 
    }
    showToDo(toDos)
}

function addCategory(arr) {
    const addCategoryInput = document.querySelector(".newCategory")
    arr.push({
        category: `${addCategoryInput.value}`,
        toDoList: []
    })
    addCategoryInput.value = ""
    showToDo(toDos)
}

function deleteCategory(arr,elem) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i].category == elem.id) {
            arr.splice(i, 1)
        }
    }
    showToDo(toDos)
}

function editCategory(arr,elem) {
    const wrapper = document.querySelector(".categoryField")
    const addInput = document.querySelector(".newCategory")
    const addBtn = document.querySelector(".addCategoryBtn")
    addInput.remove()
    addBtn.remove()

    const editCategoryInput = document.createElement("input")
    editCategoryInput.classList.add("editCategoryInput")
    editCategoryInput.setAttribute("type","text")
    const editCategoryBtn = document.createElement("button")
    editCategoryBtn.setAttribute("type","button")
    editCategoryBtn.setAttribute("onclick","finishCategoryEdit(toDos);")
    editCategoryBtn.classList.add("editCategoryBtn")
    const icon = document.createElement("i")
    icon.classList.add("fas","fa-edit")
    for (i = 0; i < arr.length; i++) {
        if (arr[i].category == elem.id) {
            editCategoryInput.setAttribute("placeholder",`${arr[i].category}`)
        }
    }
    editCategoryBtn.appendChild(icon)
    wrapper.appendChild(editCategoryInput)
    wrapper.appendChild(editCategoryBtn)
}

function finishCategoryEdit(arr) {
    const wrapper = document.querySelector(".categoryField")
    const newCategoryInput = document.querySelector(".editCategoryInput")

    for (i = 0; i < arr.length; i ++) {
        if (arr[i].category == newCategoryInput.placeholder) {
            arr[i].category = newCategoryInput.value
        } 
    }

    const editCategoryBtn = document.querySelector(".editCategoryBtn")
    newCategoryInput.remove();
    editCategoryBtn.remove();

    let editCategoryMarkup = `
    <input type="text" placeholder="Enter new category" class="newCategory"/>
    <button type="button" onclick="addCategory(toDos);" class="addCategoryBtn"><i class="fas fa-plus"></i></button>
  `
    
    wrapper.insertAdjacentHTML("afterbegin",editCategoryMarkup)

    showToDo(toDos)
}

showToDo(toDos)