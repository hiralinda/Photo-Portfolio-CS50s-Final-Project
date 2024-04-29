
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModal(imgSrc) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = imgSrc;
    document.getElementById("navbar").style.display = "none";

    document.addEventListener("keydown", handleKeyDown);
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.getElementById("navbar").style.display = "block";

    document.removeEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
    var modalImg = document.getElementById("modalImg");
    var currentImgSrc = modalImg.src;
    var imgs = Array.from(document.querySelectorAll(".gallery-img"));
    var currentIndex = imgs.findIndex(img => img.src === currentImgSrc);

    switch (event.key) {
        case "ArrowLeft":
            if (currentIndex > 0) {
                modalImg.src = imgs[currentIndex - 1].src;
            }
            break;
        case "ArrowRight":
            if (currentIndex < imgs.length - 1) {
                modalImg.src = imgs[currentIndex + 1].src;
            }
            break;
        case "Escape":
            closeModal();
            break;
        default:
            break;
    }
}

function handleLeftArrowClick() {
    var modalImg = document.getElementById("modalImg");
    var imgs = Array.from(document.querySelectorAll(".gallery-img"));
    var currentImgSrc = modalImg.src;
    var currentIndex = imgs.findIndex(img => img.src === currentImgSrc);

    if (currentIndex > 0) {
        modalImg.src = imgs[currentIndex - 1].src;
    }
}

function handleRightArrowClick() {
    var modalImg = document.getElementById("modalImg");
    var imgs = Array.from(document.querySelectorAll(".gallery-img"));
    var currentImgSrc = modalImg.src;
    var currentIndex = imgs.findIndex(img => img.src === currentImgSrc);

    if (currentIndex < imgs.length - 1) {
        modalImg.src = imgs[currentIndex + 1].src;
    }
}

document.getElementById("leftArrow").addEventListener("click", handleLeftArrowClick);
document.getElementById("rightArrow").addEventListener("click", handleRightArrowClick);


function deleteImage() {
    // Ask for confirmation
    var confirmDelete = confirm("Are you sure you want to delete this picture?");
    if (!confirmDelete) {
        // If the user cancels the deletion, return without deleting the image
        return;
    }

    // Get the ID of the image to delete from the modal image source
    var modalImg = document.getElementById("modalImg");
    var imgSrc = modalImg.src;
    var imgId = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);

    // Send a request to delete the image from the database
    fetch(`/delete-image/${imgId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // If the deletion is successful, close the modal and reload the page to reflect the changes
            closeModal();
            location.reload();
        } else {
            // If there's an error, display an error message
            alert("Error deleting image");
        }
    })
    .catch(error => {
        console.error('Error deleting image:', error);
        alert("Error deleting image");
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.querySelector('input[name=mode]');

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            trans();
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            trans();
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });

    let trans = () => {
        document.documentElement.classList.add('transition');
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition');
        }, 1000);
    };
});