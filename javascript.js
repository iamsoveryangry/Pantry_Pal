var elmFile = document.getElementById('fileSelector');
var elmAdd = document.getElementById('add2db');
var elmView = document.getElementById('viewDB');
//var elmDeldb = document.getElementById('delDB');

elmFile.addEventListener('change', handleFileSelection, false);
elmAdd.addEventListener('click', handleAdd, false);
elmView.addEventListener('click', handleView, false);
//elmDeldb.addEventListener('click', handleDeleteDB, false);

var elmTitle = document.getElementById('title');
var elmresult = document.getElementById('result');
var elmTable = document.getElementById('display', 'orderby');

var elmMessages = document.getElementById('messages');
function xalert(message) {elmMessages.innerHTML += message + "<br>";}

// Delete Database
//function handleDeleteDB(){
//  db.delete();
//  handleView();
//  xalert("You'll need to refresh");
//}

var db = new Dexie("visDB");
db.version(1).stores({id3: "++id, title, result"});
db.open().catch(function(e) {xalert("Open failed: " + e);});

function handleFileSelection(e) {
ID3.loadTags(url, function() {
    var tags = ID3.getAllTags(url);

if (tags.title !== undefined) {
    elmTitle.value = tags.title;
}else{
     elmTitle.value = "";
}
if (tags.result !== undefined) {
    elmresult.value = tags.result;
}else{
    elmresult.value = "";
}
}, 
{
dataReader: ID3.FileAPIReader(fileStore),
tags: ["result", "title"]
}
);

handleView();
}
    
function handleAdd(){
    var title = elmTitle.value;
    var result = elmresult.value;
    db.id3.add({title: title, result: result});
    handleView();
}

function handleView() {
    elmTable.innerHTML = "";
    db.id3.each(function(results) {
        var tr = "<tr>";
        var td1 = "<td>" + results.title + "</td>";
        var td2 = "<td>" + results.result + "</td>";
        var td3 = "<td><a onclick=\"handleRemove(" + results.id + ")\">Remove</a></td>";
        var tr4 = "</tr></td>";
        elmTable.innerHTML = elmTable.innerHTML + tr + td1 + td2 + td3 + tr4;
    })
}

function handleRemove(i){
  db.id3.where("id").equals(i).delete();
  handleView();
}

handleView();
 