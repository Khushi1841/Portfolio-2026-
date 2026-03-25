// Get the modal
var modal = document.getElementById("imageModal");

// Get the image element inside the modal
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

// Select all images inside the .certificate divs
var images = document.querySelectorAll('.certificate img');

// Add click event to all certificate images
images.forEach(img => {
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// Close modal when clicking anywhere outside the image (background)
modal.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
