const connection = require('../config/connectdb');
import datajsoncasts from '../db/casts.json';
import datajsonmovies from '../db/movies.json';

let getHomePage = async (req, res) => {
    await connection.query(`drop table if exists casts`);
    console.log('check data ', datajsoncasts[0]);
    await connection.query(`create table casts (id varchar(255),
                                            image varchar(255),
                                            name varchar(255),
                                            birthDate varchar(255),
                                            gender varchar(255)
                                            )`);
    for (let i = 0; i < datajsoncasts.length; i++) {
        await connection.query(`insert into casts(id, image, name, birthDate, gender) values ('${datajsoncasts[i].id}', '${datajsoncasts[i].image}', '${datajsoncasts[i].name}', '${datajsoncasts[i].birthDate}', '${datajsoncasts[i].gender}')`);
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
                                            reviews TEXT[][],
                                            synopses varchar(25555),
                                            casts TEXT[][]
                                            )`);
    for (let i = 0; i < datajsonmovies.length; i++) {
        if (datajsonmovies[i].synopses == undefined) {
            datajsonmovies[i].synopses = '';
        }
        if (datajsonmovies[i].reviews[0] == undefined) {
            datajsonmovies[i].reviews = '';
        }
        let castsdata = [];
        castsdata.push(`${datajsonmovies[i].casts[0].id}'`)
        for (let j = 1; j < datajsonmovies[i].casts.length - 1; j++) {
            castsdata.push(`'${datajsonmovies[i].casts[j].id}'`)
        }
        castsdata.push(`'${datajsonmovies[i].casts[datajsonmovies[i].casts.length - 1].id}`)
        let reviewsdata = [];
        if (datajsonmovies[i].reviews[0] == undefined) {
            reviewsdata.push('');
        } else {
            reviewsdata.push(`${datajsonmovies[i].reviews[0].author}'`)
            for (let j = 0; j < datajsonmovies[i].reviews.length - 1; j++) {
                reviewsdata.push(`'${datajsonmovies[i].reviews[j].author}'`)
            }
            reviewsdata.push(`'${datajsonmovies[i].reviews[datajsonmovies[i].reviews.length - 1].author}`)
        }
        await connection.query(`insert into movies(id, image, title, year, topRank, rating, genres, reviews, synopses, casts) values ('${datajsonmovies[i].id}', '${datajsonmovies[i].img}', '${datajsonmovies[i].title}', '${datajsonmovies[i].year}', '${datajsonmovies[i].topRank}', '${datajsonmovies[i].rating}', '${datajsonmovies[i].genres}', ARRAY['${reviewsdata}'], '${datajsonmovies[i].synopses}', ARRAY['${castsdata}'])`);
        
        console.log('check data import ', reviewsdata);
    }
    console.log('check unde ', datajsonmovies[4].reviews[0]);
    const rows = await connection.query(`select * from movies`);
    console.log('check data base ', rows[4].casts[1]);
    console.log('check data base ', rows[0].reviews[0]);
    res.render('home.handlebars');
};

module.exports = {
    getHomePage
}