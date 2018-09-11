window.onload = function () {
   showhomeLink();
 }

  window.onload = getCourses();
  window.onload = getPeople();
  window.onload = getNews();
  window.onload = getNotices();
  window.onload = getGuest();

let currentTab = "";

function showNoTabs() {
   document.getElementById("homeLink").style.backgroundColor = "transparent";
   document.getElementById("courseLink").style.backgroundColor = "transparent";
   document.getElementById("peopleLink").style.backgroundColor = "transparent";
   document.getElementById("newsLink").style.backgroundColor = "transparent";
   document.getElementById("noticesLink").style.backgroundColor = "transparent";
   document.getElementById("guestLink").style.backgroundColor = "transparent";
   document.getElementById("home").style.display = "none";
   document.getElementById("courses").style.display = "none";
   document.getElementById("people").style.display = "none";
   document.getElementById("news").style.display = "none";
   document.getElementById("notices").style.display = "none";
   document.getElementById("guest").style.display = "none";
}

function showhomeLink() {
   if (currentTab != "homeLink") {
      currentTab = "homeLink";
      showNoTabs();
      document.getElementById("homeLink").style.backgroundColor = "#1C38D0";
      document.getElementById("home").style.display = "inline";
   }
}

function showcourseLink() {
   if (currentTab != "courseLink") {
      currentTab = "courseLink";
      showNoTabs();
      document.getElementById("courseLink").style.backgroundColor = "#1C38D0";
      document.getElementById("courses").style.display = "inline";
   }
}

function showpeopleLink() {
   if (currentTab != "peopleLink") {
      currentTab = "peopleLink";
      showNoTabs();
      document.getElementById("peopleLink").style.backgroundColor = "#1C38D0";
      document.getElementById("people").style.display = "inline";
   }
}

function shownewsLink() {
   if (currentTab != "newsLink") {
      currentTab = "newsLink";
      showNoTabs();
      document.getElementById("newsLink").style.backgroundColor = "#1C38D0";
      document.getElementById("news").style.display = "inline";
   }
}

function shownoticesLink() {
   if (currentTab != "noticesLink") {
      currentTab = "noticesLink";
      showNoTabs();
      document.getElementById("noticesLink").style.backgroundColor = "#1C38D0";
      document.getElementById("notices").style.display = "inline";
   }
}

function showguestLink() {
   if (currentTab != "guestLink") {
      currentTab = "guestLink";
      showNoTabs();
      document.getElementById("guestLink").style.backgroundColor = "#1C38D0";
      document.getElementById("guest").style.display = "inline";
   }
}

function getCourses() {
   const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/courses";
   const xhr = new XMLHttpRequest();
   xhr.open("GET", uri, true);
   xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      showCourses(resp.data);
   }
   xhr.send(null);
}

function showCourses(courses) {
   var courseNums = [];
   let tableContent = "";
   let odd = true;
   const addRecord = (record) => {
   courseNums.push(record.catalogNbr)
   const subject = record.subject + " " + record.catalogNbr;
   const points = record.unitsAcadProg + " Points";
     tableContent += odd ? "<tr class='orderOdd'>" : "<tr class='orderEven'>";
     odd = !odd;
     tableContent += "<td id=>" + subject + "&emsp;&emsp;" + record.titleLong + "</td><td>" + points
     + "</td></tr><tr><td>" + record.description + "</td></tr><tr><td>" + record.rqrmntDescr + "</td></tr>";
   }
   courses.forEach(addRecord)
   document.getElementById("showCourses").innerHTML = tableContent;

}

function getTimetable(courseNum) {
   const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/course?c=" + courseNum;
   const xhr = new XMLHttpRequest();
   xhr.open("GET", uri, true);
   xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      showTimetable(resp.data);
   }
   xhr.send(null);
}

