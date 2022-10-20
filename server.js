const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json() )
app.use(bodyParser.urlencoded({
    extended: true
}))
const port = 8000

let toDos = [/* 
  {
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

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

app.get('/sendToDo', (req, res) => {
  res.send(toDos)
})

app.post('/addCategory', (req, res) => {
    const newCategory = req.body.category

    toDos.push({
        category: newCategory,
        toDoList: []
    })

    res.send(toDos)
})

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

app.delete('/deleteCategory/:toDoID', (req, res) => {
    const ID = req.params.toDoID

    for (i = 0; i < toDos.length; i++) {
        if (toDos[i].category == ID) {
            toDos.splice(i, 1)
        }
    }

    res.send(toDos)
})

app.get('/editCategory/:toDoID', (req, res) => {
    const ID = req.params.toDoID

    for (i = 0; i < toDos.length; i++) {
        if (toDos[i].category == ID) {
            res.send(JSON.stringify(toDos[i].category))
        }
    }
})

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})