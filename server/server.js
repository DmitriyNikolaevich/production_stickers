const express = require('express')
const app = express()
const port = process.env.PORT || 3500
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.options('*', cors())

const routes = require('./settings/routes')
routes(app)


app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})