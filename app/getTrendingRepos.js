const client = require('./client');
const getSearchQuery = require('./helpers/getSearchQuery');
function getTrendingRepos(languages, created, stars) {
    return client
        .search
        .repos({
            q: getSearchQuery(
                languages,
                created,
                stars
            ),
            sort: 'stars',
            order: 'desc',
            per_page: 100
        })
        .then((res) => {
            return res.data.items;
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = getTrendingRepos;