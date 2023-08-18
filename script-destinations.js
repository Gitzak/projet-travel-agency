
// Script Fetch Destinations
const tourContainer = document.getElementById("tourContainer");

fetch("db/destinations.json")
    .then((response) => response.json())
    .then((destinationsData) => {
        destinationsData.forEach((tour) => {
            const tourCard = document.createElement("div");
            tourCard.className =
                "col-md-4 col-sm-12 d-flex align-items-stretch";
            tourCard.innerHTML = `
                        <div class="card elemetCard">
                            <div class="image-wrapper">
                                <img class="rounded" src="${tour.primaryImage
                }" alt="...">
                            </div>
                            <div class="card-body d-flex flex-column">
                                <div class="d-flex mb-3">
                                    <img src="/assets/svg/map.svg" alt="">
                                    <h6 class="mb-0 ms-2">${tour.location}</h6>
                                </div>
                                <h5 class="card-title">${tour.title}</h5>
                                <h2 class="text-primary">${tour.price.toFixed(
                    2
                )} MAD</h2>
                                <p class="card-text">${tour.description}</p>
                                <div
                                class="d-flex align-items-center justify-content-between mt-auto"
                                >
                                <button class="btn btn-primary">Discover</button>
                                <span class="heart"
                                    ><button class="btn-like border-0 bg-transparent">
                                    <i
                                        class="fa-regular fa-heart fa-2xl"
                                        style="color: #ff0000"
                                    ></i>
                                    </button>
                                </span>
                                </div>
                            </div>
                        </div>
                    `;

            const discoverButton = tourCard.querySelector(".btn");
            discoverButton.addEventListener("click", () => {
                localStorage.setItem("destinationSelectedId", tour.id);
                window.location.href = "details-destination.html";
            });

            const likeButton = tourCard.querySelector(".btn-like");
            const icon = likeButton.querySelector("i.fa-heart");
            const savedIds = JSON.parse(localStorage.getItem("likedTourIds")) || [];

            if (savedIds.includes(tour.id)) {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
            } else {
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
            }

            likeButton.addEventListener("click", () => {
                console.log(tour.id);

                if (savedIds.includes(tour.id)) {
                    const updatedIds = savedIds.filter((id) => id !== tour.id);
                    localStorage.setItem(
                        "likedTourIds",
                        JSON.stringify(updatedIds)
                    );
                    icon.classList.remove("fa-solid");
                    icon.classList.add("fa-regular");
                } else {
                    savedIds.push(tour.id);
                    localStorage.setItem("likedTourIds", JSON.stringify(savedIds));
                    icon.classList.remove("fa-regular");
                    icon.classList.add("fa-solid");
                }
            });

            tourContainer.appendChild(tourCard);
        });
    })
    .catch((error) => {
        console.error("Error fetching menu data:", error);
    });
