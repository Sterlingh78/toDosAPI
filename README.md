## toDosAPI

POST /addCategory/: takes category name string as input and adds new category object
```
app.post('/addCategory', (req, res) => {
    const newCategory = req.body.category

    toDos.push({
        category: newCategory,
        toDoList: []
    })

    res.send(toDos)
})


```
POST /addCategory/: takes category and toDo string and adds new toDo to specified category
```
app.post('/addToDo', (req, res) => {
    const cat = req.body.category
    const newToDo = req.body.toDo

    for (i = 0; i < toDos.length; i ++) {
        if (cat == toDos[i].category) {
            toDos[i].toDoList.push({
                id: getRandomInt(1,9999),
                name: `${newToDo}`,
                done: false
            })
        } 
    }
    res.send(toDos)
})

```

GET /editToDo/: takes toDo ID and sends the existing toDo name for the placeholder
```
app.get('/editToDo/:toDoID', (req, res) => {
    const ID = req.params.toDoID

    for (i = 0; i < toDos.length; i++) {
        for (const toDo of toDos[i].toDoList) {
            if (ID == toDo.id) {
                res.send(JSON.stringify(toDo.name))
            }
        }      
    }
})


```
PUT /editToDo/: takes placeholder value and new name value then edits toDo name
```
app.put('/editToDo/', (req, res) => {
    console.log(req.body)
    const placeholder = req.body.placeholder
    const value = req.body.value

    for (i = 0; i < toDos.length; i ++) {
        for (const toDo of toDos[i].toDoList) {
            if (toDo.name == placeholder) {
                toDo.name = value
            } 
        }
    }



    res.send(toDos)
})


```
DELETE /deleteToDo/: takes toDO ID and deletes it
```
app.delete('/deleteToDo/:toDoID', (req, res) => {
    const ID = req.params.toDoID

    for (i = 0; i < toDos.length; i++) {
        for (const toDo of toDos[i].toDoList) {
            if (toDo.id == ID) {
                toDos[i].toDoList.splice(toDos[i].toDoList.indexOf(toDo), 1)
            }
        }
    }

    res.send(toDos)
})


```
GET /pendingToDo/: counts number of pending toDo items and sends that number 
```
app.get('/pendingToDo', (req, res) => {
    let counter = 0

    for (i = 0; i < toDos.length; i ++) {
        for (const toDo of toDos[i].toDoList) {
            if (toDo.done == false) {
                counter += 1
            }
        }
    }

    res.send({counter})
})


```
PUT /setDone/: takes toDo ID and sets done to true 
```
app.put('/setDone/', (req, res) => {
    const ID = req.body.toDoID

    for (i = 0; i < toDos.length; i++) {
        for (const toDo of toDos[i].toDoList) {
            if (ID == toDo.id) {
                toDo.done = true
            }
        }
    }

    res.send(toDos)
})


```
GET /deleteDoneToDos/: loops toDos and deletes any where done is true 
```
app.get('/deleteDoneToDos', (req, res) => {
    for (i = 0; i < toDos.length; i++) {
        j = toDos[i].toDoList.length
        while (j--) {
            if (toDos[i].toDoList[j].done == true) {
                toDos[i].toDoList.splice(toDos[i].toDoList[j], 1)
            }
        } 
    }

    res.send(toDos)
})


```
DELETE /deleteCategory/: takes category ID and deletes it 
```
app.delete('/deleteCategory/:toDoID', (req, res) => {
    const ID = req.params.toDoID

    for (i = 0; i < toDos.length; i++) {
        if (toDos[i].category == ID) {
            toDos.splice(i, 1)
        }
    }

    res.send(toDos)
})


```
GET /editCategory/: takes category ID and sends category name for placeholder
```
app.get('/editCategory/:toDoID', (req, res) => {
    const ID = req.params.toDoID

    for (i = 0; i < toDos.length; i++) {
        if (toDos[i].category == ID) {
            res.send(JSON.stringify(toDos[i].category))
        }
    }
})


```
PUT /editCategory/: takes placeholder and new value, then sets category name to value
```
app.put('/editCategory/', (req, res) => {
    const placeholder = req.body.placeholder
    const value = req.body.value

    for (i = 0; i < toDos.length; i ++) {
        if (toDos[i].category == placeholder) {
            toDos[i].category = value
        } 
    }

    res.send(toDos)
})


```
