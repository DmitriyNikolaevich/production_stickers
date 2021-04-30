'use strict'

const response = require('../response')
const db =require('../settings/db')

exports.users = (req, res) => {

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

}