
// Esos
// autosave script starts here
            (function() {
                var NOTE_KEY = "note";
                var SAVE_DELAY = 2000;
                function debounce(fn, delay) {
                    var mostRecentTimestamp, mostRecentContext, mostRecentArgs, timeout, mostRecentResult;
                    var later = function later() {
                        var timeSince = Date.now() - mostRecentTimestamp;
                        if (timeSince < delay) {
                            timeout = setTimeout(later, delay - timeSince);
                        } else {
                            timeout = null;
                            mostRecentResult = fn.apply(mostRecentContext, mostRecentArgs);
                        }
                    };
                    return function() {
                        mostRecentTimestamp = Date.now();
                        mostRecentContext = this;
                        mostRecentArgs = arguments;
                        if (!timeout) {
                            timeout = setTimeout(later, delay);
                        }
                        return mostRecentResult;
                    };
                }
                document.addEventListener("DOMContentLoaded", function() {
                    var notepad = document.querySelector(".notepad");
                    if ("localStorage" in window && window["localStorage"] !== null) {
                        var saveContents = debounce(function saveContents(e) {
                            localStorage.setItem(NOTE_KEY, e.target.value);
                        }, SAVE_DELAY);
                        notepad.addEventListener("keyup", saveContents);
                        notepad.addEventListener("change", saveContents);
                        notepad.value = localStorage.getItem(NOTE_KEY);
                    } else {
                        notepad.value = "Your notes will not be saved because localstorage is not supported by your browser";
                    }
                });
            }());

// autosave script ends here




// Esos
// script to open the file starts here

    let input = document.querySelector('input')

let textarea = document.querySelector('#area')

// This event listener has been implemented to identify a
// Change in the input section of the html code
// It will be triggered when a file is chosen.
input.addEventListener('change', () => {
	let files = input.files;

	if (files.length == 0) return;

	/* If any further modifications have to be made on the
	Extracted text. The text can be accessed using the
	file variable. But since this is const, it is a read
	only variable, hence immutable. To make any changes,
	changing const to var, here and In the reader.onload
	function would be advisible */
	const file = files[0];

	let reader = new FileReader();

	reader.onload = (e) => {
		const file = e.target.result;

		// This is a regular expression to identify carriage
		// Returns and line breaks
		const lines = file.split(/\r\n|\n/);
		textarea.value = lines.join('\n');

	};

	reader.onerror = (e) => alert(e.target.error.name);

	reader.readAsText(file);
});

// Esos
//// script to open the file ends here






// Esos
// download script starts here

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
       element.style.display = 'none';
       document.body.appendChild(element);
       element.click();
       document.body.removeChild(element);
   }



// Esos
function Save() {
// Start file download.
        // Generate download of hello.txt file with some content

       var text = document.getElementById("area").value;


if (input.files.length == 0)
{

       var filename = "Note.txt";
       download(filename, text);
}
else if (input.files.length != 0)
{

       var filename = input.files[0].name;
       download(filename, text);


}

         }



// save as file


function downloadFile(filename, content) {
  // It works on all HTML5 Ready browsers as it uses the download attribute of the <a> element:
  const element = document.createElement('a');

  //A blob is a data type that can store binary data
  // "type" is a MIME type
  // It can have a different value, based on a file you want to save
  const blob = new Blob([content], { type: 'plain/text' });

  //createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
  const fileUrl = URL.createObjectURL(blob);

  //setAttribute() Sets the value of an attribute on the specified element.
  element.setAttribute('href', fileUrl); //file location
  element.setAttribute('download', filename); // file name
  element.style.display = 'none';

  //use appendChild() method to move an element from one element to another
  document.body.appendChild(element);
  element.click();

  //The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
  document.body.removeChild(element);
};

window.onload = () => {
  document.getElementById('save').
  addEventListener('click', e => {

    //The value of the file name input box
    const filename = document.getElementById('filename').value;

    //The value of what has been input in the textarea
    const content = document.getElementById('area').value;

    // The && (logical AND) operator indicates whether both operands are true. If both operands have nonzero values, the result has the value 1 . Otherwise, the result has the value 0 .

    if (filename && content) {
      downloadFile(filename, content);
    }
  });
};
// download script ends here


