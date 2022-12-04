const connection = require('../config/connectdb');
import datajsoncasts from '../db/casts.json';
import datajsonmovies from '../db/movies.json';

let getHomePage = async (req, res) => {
    await connection.query(`drop table if exists a`);
    console.log('check data ', datajsoncasts[0]);
    await connection.query(`create table a (id varchar(255),
                                            image varchar(255),
                                            nameText varchar(255),
                                            name varchar(255),
                                            birthDate varchar(255),
                                            gender varchar(255)
                                            )`);
    for (let i = 0; i < datajsoncasts.length; i++) {
        await connection.query(`insert into a(id, image, nameText, name, birthDate, gender) values ('${datajsoncasts[i].id}', '${datajsoncasts[i].image}', '${datajsoncasts[i].legacyNameText}', '${datajsoncasts[i].name}', '${datajsoncasts[i].birthDate}', '${datajsoncasts[i].gender}')`);
    }                                        
    // await connection.query(`insert into a(id, image, nameText, name, birthDate, gender) values ('${datajson[0].id}', '${datajson[0].id}', '${datajson[0].id}', '${datajson[0].id}', '${datajson[0].id}', '${datajson[0].id}')`);
    await connection.query(`drop table if exists movies`);
    // console.log('check data movie ', datajsonmovies[0]);
    await connection.query(`create table movies (id varchar(255),
                                            image varchar(255),
                                            title varchar(255),
                                            year varchar(255),
                                            topRank varchar(255),
                                            rating varchar(255),
                                            genres varchar(255),
                                            reviews varchar(25555),
                                            synopses varchar(25555),
                                            casts TEXT[]
                                            )`);
    for (let i = 0; i < datajsonmovies.length; i++) {
        if (datajsonmovies[i].synopses == undefined) {
            datajsonmovies[i].synopses = '';
        }
        if (datajsonmovies[i].reviews[0] == undefined) {
            datajsonmovies[i].reviews = '';
        }
        let castsdata = [];
        await connection.query(`insert into movies(id, image, title, year, topRank, rating, genres, reviews, synopses, casts) values ('${datajsonmovies[i].id}', '${datajsonmovies[i].img}', '${datajsonmovies[i].title}', '${datajsonmovies[i].year}', '${datajsonmovies[i].topRank}', '${datajsonmovies[i].rating}', '${datajsonmovies[i].genres}', '${datajsonmovies[i].reviews[0]}', '${datajsonmovies[i].synopses}', ARRAY['${datajsonmovies[i].casts}'])`);
    }
    console.log('check unde ', datajsonmovies[4].reviews[0]);
    console.log('check data import ', datajsonmovies[0].casts.length);
    const rows = await connection.query(`select * from movies`);
    // console.log('check data base ', rows[0].casts[0]);
    res.render('home.handlebars');
};

module.exports = {
    getHomePage
}