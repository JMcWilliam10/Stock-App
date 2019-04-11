    // app.selectStock = (placeHolderQuery) => {
    //     $.ajax({
    //         url: 'https://www.alphavantage.co/query',
    //         method: 'GET',
    //         dataType: 'json',
    //         data:{
    //             apikey: app.key,
    //             function: "TIME_SERIES_INTRADAY",
    //             keywords: placeHolderQuery,
    //             interval: "1min"
    //         }
    //     }).then((result) => {
    //        console.log(result)
    //     })
    // }



    app.mapStocks = (stockList) => {
        stockList.map((result) => {
        return result['1. symbol'];
    })
    
    }