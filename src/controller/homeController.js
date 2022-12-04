const connection = require('../config/connectdb');
import datajsoncasts from '../db/casts.json';
import datajsonmovies from '../db/movies.json';

let getPage = async (req, res) => {
    const rows = await connection.query(`select * from users`);

    return res.render('sign');
};
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
                                            synopses varchar(100000),
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
        castsdata.push(`${datajsonmovies[i].casts[0].name}'`)
        for (let j = 1; j < datajsonmovies[i].casts.length - 1; j++) {
            castsdata.push(`'${datajsonmovies[i].casts[j].name}'`)
        }
        castsdata.push(`'${datajsonmovies[i].casts[datajsonmovies[i].casts.length - 1].name}`)
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
        let synopsesdata = '';
        if (datajsonmovies[i].synopses == undefined) {
            synopsesdata = '';
        } else {
            synopsesdata = datajsonmovies[i].synopses.text;
        }
        await connection.query(`insert into movies(id, image, title, year, topRank, rating, genres, reviews, synopses, casts) values ('${datajsonmovies[i].id}', '${datajsonmovies[i].img}', '${datajsonmovies[i].title}', '${datajsonmovies[i].year}', '${datajsonmovies[i].topRank}', '${datajsonmovies[i].rating}', '${datajsonmovies[i].genres}', ARRAY['${reviewsdata}'], '${synopsesdata}', ARRAY['${castsdata}'])`);
        
        // console.log('check data import ', reviewsdata);
    }
    // if (datajsonmovies[0].synopses != undefined) console.log('check unde ', datajsonmovies[0].synopses.text);
    const rows = await connection.query(`select * from movies`);
    if (isNaN(parseFloat(rows[4].rating))) console.log('check data base ',typeof parseFloat(rows[4].rating));
    // console.log('check data base ', rows[4].reviews[0]);
    // console.log('check data base ', rows[0].synopses);
    let ratingmovies = [];
    const rows1 = await connection.query(`select * from movies`);
    for (let i = 0; i < rows1.length - 1; i++) {
        for (let j = i + 1; j < rows1.length; j++) {
            if (parseFloat(rows1[i].rating) <= parseFloat(rows1[j].rating)) {
                let temp = rows1[i];
                rows1[i] = rows1[j];
                rows1[j] = temp;
            }
        }
    }
    let count = 0;
    for (let i = 0; i < 20; i++) {
        let castdata = [];
        if (isNaN(parseFloat(rows1[i].rating)) == false) {
            ratingmovies.push(rows1[i]);
            // for (let j = 0; j < rows1[i].casts.length; j++) {
            //     console.log(`select name from casts where casts.id = '${rows1[i].casts[j]}'`);
            //     let rows2 = await connection.query(`select name from casts where casts.id = '${rows1[i].casts[j]}'`);
            //     // console.log('check cast ', rows2);
            //     castdata.push(rows2);
            // }
            let da = await connection.query(`select casts from movies where movies.id = '${rows1[i].id}'`)
            count++;
            console.log('check cast 2 ', da);
        }
        if (count == 10) break;
    }
    return res.render('home.handlebars', {data: rows, datarank: ratingmovies});
};
let getHomePageLogin = async (req, res) => {
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
                                            synopses varchar(100000),
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
        castsdata.push(`${datajsonmovies[i].casts[0].name}'`)
        for (let j = 1; j < datajsonmovies[i].casts.length - 1; j++) {
            castsdata.push(`'${datajsonmovies[i].casts[j].name}'`)
        }
        castsdata.push(`'${datajsonmovies[i].casts[datajsonmovies[i].casts.length - 1].name}`)
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
        let synopsesdata = '';
        if (datajsonmovies[i].synopses == undefined) {
            synopsesdata = '';
        } else {
            synopsesdata = datajsonmovies[i].synopses.text;
        }
        await connection.query(`insert into movies(id, image, title, year, topRank, rating, genres, reviews, synopses, casts) values ('${datajsonmovies[i].id}', '${datajsonmovies[i].img}', '${datajsonmovies[i].title}', '${datajsonmovies[i].year}', '${datajsonmovies[i].topRank}', '${datajsonmovies[i].rating}', '${datajsonmovies[i].genres}', ARRAY['${reviewsdata}'], '${synopsesdata}', ARRAY['${castsdata}'])`);
        
        // console.log('check data import ', reviewsdata);
    }
    // if (datajsonmovies[0].synopses != undefined) console.log('check unde ', datajsonmovies[0].synopses.text);
    const rows = await connection.query(`select * from movies`);
    if (isNaN(parseFloat(rows[4].rating))) console.log('check data base ',typeof parseFloat(rows[4].rating));
    // console.log('check data base ', rows[4].reviews[0]);
    // console.log('check data base ', rows[0].synopses);
    let ratingmovies = [];
    const rows1 = await connection.query(`select * from movies`);
    for (let i = 0; i < rows1.length - 1; i++) {
        for (let j = i + 1; j < rows1.length; j++) {
            if (parseFloat(rows1[i].rating) <= parseFloat(rows1[j].rating)) {
                let temp = rows1[i];
                rows1[i] = rows1[j];
                rows1[j] = temp;
            }
        }
    }
    let count = 0;
    for (let i = 0; i < 20; i++) {
        let castdata = [];
        if (isNaN(parseFloat(rows1[i].rating)) == false) {
            ratingmovies.push(rows1[i]);
            // for (let j = 0; j < rows1[i].casts.length; j++) {
            //     console.log(`select name from casts where casts.id = '${rows1[i].casts[j]}'`);
            //     let rows2 = await connection.query(`select name from casts where casts.id = '${rows1[i].casts[j]}'`);
            //     // console.log('check cast ', rows2);
            //     castdata.push(rows2);
            // }
            let da = await connection.query(`select casts from movies where movies.id = '${rows1[i].id}'`)
            count++;
            console.log('check cast 2 ', da);
        }
        if (count == 10) break;
    }
    // console.log('check rank ', ratingmovies[1]);
    const userdata = await connection.query(`select * from users`);
    console.log('check user data ', userdata);
    let check = false;
    for (let i = 0; i < userdata.length; i++) {

        if (req.body.username == userdata[i].username && req.body.password == userdata[i].password) {
            check = true;
        }
    }
    if (check == true) {
        return res.render('home.handlebars', {data: rows, datarank: ratingmovies});
    } else {
        return res.redirect('/');
    }
};
let postSearchPage = async (req, res) => {
    console.log('check name search ', req.body);
    const rows = await connection.query(`select * from movies`);
    let datasearch = [];
    for (let i = 0; i < rows.length; i++) {
        // console.log(rows[i].title)
        if (rows[i].title.toLowerCase().indexOf(req.body.name.toLowerCase()) >= 0) {
            console.log("oke");
            datasearch.push(rows[i]);
        }
    }
    console.log(datasearch[0].title, datasearch[1].title);
    return res.render('search', {datasearch: datasearch});
};
let getDetailPage = async (req, res) => {
    let movieID = req.params.movieID;
    let rows = await connection.query(`select * from movies where id = '${movieID}'`)
    console.log('check params ', req.params);
    console.log('check data params ', rows);
    return res.render('detail', {data: rows});
};
let getSearchPage = async (req, res) => {
    console.log(req.query);
};
let getSignUpPage = (req, res) => {
    return res.render('signup');
};
let postSignUpPage = async (req, res) => {
    console.log('check data sign up ', req.body);
    await connection.query(`insert into users(username, password, email) values ('${req.body.username}', '${req.body.password}', '${req.body.email}')`)
    return res.redirect('/');
};

module.exports = {
    getPage, getHomePageLogin, getHomePage, postSearchPage, getDetailPage, getSearchPage, getSignUpPage, postSignUpPage
}