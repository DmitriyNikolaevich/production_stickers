const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '<qDn847m',
    database: 'stickers'
})

connection.connect((error) => {
    if (error) {
        return console.log('Ошибка подключения');
    } else {
        return console.log('Подключение прошло успешно');
    }
})

module.exports = connection