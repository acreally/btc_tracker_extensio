function updateStats () {
  var url = "https://data.messari.io/api/v1/assets/btc/metrics";
  console.log("calling: " + url)

  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = parseMetrics(this);
      document.getElementById("price").innerHTML = "$" + data.price.toFixed(2);
      document.getElementById("24h_perc_change").innerHTML = data.perc_change_24h.toFixed(2) + "%";
    }
  }
  httpRequest.open("GET", url, true);
  httpRequest.send();
}

function parseMetrics(event) {
  var metrics = JSON.parse(event.responseText);
  console.log("retrieved BTC metrics: " + metrics);

  if (metrics.status.error_code == null) {
    return {
      price: metrics.data.market_data.price_usd,
      perc_change_24h: metrics.data.market_data.percent_change_usd_last_24_hours
    };
  } else {
    console.log("could not find BTC metrics");
  }
}

updateStats();