function showTimetable(timetable) {
   let tableContent = "";
   let odd = true;
   const addRecord = (record) => {
   const subject = record.acadOrg + " " + record.catalogNbr;
     tableContent += odd ? "<tr class='orderOdd'>" : "<tr class='orderEven'>";
     odd = !odd;
     tableContent += "<td id=>" + subject + "</td><td>" + record.component + "</td></tr>";
   }
   timetable.forEach(addRecord)
   document.getElementById("showTimetable").innerHTML = tableContent;
}

function getPeople() {
   const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/people";
   const xhr = new XMLHttpRequest();
   xhr.open("GET", uri, true);
   xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      showPeople(resp.list);
   }
   xhr.send(null);
}

function showPeople(people) {
   let tableContent = "";
   let odd = true;
   const addRecord = (record) => {
   const name = record.firstname + " " + record.lastname;
   var vcard = "https://unidirectory.auckland.ac.nz/people/vcard/" + record.profileUrl[0]
   var image = "";
   if (record.imageId == null) {
     image ="http://redsox.uoa.auckland.ac.nz/ups/logo.svg"
   }
   else{
     image ="https://unidirectory.auckland.ac.nz/people/imageraw/" + record.profileUrl[0]
     + "/" + record.imageId + "/" + "small"
   }
     tableContent += odd ? "<tr class='orderOdd'>" : "<tr class='orderEven'>";
     odd = !odd;
     tableContent += "<td width=20% height=10%><img src='" + image + "' width='20%'></td><td width=50%>" + record.jobtitles + "</td><td><a href='"
     + vcard + "'>&#128100</a></td><td><a href='mailto:" + record.emailAddresses[0] + "'>&#9993</a></td><td><a href='tel:+6493737999;ext="
     + record.extn + "'>&#9742</a></td></tr><tr><td id='staffName'>" + name + "</td></tr>";
   }
   people.forEach(addRecord)
   document.getElementById("showPeople").innerHTML = tableContent;
}

function getNews() {
   const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/news";
   const xhr = new XMLHttpRequest();
   xhr.open("GET", uri, true)
   xhr.setRequestHeader("Accept", "application/json");
   xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      showNews(resp);
   }
   xhr.send(null);
}

function showNews(news) {
   let tableContent = "";
   let odd = true;
   const addRecord = (record) => {
     tableContent += odd ? "<tr class='orderOdd'>" : "<tr class='orderEven'>";
     odd = !odd;
     tableContent += "<td height=20%><a href='" + record.linkField + "'>" + record.titleField + "</a></td></tr><tr><td>" + record.descriptionField
     + "</td></tr>";
   }
   news.forEach(addRecord)
   document.getElementById("showNews").innerHTML = tableContent;
}

function getNotices() {
   const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/notices";
   const xhr = new XMLHttpRequest();
   xhr.open("GET", uri, true)
   xhr.setRequestHeader("Accept", "application/json");
   xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      showNotices(resp);
   }
   xhr.send(null);
}

function showNotices(notices) {
   let tableContent = "";
   let odd = true;
   const addRecord = (record) => {
     tableContent += odd ? "<tr class='orderOdd'>" : "<tr class='orderEven'>";
     odd = !odd;
     tableContent += "<td><a href='" + record.linkField + "'>" + record.titleField
     + "</a></td></tr><tr><td>" + record.descriptionField + "</td></tr>";
   }
   notices.forEach(addRecord)
   document.getElementById("showNotices").innerHTML = tableContent;
}

function writeComment() {
  var name = document.getElementById('name').value;
  var comment = document.getElementById('comment').value;
  var fullComment = name + " --- " + comment;
  const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/comment?name=" + name;
   const xhr = new XMLHttpRequest();
   xhr.open("POST", uri, true)
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.send(JSON.stingify(fullComment));
}

function getGuest() {
   const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/htmlcomments";
   const xhr = new XMLHttpRequest();
   xhr.open("GET", uri, true)
   xhr.onload = () => {
      document.getElementById("showGuest").innerHTML = xhr.responseText;
   }
   xhr.send(null);
}
