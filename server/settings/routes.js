'use strict'

module.exports = (app) => {

    const numbersController = require('../controller/numbersController')

    app.route('/startNumber').get(numbersController.startNumber)
    app.route('/curentNumber').get(numbersController.curentNumber)
}