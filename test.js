// const newsHTML = 

// if(newsItem.urlToImage === null){
//     `
// <h6>${newsItem.title}</h6>
// `
// } else{
//     `
// <h6>${newsItem.title}</h6>
// <img src=${newsItem.urlToImage}>              `

// }


// `
// <h6>${newsItem.title}</h6>
// <img src=${newsItem.urlToImage}>              `
// $('footer').append(newsHTML)



newsList.forEach((newsItem) => {
    console.log(newsItem.urlToImage)
    if(newsItem.urlToImage !== null && newsItem.title !== null){
        return(`
        <div>
        <h6>${newsItem.title}</h6>
        <img src=${newsItem.urlToImage}>              
        `
        )
    } else if(newsItem.urlToImage == null && newsItem.title == null){
    }
    // $('aside').append(newsHTML)
}





app.displayNews = (newsList) => {
    
    console.log(newsList[0])
    $('aside').empty();
    newsList.forEach((newsItem) => {
        console.log(newsItem)
        console.log(newsItem.urlToImage)
        if(newsItem.urlToImage != null){
            return(`
            <h6>${newsItem.title}</h6>
            <img src=${newsItem.urlToImage}>              
        `
        )
        }
        $('aside').append(newsHTML)
    })
}