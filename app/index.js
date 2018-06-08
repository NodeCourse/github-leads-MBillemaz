const program = require('commander');
const client = require('./client.js');
const formatDate = require('./helpers/formatDate');
const getTrendingRepos = require('./getTrendingRepos');
const getStargazers = require('./getStargazers');
const flattenArray = require('flatten-array');
const config = require('./config.json');
const xslxCreator = require('icg-json-to-xlsx')
function toList(str) {
    return str.split(',');
}

program
    .version('1.0.0')
    .option('-t, --token [token]', 'GitHub token')
    .option('-p, --path [path]', 'output path')
    .option('-l, --language [language]', 'language used')
    .option('-s, --stars [stars]', 'higher than this number of stars')
    .parse(process.argv);

let languageList = [];
let stars = 1000;
let path = config.dbPath;


if (program.token) {
    client.authenticate({
        type: 'token',
        token: program.token
    })
}

if (program.language) {
    languageList = toList(program.language)
}

if (program.stars) {
    stars = program.stars;
}

if (program.path){
    path = program.path;
}

const created = new Date();
created.setDate(created.getDate() - 7);
let formatedDate = formatDate(created);

getTrendingRepos(languageList, formatedDate, stars)
    .then((repos) => {
        let stargazers = [];
        stargazers = repos.map((repo) => {
            return getStargazers(repo.owner.login, repo.name);
        })
        return Promise.all(stargazers).then((res) => {
            return flattenArray(res).map((user) => {
                return { login: user.login, url: user.html_url }
            });
        })
    })
    .then((users) => {
        var xlsx = xslxCreator.writeFile(path, users);
    })
    .then(() => {
        console.log("Fichier crée: " + path);
    })
    .catch((err) => {
        console.log("Erreur: " + err);
    }) 