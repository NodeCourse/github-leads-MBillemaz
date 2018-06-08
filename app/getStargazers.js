const client = require('./client');
const getSearchQuery = require('./helpers/getSearchQuery');

function getStargezers(owner, repo) {
    return client
        .activity
        .getStargazersForRepo({
            owner,
            repo,
            per_page: 100
        })
        .then((res) => {
            let users = res.data.map((item) => {
                return item.user
            })
            return users;
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = getStargezers;