'use strict'

module.exports = (app) => {

    const numbersController = require('../controller/numbersController')

    app.route(`/startNumber`).get(numbersController.startNumber)
    app.route('/getLocation').get(numbersController.getLocation)
}