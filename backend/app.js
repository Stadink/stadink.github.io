// Entry Point of the API Server
var cors = require('cors')
var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser')

const repo = require('./repository')
const updateTemplet = require('./updateRecordForm')
const datastore = require('./datastore.json');
const timeFile = require('./time.json');

/* Creates an Express application.
The express() function is a top-level
function exported by the express module.
*/
const app = express();
const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'egor',
	host: 'localhost',
	database: 'gfgbackend',
	password: 'egor',
	dialect: 'postgres',
	port: 5432
});


/* To handle the HTTP Methods Body Parser
is used, Generally used to extract the
entire body portion of an incoming
request stream and exposes it on req.body
*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

pool.connect((err, client, release) => {
	if (err) {
		return console.error(
			'Error acquiring client', err.stack)
	}
	client.query('SELECT NOW()', (err, result) => {
		release()
		if (err) {
			return console.error(
				'Error executing query', err.stack)
		}
		console.log("Connected to Database !")
	})
})

app.get('/testdata', (req, res, next) => {
	console.log("TEST DATA :");
	pool.query('Select * from test')
		.then(testData => {
			console.log(testData);
			res.send(testData.rows);
		})
})

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

app.get('/setTime', (req, res) => {
    const currentTime = new Date()
    console.log(currentTime)
	fs.writeFile ("input.json", JSON.stringify(currentTime), function(err) {
		if (err) throw err;
		console.log('complete');
		})
	res.send(`
i don't fucking know if this worked whatever
}
`)
})

app.post('/setTime', (req, res) => {
    const currentTime = new Date()
    console.log(currentTime)
	fs.writeFile ("input.json", JSON.stringify(currentTime), function(err) {
		if (err) throw err;
		console.log('complete');
		})
	res.send(`
i don't fucking know if this worked whatever
}
`)
})

app.get('/timeSaved', async (req, res) => {
	const timeFileOK = require('./input.json');
	time = JSON.stringify(timeFileOK)
	console.log(time)
    res.send(`
		{${time}}
    `)
})

app.get('/idk', (req, res, next) => {
	console.log("TEST DATA :");
	res.send({'idk': 7});
})

 
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

app.post('/')

// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(3001, function () {
	let host = server.address().address
	let port = server.address().port
	// Starting the Server at the port 3000
})
