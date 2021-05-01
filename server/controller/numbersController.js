'use strict'

const response = require('../response')
const db =require('../settings/db')

exports.startNumber = (req, res) => {

    const sql = 'CALL create_number_for_stickers()'

    db.query(sql, (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.status(rows, res)
        }
    })

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

};

exports.curentNumber = (req, res) => {
    const sql = 'SELECT `number` FROM `numbers` WHERE id = (SELECT MAX(id) FROM `numbers`)'

    db.query(sql, (error, rows, fields) => {
        if (error) {
            console.log(`Curent number select ERROR ${error}`)
        } else {
            response.status(rows, res)
        }
    })

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    
}