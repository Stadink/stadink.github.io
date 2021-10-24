const express = require('express')
const bodyParser = require('body-parser')

const repo = require('./repository')
const updateTemplet = require('./updateRecordForm')

const app = express()
const port = process.env.PORT || 3002

// The body-parser middleware to parse form data
app.use(bodyParser.urlencoded({extended : true}))

// Home page
app.get('/', (req, res) => {
const id = '32b3a9f5d8f33a8d'
res.send(`
	<form method='GET' action='./update/${id}'>
	<button>Update Record</button>
	</form>
`)
})

// Set time button page
app.get('/time', (req, res) => {
    const id = '32b3a9f5d8f33a8d'
    const currentTime = new Date()
    console.log(currentTime)
    res.send(`
        <form method='POST' action='./update/${id}'>
        <button>Set time</button>
        <input type='hidden' name='email' value=${JSON.stringify(currentTime)} for='time'>
        </form>
    `)
})

// app.post('/update/:id', (req, res) => {
//     const id = '32b3a9f5d8f33a8d'
//     const currentTime = new Date()
//     console.log(currentTime)
//     res.send(`
//         <form method='GET' action='./update/${id}'>
//         <button>Set time</button>
//         <input type='text' name='email' value=${JSON.stringify(currentTime)} for='time'>
//         </form>
//     `)
//     })

// Get route to show update form
app.get('/update/:id', async (req, res) => {
const id = req.params.id
const temp = await (updateTemplet({id}))
res.send(temp)
})

// Post route to update record
app.post('/update/:id', async (req, res) => {
const id = req.params.id
const record = await repo.update(id, req.body)
console.log(`Record Updated :
	\n${JSON.stringify(record, null, 2)}`)
res.send('Record Updated')
})

// Post route to update record
app.post('/update/:id', async (req, res) => {
    const id = req.params.id
    const record = await repo.update(id, req.body)
    console.log(`Record Updated :
        \n${JSON.stringify(record, null, 2)}`)
    res.send('Record Updated')
    })

// Server setup
app.listen(port, () => {
console.log(`Server start on port ${port}`)
})
