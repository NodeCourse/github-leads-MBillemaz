function getSearchQuery(language, created, stars){
    let string = "";

    if(language){
        language.forEach((l) => {
            string += `language:${l} `;
        })
    }
    if(created){
        string += `created:>${created} `;
    }
    if(stars){
        string += `stars:>${stars}`;
    }

    console.log(string);
    return string;
    
}

module.exports = getSearchQuery;