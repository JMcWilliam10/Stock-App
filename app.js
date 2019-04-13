const app = {};

let dateAndTime = [];
app.key = '5Z8WIM18J4EFOBQS';
// Pull stocks from API
app.getStocks = (placeHolderQuery) => {
    $.ajax({
        url: 'https://www.alphavantage.co/query',
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: app.key,
            function: "SYMBOL_SEARCH",
            keywords: placeHolderQuery
        }
    }).then((result) => {
        app.displayStocks(result.bestMatches);
        // console.log(result.bestMatches[0]['1. symbol'])
    });
} 
app.secondCall = (stock) => {
    $.ajax({
        url: 'https://www.alphavantage.co/query',
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: app.key,
            function: "TIME_SERIES_INTRADAY",
            interval: '30min',
            symbol: stock,
            outputsize: "compact"
        }
    }).then((result) => {
        dateAndTime = Object.keys(result['Time Series (30min)'])
        splicedDateAndTime = dateAndTime.splice(0, 75).reverse()
        let mappedPrice = splicedDateAndTime.map((value) => {
            return parseInt(result['Time Series (30min)'][value]['4. close'])
        });
        app.myChart(splicedDateAndTime, mappedPrice);  
    });
}
// Create eventlistener
test = function (ticker) {
    // console.log(ticker)
    $('.ticker').empty();
    app.secondCall(ticker)
    
    $('ul').empty();
    $('.ticker').append(`Ticker: ${ticker}`)
}
// Display stocks to screen
app.displayStocks = (stockList) => {
    $('ul').empty();
    stockList.forEach((stock) => {
        const stockHTML = `
                            <li onclick="test('${stock['1. symbol']}')" ><span>${stock['2. name']}</span><span> ${stock['1. symbol']}<img class="plusIcon"src="plus-circle-solid.svg"></span></li>
                            `
        $('ul').append(stockHTML)
    });
}
app.getNews = (newsQuery) => {
    $.ajax({
        url: 'https://newsapi.org/v2/everything',
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: 'ccdad157151647f9a27caa79bcbb7c42',
            q: newsQuery,
            sources: 'bloomberg, business-insider'
        }
    }).then((result) => {
        console.log(result)
        app.displayNews(result.articles)
    });
}
app.displayNews = (newsList) => {
    
    console.log(newsList[0])
    $('aside').empty();
    newsList.forEach((newsItem) => {
        console.log(newsItem)
        console.log(newsItem.urlToImage)
        if(newsItem.urlToImage != null){
            const newsHTML = `
            <a class="flexCard" href=${newsItem.url}>
            <div>
                <img src=${newsItem.urlToImage}>  
                <h2>${newsItem.title}</h2>
            </div>
            </a>            
            `
            $('aside').append(newsHTML)
        }
    })
}

// Initialize function
app.init = () => {
    $('form').on('submit', function (e) {
        e.preventDefault();
        let query = $('#search').val();
        app.getStocks(query);
        app.getNews(query)
    })
}
// Initialize app
$(function () {
    app.init();
});

// Chart JS
var ctx = document.getElementById('myChart');
app.myChart = (splicedDateAndTime, price) => new Chart(ctx, {
    type: 'line',
    data: {
        labels: splicedDateAndTime,
        datasets: [{
            label: '5 Day Price Chart',
            data: price,
            backgroundColor: [
                'rgba(8, 197, 33, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)',
                // 'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)',
                // 'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)',
                // 'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',               
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',                
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',               
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',               
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)'

            ],
            borderWidth: 2
        }]
    },
    options: {
        legend: {
            labels: {
                fontColor: "white",
                fontSize: 15
            }
        },
        scales: {
            yAxes: [{
                gridLines: {
                    color: "#FFFFFF"
                  },
                ticks: {
                    fontColor: "white",
                    fontSize: 15,
                    beginAtZero: false
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white",
                    fontSize: 10,
                    maxTicksLimit: 10
                }
            }]
        }
    }
});

// End of Chart JS