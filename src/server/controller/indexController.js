'use strict'

const response = require('../response')

exports.index = (req, res) => {

    response.status('Hello from API SERVER', res)
    
}