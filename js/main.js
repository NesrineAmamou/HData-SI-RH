function $id(id) {
  return document.getElementById(id);
}




function convert() {
  var selected_file = document.getElementById('cv').files[0];
  var reader = new FileReader();

  reader.onload = function(aEvent) {
    convertToHTML(btoa(aEvent.target.result));
  };

  // reader.readAsArrayBuffer(selected_file);
  reader.readAsBinaryString(selected_file);
}




function convertToHTML(aDocxContent) {
  var content = docx(aDocxContent);
  document.getElementById('containerr').textContent = '';
  console.log('content length: ' + content.DOM.length);
  while (content.DOM.length > 0) {
    var node = content.DOM[0];
    document.getElementById('containerr').appendChild(node);
  }
}

window.addEventListener('load', function() {
  document.getElementById('convert').onclick = convert;
});


