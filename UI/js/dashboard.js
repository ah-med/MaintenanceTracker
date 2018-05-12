
document.getElementById('imgFile').addEventListener('change', handleFileSelect, false);

function handleFileSelect(input) {
    var files = input.target.files;
    var f = files[0];
    var reader = new FileReader();
     
      reader.onload = (function(theFile) {
            return function(e) {
              document.getElementById('userImg').innerHTML = ['<img src="', e.target.result,'" title="', theFile.name, '" width="50" height="50"/>'].join('');
            };
      })(f);
       
      reader.readAsDataURL(f);
}
