document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Mencegah reload halaman

    let formData = new FormData(this); // Mengambil semua data dari form

    try {
        let response = await fetch("/add-hero", {
            method: "POST",
            body: formData
        });

        let result = await response.json();
        if (response.ok) {
            alert("Hero added successfully!");
            window.location.href = "/";
        } else {
            alert("Failed to add hero: " + result.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding hero.");
    }
});
