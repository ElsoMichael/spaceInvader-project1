// Get the button that opens the modals
var btn = document.getElementById("aboutGame");
var btn1 = document.getElementById("instructions");

// Get the modals
var modal = document.getElementById('myModal');
var inst = document.getElementById('myInstructions');

// Get the <span> element that closes the modals
var span = document.getElementsByClassName("close")[0];
var spanInt = document.getElementsByClassName("close1")[0];

// When the user clicks on the button, open the modals
btn.onclick = function() {
    modal.style.display = "block";
}

btn1.onclick = function() {
    inst.style.display = "block";
}

// When the user clicks on <span> (x), close the modals
span.onclick = function() {
    modal.style.display = "none";
}

spanInt.onclick = function() {
    inst.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == inst) {
        inst.style.display = "none";
    }
}