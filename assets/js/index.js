document.addEventListener("DOMContentLoaded", function() {
    let heroes = JSON.parse(localStorage.getItem("heroes")) || [];
    let container = document.querySelector(".row");
    
    // Preserve existing HTML content before adding new heroes
    let FirstContent = container.innerHTML;
    
    heroes.forEach(hero => {
        let heroCard = `<div class="col-md-3">
            <div class="hero-card">
                <img src="/4/assets/img/${hero.image}" class="img-fluid rounded" alt="Hero Image">
                <h5 class="mt-1">${hero.name}</h5>
                <p class="mb-1">${hero.type}</p>
                <button class="btn btn-warning btn-sm mt-1 mb-3">Edit</button>
                <button class="btn btn-danger btn-sm mt-1 mb-3">Delete</button>
                <button class="btn btn-info btn-sm mt-1 mb-3">Detail</button>
            </div>
        </div>`;
        FirstContent += heroCard;
    });
    
    container.innerHTML = FirstContent;
});