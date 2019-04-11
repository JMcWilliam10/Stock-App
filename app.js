import NewsAPI from ('./node_modules/newsapi')
const NewsAPI = Noderequire('newsapi');
const newsapi = new NewsAPI('ccdad157151647f9a27caa79bcbb7c42');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  sources: 'bbc-news,the-verge',
  q: 'bitcoin',
  category: 'business',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
});

const app = {};
let dateAndTime = ['9:30AM', '10:00AM', '10:30AM', '11:00AM', '11:30AM ','12:00PM', '12:30PM', '1:00PM', '1:30PM', '2:00PM', '2:30PM', '3:00PM', '3:30PM', '4:00PM'];
app.key = '5Z8WIM18J4EFOBQS';
// Pull stocks from API
app.getStocks = (placeHolderQuery) => {
$.ajax({
        url: 'https://www.alphavantage.co/query',
        method: 'GET',
        dataType: 'json',
        data:{
            apikey: app.key,
            function: "SYMBOL_SEARCH",
            keywords: placeHolderQuery
        }
}).then((result) => {
    app.displayStocks(result.bestMatches);
    // console.log(result.bestMatches[0]['1. symbol'])
});

} // end of getStocks

app.secondCall = (stock) => {
$.ajax({
        url: 'https://www.alphavantage.co/query',
        method: 'GET',
        dataType: 'json',
        data:{
            apikey: app.key,
            function: "TIME_SERIES_INTRADAY",
            interval: '30min',
            symbol: stock,
            outputsize: "compact"
        }
}).then((result) => {
    console.log(result);
    dateAndTime = Object.keys(result['Time Series (30min)'])
    splicedDateAndTime = dateAndTime.splice(0, 75).reverse()
    let mappedPrice = splicedDateAndTime.map((value) => {
        return parseInt(result['Time Series (30min)'][value]['4. close'])
    })
    myChart(splicedDateAndTime, mappedPrice);
});
}
// Create eventlistener
test = function(ticker){
// console.log(ticker)
app.secondCall(ticker)
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

// Initialize
app.init = () => {
$('form').on('submit', function(e){
    e.preventDefault();
    let query = $('#search').val();
    app.getStocks(query);
})
}
// Initialize app
$(function(){
    app.init();
});


// SCRIPT.JS START
var ctx = document.getElementById('myChart');
myChart = (splicedDateAndTime, price) => new Chart(ctx, {
    type: 'line',
    data: {
        labels: splicedDateAndTime,
        datasets: [{
            label: 'Price',
            data: price,
            // backgroundColor: [
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)',
            //     'rgba(255, 206, 86, 0.2)',
            //     'rgba(75, 192, 192, 0.2)',
            //     'rgba(153, 102, 255, 0.2)',
            //     'rgba(255, 159, 64, 0.2)',
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)',
            //     'rgba(255, 206, 86, 0.2)',
            //     'rgba(75, 192, 192, 0.2)',
            //     'rgba(153, 102, 255, 0.2)',
            //     'rgba(255, 159, 64, 0.2)',
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)',
            //      'rgba(153, 102, 255, 0.2)',
            //     'rgba(255, 159, 64, 0.2)',
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)',
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)'
            // ],
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)',
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)',
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)',
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)'
            // ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
});
// 
