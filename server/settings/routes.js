'use strict'

module.exports = (app) => {

    const numbersController = require('../controller/numbersController')

    app.route(`/startNumber`).get(numbersController.startNumber)
    app.route('/getLocation').get(numbersController.getLocation)
    app.route('/getlpu').get(numbersController.getLPU)
    app.route('/getalllocations').get(numbersController.getAllLocations)
    app.route('/postnewlocation/:data').post(numbersController.putNewLocation)
    app.route('/deletelocation/:id').delete(numbersController.deleteLocation)
    app.route('/locationcopycount/:id').get(numbersController.getLocationCopyCount)
    app.route('/getcopycountforlocation/:id').get(numbersController.getCopyCountForLocation)
}