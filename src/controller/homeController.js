const connection = require('../config/connectdb');
import datajson from '../db/casts.json';

let getHomePage = async (req, res) => {
    await connection.query(`drop table if exists a`);
    console.log('check data ', datajson[0]);
    await connection.query(`create table a (id varchar(255),
                                            image varchar(255),
                                            nameText varchar(255),
                                            name varchar(255),
                                            birthDate varchar(255),
                                            gender varchar(255)
                                            )`);
    for (let i = 0; i < datajson.length; i++) {
        await connection.query(`insert into a(id, image, nameText, name, birthDate, gender) values ('${datajson[i].id}', '${datajson[i].image}', '${datajson[i].legacyNameText}', '${datajson[i].name}', '${datajson[i].birthDate}', '${datajson[i].gender}')`);
    }                                        
    // await connection.query(`insert into a(id, image, nameText, name, birthDate, gender) values ('${datajson[0].id}', '${datajson[0].id}', '${datajson[0].id}', '${datajson[0].id}', '${datajson[0].id}', '${datajson[0].id}')`);
    
    res.render('home.handlebars', {datajson: datajson});
};

module.exports = {
    getHomePage
}