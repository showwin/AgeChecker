function compareDate(date1, date2) {
    var diff = date1 - date2;
    var diffDay = diff / 86400000;//1日は86400000ミリ秒
    return diffDay;
}

function displayDate(str) {
  $("#agechecker").html("<p align='right'>"+str+"</p>");
}

function removeDate(str) {
  $("#agechecker").html("&nbsp;");
}

function displayLine(days, date) {
  $("body").prepend("<div id=agechecker>&nbsp;</div>");
  $("#agechecker").css("height", "15");
  if (days <= 182) {
    $("#agechecker").css("backgroundColor", "#5cb85c");
  } else if (days <= 365) {
    $("#agechecker").css("backgroundColor", "#99ff99");
  } else if (days <= 365*3) {
    $("#agechecker").css("backgroundColor", "#ffff99");
  } else if (days <= 365*5) {
    $("#agechecker").css("backgroundColor", "#f0ad4e");
  } else {
    $("#agechecker").css("backgroundColor", "#8da0b6");
  }
}

$(function() {
  var targetUrl = document.location.href;
  uri = "http://www.google.co.jp/search?num=1&tbs=qdr%3Ay15&q=site%3A" + encodeURIComponent(targetUrl);
  var httpOj = new XMLHttpRequest();
  httpOj.open('GET', uri);
  httpOj.responseType = 'document';
  httpOj.onload = function() {
    if (httpOj.readyState == 4 && (httpOj.status == 200 || httpOj.status == 304)) {
      var response = httpOj.responseXML;
      var str = $(response).find("span.f").text();
      var dateStr = str.substring(0,str.length-3);
      var lastMod = new Date(dateStr);
      var daysAgo = compareDate(Date.now(), lastMod);
      displayLine(daysAgo, dateStr);
    } else {
      displayLine(365*10, '');
    }
  }
  httpOj.send();
});
