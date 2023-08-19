async function fetchAndLoadSections() {
  try {
    const response = await fetch("db/sections.json");
    const data = await response.json();

    const indexPage = data[0];
    const sections = indexPage.sections;

    for (const section of sections) {
      const targetElement = document.getElementById(section.targetId);
      if (targetElement) {
        const response = await fetch(section.fileName);
        const html = await response.text();
        targetElement.innerHTML = html;
      }
    }
    console.log("1 : load sections");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchAndRenderMenu() {
  try {
    const response = await fetch("db/menu.json");
    const data = await response.json();
    const menu = document.getElementById("menu");

    data.forEach((item) => {
      const menuItem = document.createElement("li");
      menuItem.className = "nav-item";

      const link = document.createElement("a");
      link.className = "nav-link";
      link.href = item.link;
      link.textContent = item.text;

      if (window.location.href.includes(item.link)) {
        link.classList.add("active");
      }

      menuItem.appendChild(link);
      menu.appendChild(menuItem);
    });
    console.log("2 : menu");
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }
}

async function fetchAndRenderDestinations() {
  try {
    const response = await fetch("db/destinations.json");
    const destinationsData = await response.json();
    const tourContainer = document.getElementById("tourContainer");

    destinationsData.forEach((tour) => {
      const tourCard = document.createElement("div");
      tourCard.className = "col-md-4 col-sm-12 d-flex align-items-stretch";
      tourCard.innerHTML = `
                    <div class="card elemetCard">
                        <div class="image-wrapper">
                            <img class="rounded" src="${
                              tour.primaryImage
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
          localStorage.setItem("likedTourIds", JSON.stringify(updatedIds));
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
    console.log("3 : Destinations");
  } catch (error) {
    console.error("Error fetching destinations data:", error);
  }
}

async function fetchAndRenderBlogs() {
  try {
    const response = await fetch("db/blogs.json");
    const blogsData = await response.json();
    const blogContainer = document.getElementById("blogContainer");

    blogsData.forEach((blog) => {
      const blogCard = document.createElement("div");

      const maxLength = 20;
      const shortDescription = blog.description
        .split(" ")
        .slice(0, maxLength)
        .join(" ");
      const truncatedDescription =
        blog.description.length > maxLength
          ? `${shortDescription}...`
          : shortDescription;

      blogCard.className = "col-md-4 col-sm-12 d-flex align-items-stretch";
      blogCard.innerHTML = `
                    <div class="card elemetCard">
                        <div class="image-wrapper">
                            <img class="rounded" src="${blog.primaryImage}" alt="...">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${blog.title}</h5>
                            <p class="card-text">${truncatedDescription}</p>
                            <div
                            class="d-flex align-items-center justify-content-between mt-auto"
                            >
                            <button class="btn btn-dark btn-sm">Learn more</button>
                            <span class="heart"
                                ><button class="btn-like border-0 bg-transparent">
                                <i
                                    class="fa-regular fa-heart fa-2xl"
                                    style="color: #ee5500"
                                ></i>
                                </button>
                            </span>
                            </div>
                        </div>
                    </div>
                `;

      const learnMoreButton = blogCard.querySelector(".btn");
      learnMoreButton.addEventListener("click", () => {
        localStorage.setItem("blogselectedId", blog.id);
        // window.location.href = "details-blog.html";
        window.location.href = `details-blog.html?id=${blog.id}`;
      });

      const likeButton = blogCard.querySelector(".btn-like");
      const icon = likeButton.querySelector("i.fa-heart");
      const savedIds = JSON.parse(localStorage.getItem("likedBlogsIds")) || [];

      if (savedIds.includes(blog.id)) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
      } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
      }

      likeButton.addEventListener("click", () => {
        console.log(blog.id);

        if (savedIds.includes(blog.id)) {
          const updatedIds = savedIds.filter((id) => id !== blog.id);
          localStorage.setItem("likedBlogsIds", JSON.stringify(updatedIds));
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
        } else {
          savedIds.push(blog.id);
          localStorage.setItem("likedBlogsIds", JSON.stringify(savedIds));
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
        }
      });

      blogContainer.appendChild(blogCard);
    });
    console.log("33 : blogs");
  } catch (error) {
    console.error("Error fetching blogs data:", error);
  }
}

async function renderMap() {
  try {
    // Initializes map
    const map = L.map("map"); // Initialize a Leaflet map instance

    // Create a GeoJSON layer and add it to the map
    var points = L.geoJSON(points).addTo(map);
    pointIndex = leafletKnn(points); // Create a k-nearest neighbors index for points

    // Set the initial view of the map to a specific location and zoom level
    map.setView([34.0198661, -6.8255744], 12);

    // Add a tile layer from OpenStreetMap to the map
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "",
    }).addTo(map);

    let marker, circle, zoomed;

    // Watch for changes in the user's geolocation
    navigator.geolocation.watchPosition(success, error);

    function success(pos) {
      const lat = pos.coords.latitude; // Get latitude from geolocation
      const lng = pos.coords.longitude; // Get longitude from geolocation
      const accuracy = pos.coords.accuracy; // Get accuracy of geolocation

      // Remove existing marker and circle layers if they exist
      if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
      }

      // Add a marker at the current geolocation
      marker = L.marker([lat, lng]).addTo(map);

      // Add a circle to represent the accuracy of the geolocation
      circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

      // Fit the map's view to the bounds of the circle
      if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
      }

      // Set the map's view to the current geolocation
      map.setView([lat, lng]);
    }

    function error(err) {
      if (err.code === 1) {
        alert("Please allow geolocation access"); // Display an alert if geolocation access is denied
      } else {
        alert("Cannot get current location"); // Display an alert if geolocation cannot be determined
      }
    }
    console.log("4 : map");
  } catch (error) {
    console.error("Error fetching destinations data:", error);
  }
}

async function hideSpinner() {
  try {
    // Hide spinner
    const spinnerWrapperEl = document.querySelector(".spinner-wrapper");
    setTimeout(() => {
      spinnerWrapperEl.style.opacity = "0";
      spinnerWrapperEl.style.display = "none";
    }, 1000);
    console.log("5 : hide spinner");
  } catch (error) {
    console.error("Error fetching destinations data:", error);
  }
}

async function formSearch() {
  try {
    const form_Search = document.getElementById("searchForm");
    form_Search.addEventListener("submit", function (event) {
      event.preventDefault();

      var keyword = document.getElementById("key-Word-search").value;
      var location = document.getElementById("location").value;
      var category = document.getElementById("category").value;
      var people = document.getElementById("people").value;

      if (
        !keyword &&
        location === "Location" &&
        category === "Category" &&
        people === "People"
      ) {
        alert("Please provide all search criterion.");
        return;
      }

      var searchQuery =
        "?keyword=" +
        encodeURIComponent(keyword) +
        "&location=" +
        encodeURIComponent(location) +
        "&category=" +
        encodeURIComponent(category) +
        "&people=" +
        encodeURIComponent(people);

      window.location.href = "search-results.html" + searchQuery;
    });
    console.log("6 : formSearch");
  } catch (error) {
    console.error("Error fetching destinations data:", error);
  }
}

async function initPage() {
  try {
    await fetchAndLoadSections();
    await fetchAndRenderMenu();

    if (window.location.href.includes("index")) {
      await fetchAndRenderDestinations();
      await fetchAndRenderBlogs();
      await renderMap();
      await formSearch();
    }

    if (window.location.href.includes("destination")) {
      await fetchAndRenderDestinations();
    }

    if (window.location.href.includes("blogs")) {
      await fetchAndRenderBlogs();
    }

    await hideSpinner();
  } catch (error) {
    console.error("Error initializing the page:", error);
  }
}

initPage();
