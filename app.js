const app = {};

// let dateAndTime = [];
app.keyAlphaVantage = "5Z8WIM18J4EFOBQS";
app.keyNewsApi = "ccdad157151647f9a27caa79bcbb7c42";
// Pull stock Ticker from API
app.getStocks = placeHolderQuery => {
  $.ajax({
    url: "https://www.alphavantage.co/query",
    method: "GET",
    dataType: "json",
    data: {
      apikey: app.keyAlphaVantage,
      function: "SYMBOL_SEARCH",
      keywords: placeHolderQuery
    }
  }).then(result => {
    app.displayStocks(result.bestMatches);
  });
};
// Query ticker value with second endpoint to call for dates and share prices
app.secondCall = stock => {
  $.ajax({
    url: "https://www.alphavantage.co/query",
    method: "GET",
    dataType: "json",
    data: {
      apikey: app.keyAlphaVantage,
      function: "TIME_SERIES_INTRADAY",
      interval: "30min",
      symbol: stock,
      outputsize: "compact"
    }
  }).then(result => {
    dateAndTime = Object.keys(result["Time Series (30min)"]);
    // Spliced time is based on a 5 day trading period of 30 minute intervals x 13 intervals a day x 5 trading days
    splicedDateAndTime = dateAndTime.splice(0, 65).reverse();
    let mappedPrice = splicedDateAndTime.map(value => {
      return parseFloat(result["Time Series (30min)"][value]["4. close"]);
    });
    if (mappedPrice[0] > mappedPrice[mappedPrice.length - 1]) {
      chartColor = "#A00F11";
    } else {
      chartColor = "#22595D";
    }
    console.log(chartColor);
    app.myChart(splicedDateAndTime, mappedPrice, chartColor);
  });
};
// Create eventlistener
app.queryTicker = function(ticker) {
  $(".ticker").empty();
  app.secondCall(ticker);
  $("ul").empty();
  $(".ticker").append(`Ticker: ${ticker}`);
};
// Display stocks to screen
app.displayStocks = stockList => {
  $("ul").empty();
  stockList.forEach(stock => {
    const stockHTML = `
        <li onclick="app.queryTicker('${stock["1. symbol"]}')">
        <span>${stock["2. name"]}</span>
        <span>${
          stock["1. symbol"]
        }<img class="plusIcon"src="images/plus-circle-solid.svg"></span>
        </li>
        `;
    $("ul").append(stockHTML);
  });
};
app.getNews = newsQuery => {
  $.ajax({
    url: "https://newsapi.org/v2/everything",
    method: "GET",
    dataType: "json",
    data: {
      apikey: app.keyNewsApi,
      q: newsQuery,
      sources:
        "bloomberg, the-washington-post, business-insider, financial-post, financial-times"
    }
  }).then(result => {
    console.log(result);
    app.displayNews(result.articles);
  });
};
app.displayNews = newsList => {
  console.log(newsList[0]);
  $("aside").empty();
  newsList.forEach(newsItem => {
    console.log(newsItem);
    console.log(newsItem.urlToImage);
    if (newsItem.urlToImage != null) {
      const newsHTML = `
            <a class="flexCard" href=${newsItem.url}>
            <div>
                <img src=${newsItem.urlToImage}>  
                <h2>${newsItem.title}</h2>
            </div>
            </a>            
            `;
      $("aside").append(newsHTML);
    }
  });
};
// Initialize function
app.init = () => {
  $("form").on("submit", function(e) {
    e.preventDefault();
    let query = $("#search").val();
    app.getStocks(query);
    app.getNews(query);
  });
};
// Initialize app
$(function() {
  app.init();
});
// Start of Chart
var ctx = document.getElementById("myChart");
app.myChart = (splicedDateAndTime, price, chartColor) =>
  new Chart(ctx, {
    type: "line",
    data: {
      labels: splicedDateAndTime,
      datasets: [
        {
          label: "5 Day Price Chart",
          data: price,
          // backgroundColor: ["rgba(8, 197, 33, 0.2)"],
          backgroundColor: [chartColor],
          borderWidth: 2
        }
      ]
    },
    options: {
      legend: {
        labels: {
          fontColor: "white",
          fontSize: 15
        }
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              color: "#FFFFFF"
            },
            ticks: {
              fontColor: "white",
              fontSize: 15,
              beginAtZero: false,
              precision: 0.01
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "white",
              fontSize: 10,
              maxTicksLimit: 10
            }
          }
        ]
      }
    }
  });
// End of Chart
