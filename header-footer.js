document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header", "header.html");
    loadComponent("footer", "footer.html");

    
    function loadComponent(id, file) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
                if (id === "header") removeLogoLinkOnIndexPage(); 
            })
            .catch(error => console.error(`Error loading ${file}:`, error));
    }

   
    function removeLogoLinkOnIndexPage() {
        if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
            let logoLink = document.querySelector(".logo");
            if (logoLink) {
                logoLink.removeAttribute("href");
            }
        }
    }
});
