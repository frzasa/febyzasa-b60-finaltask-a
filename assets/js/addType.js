document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    let heroType = document.getElementById("heroType").value;
    localStorage.setItem("heroType", heroType);
    window.location.href = "addHero";
});