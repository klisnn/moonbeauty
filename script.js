// =========================
// DARK / LIGHT MODE
// =========================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("moonbeauty-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");

    if (themeToggle) {
        themeToggle.textContent = "";
    }
}

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem(
                "moonbeauty-theme",
                "dark"
            );

            themeToggle.textContent = "";

        } else {

            localStorage.setItem(
                "moonbeauty-theme",
                "light"
            );

            themeToggle.textContent = "";
        }

    });

}


// =========================
// PRODUCT SEARCH + FILTER
// =========================

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const productCards =
    document.querySelectorAll(".product-card");

const noProducts =
    document.getElementById("noProducts");


function filterProducts() {

    if (!searchInput || !categoryFilter) {
        return;
    }

    const searchText =
        searchInput.value.toLowerCase();

    const category =
        categoryFilter.value;

    let visibleProducts = 0;


    productCards.forEach(function (card) {

        const productName =
            card.dataset.name.toLowerCase();

        const productCategory =
            card.dataset.category;


        const matchesSearch =
            productName.includes(searchText);

        const matchesCategory =
            category === "all" ||
            productCategory === category;


        if (matchesSearch && matchesCategory) {

            card.style.display = "block";

            visibleProducts++;

        } else {

            card.style.display = "none";

        }

    });


    if (noProducts) {

        if (visibleProducts === 0) {
            noProducts.style.display = "block";
        } else {
            noProducts.style.display = "none";
        }

    }

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


// =========================
// PRODUCT MODAL
// =========================

const modal =
    document.getElementById("productModal");

const closeModal =
    document.getElementById("closeModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalPrice =
    document.getElementById("modalPrice");


const viewButtons =
    document.querySelectorAll(".view-product");


viewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card =
            button.closest(".product-card");

        const title =
            card.querySelector("h3").textContent;

        const description =
            card.querySelector(
                ".product-info > p:not(.product-category)"
            ).textContent;

        const price =
            card.querySelector("strong").textContent;


        modalTitle.textContent = title;

        modalDescription.textContent =
            description;

        modalPrice.textContent =
            "Price: " + price;


        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

    });

});


if (closeModal) {

    closeModal.addEventListener(
        "click",
        function () {

            modal.classList.remove("active");

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

        }
    );

}


if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                modal.classList.remove(
                    "active"
                );

                modal.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }

        }
    );

}


// =========================
// ESCAPE KEY
// =========================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("active")
        ) {

            modal.classList.remove("active");

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    }
);
