const PORT = process.env.port || 8080

const path = require('path').resolve()
const express = require('express')

const app = express()
app.use('/', express.static(path + '/public'))
app.listen(PORT, () => console.log('Server is now on http://localhost:' + PORT))
