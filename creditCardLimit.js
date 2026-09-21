var API_URL = "https://webapps.tekstac.com/WebAPI/CreditCards/XMLServlet";
var LOCAL_URL = "creditCards.xml";
var creditCards = [];

function firstTagValue(xml, tagNames) {
  for (var i = 0; i < tagNames.length; i++) {
    var match = xml.match(new RegExp("<" + tagNames[i] + "[^>]*>([\\s\\S]*?)</" + tagNames[i] + ">", "i"));
    if (match) {
      return match[1].trim();
    }
  }
  return "";
}

function parseCreditCards(xmlText) {
  var cards = [];
  var blocks = xmlText.match(/<(CreditCard|Card|creditcard)[\s\S]*?<\/\1>/gi) || [];

  for (var i = 0; i < blocks.length; i++) {
    cards.push({
      name: firstTagValue(blocks[i], ["CardHolderName", "CardName", "Name", "name"]),
      type: firstTagValue(blocks[i], ["CardType", "Type", "type"]),
      limit: firstTagValue(blocks[i], ["CardLimit", "Limit", "limit"]),
      expiry: firstTagValue(blocks[i], ["ExpiryDate", "Expiry", "expiryDate", "expiry"])
    });
  }

  return cards;
}

function buildTable(cards) {
  var html = "<table><tr><th>Card Holder Name</th><th>Card Type</th><th>Card Limit</th><th>Expiry Date</th></tr>";
  for (var i = 0; i < cards.length; i++) {
    html += "<tr><td>" + cards[i].name + "</td><td>" + cards[i].type +
      "</td><td>" + cards[i].limit + "</td><td>" + cards[i].expiry + "</td></tr>";
  }
  html += "</table>";
  return html;
}

function showReport(cards) {
  creditCards = cards;

  if (creditCards.length === 16) {
    document.getElementById("status").textContent = "Data retrieved successfully.";
  } else {
    document.getElementById("status").textContent = "Data retrieved successfully. Found " + creditCards.length + " entries.";
  }

  document.getElementById("output").innerHTML = buildTable(creditCards);
  document.getElementById("report").textContent = "Report generated successfully!!";
}

function fetchXml(url, onError) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var xmlText = xhr.responseText;
        var cards = parseCreditCards(xmlText);
        showReport(cards);
      } else if (onError) {
        onError();
      }
    }
  };

  xhr.open("GET", url, true);
  xhr.send();
}

function getCreditCardData() {
  document.getElementById("status").textContent = "";
  document.getElementById("output").innerHTML = "";
  document.getElementById("report").textContent = "";

  fetchXml(API_URL, function () {
    fetchXml(LOCAL_URL);
  });
}

if (typeof document !== "undefined") {
  var clickBtn = document.getElementById("click");
  if (clickBtn) {
    clickBtn.addEventListener("click", getCreditCardData);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    parseCreditCards: parseCreditCards,
    buildTable: buildTable
  };
}
