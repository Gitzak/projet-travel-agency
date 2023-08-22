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
    // console.log("1 : load sections");
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

      // console.log(item.link);
      // console.log(window.location.href);
      if (window.location.href.includes(item.link)) {
        link.classList.add("active");
      }

      menuItem.appendChild(link);
      menu.appendChild(menuItem);
    });
    // console.log("2 : menu");
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
      tourCard.className = "col-md-4 col-sm-12 d-flex align-items-stretch my-3";
      tourCard.innerHTML = `
                    <div class="card elemetCard">
                        <div class="image-wrapper">
                            <img class="rounded" src="${tour.primaryImage}" alt="...">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex mb-3">
                                <img src="/assets/svg/map.svg" alt="">
                                <h6 class="mb-0 ms-2">${tour.location}</h6>
                            </div>
                            <h5 class="card-title">${tour.title}</h5>
                            <h2 class="text-primary">${tour.price.toFixed(2)} MAD</h2>
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

      function updateLikeStatus(tourId) {
        let savedIds = JSON.parse(localStorage.getItem("likedTourIds")) || [];

        if (savedIds.includes(tourId)) {
          savedIds = savedIds.filter((id) => id !== tourId);
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
        } else {
          savedIds.push(tourId);
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
        }

        localStorage.setItem("likedTourIds", JSON.stringify(savedIds));
      }

      likeButton.addEventListener("click", () => {
        updateLikeStatus(tour.id);
      });

      tourContainer.appendChild(tourCard);
    });
    // console.log("3 : Destinations");
  } catch (error) {
    console.error("Error fetching destinations data:", error);
  }
}

async function fetchAndRenderDestinationsSearchResult() {
  try {
    const response = await fetch("db/destinations.json");
    const destinationsData = await response.json();
    const tourContainerSearchResult = document.getElementById("tourContainerSearchResult");

    // Get the search parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get("keyword");
    const location = urlParams.get("location");

    // Filter destinations based on keyword and location
    const filteredDestinations = destinationsData.filter((tour) => {
      const descriptionMatches = tour.description.toLowerCase().includes(keyword.toLowerCase());
      const locationMatches = tour.location.toLowerCase().includes(location.toLowerCase());
      return descriptionMatches || locationMatches;
    });

    filteredDestinations.forEach((tour) => {
      const tourCard = document.createElement("div");
      tourCard.className = "col-md-4 col-sm-12 d-flex align-items-stretch my-3";
      tourCard.innerHTML = `
                    <div class="card elemetCard">
                        <div class="image-wrapper">
                            <img class="rounded" src="${tour.primaryImage}" alt="...">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex mb-3">
                                <img src="/assets/svg/map.svg" alt="">
                                <h6 class="mb-0 ms-2">${tour.location}</h6>
                            </div>
                            <h5 class="card-title">${tour.title}</h5>
                            <h2 class="text-primary">${tour.price.toFixed(2)} MAD</h2>
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

      function updateLikeStatus(tourId) {
        let savedIds = JSON.parse(localStorage.getItem("likedTourIds")) || [];

        if (savedIds.includes(tourId)) {
          savedIds = savedIds.filter((id) => id !== tourId);
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
        } else {
          savedIds.push(tourId);
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
        }

        localStorage.setItem("likedTourIds", JSON.stringify(savedIds));
      }

      likeButton.addEventListener("click", () => {
        updateLikeStatus(tour.id);
      });

      tourContainerSearchResult.appendChild(tourCard);
    });

    // ... (rest of your code)
  } catch (error) {
    console.error("Error fetching destinations data:", error);
  }
}

async function bookingForm() {
  try {
    const form_booking = document.getElementById("bookingForm");
    form_booking.addEventListener("submit", function (event) {
      event.preventDefault();

      let full_name = document.getElementById("full-name").value.trim();
      let email_address = document.getElementById("email-address").value.trim();
      let phone_number = document.getElementById("phone-number").value.trim();
      let people = document.getElementById("people").value.trim();
      let message = document.getElementById("message-booking").value.trim();

      var successMessage = document.getElementById("successMessage");
      var errorMessage = document.getElementById("errorMessage");
      var spinner = document.getElementById("spinner");

      successMessage.classList.add("d-none");
      errorMessage.classList.add("d-none");
      spinner.classList.remove("d-none");

      if (full_name === "" || email_address === "" || phone_number === "" || people === "") {
        alert("Please provide all required information");
      } else {
        let template_params = {
          to_email: email_address,
          from_name: full_name,
          phone: phone_number,
          number_people: people,
          message: message
        };

        emailjs.send('service_575l31r', 'template_9x9xa9e', template_params)
          .then(function (response) {
            console.log('Email sent:', response);
            successMessage.classList.remove("d-none");
            spinner.classList.add("d-none");
          }, function (error) {
            console.error('Email sending failed:', error);
            errorMessage.classList.remove("d-none");
            spinner.classList.add("d-none");
          });
      }
    });
    // console.log("6-6 : form_booking");
  } catch (error) {
    console.error("Error ", error);
  }
}

async function contactForm() {
  try {
    const form_contact = document.getElementById("contactForm");
    form_contact.addEventListener("submit", async function (event) {
      event.preventDefault();

      let full_name = document.getElementById("full-name").value.trim();
      let email_address = document.getElementById("email-address").value.trim();
      let message = document.getElementById("message").value.trim();

      var successMessage = document.getElementById("successMessage");
      var errorMessage = document.getElementById("errorMessage");
      var spinner = document.getElementById("spinner");

      successMessage.classList.add("d-none");
      errorMessage.classList.add("d-none");
      spinner.classList.remove("d-none");

      if (full_name === "" || email_address === "" || message === "") {
        alert("Please provide all required information");
      } else {
        let template_params = {
          from_email: email_address,
          from_name: full_name,
          message: message
        };

        try {
          await emailjs.send('service_575l31r', 'template_xfdh8us', template_params);
          console.log('Email sent');
          successMessage.classList.remove("d-none");
        } catch (error) {
          console.error('Email sending failed:', error);
          errorMessage.classList.remove("d-none");
        } finally {
          spinner.classList.add("d-none");
        }
      }
    });
  } catch (error) {
    console.error("Error ", error);
  }
}

async function fetchAndRenderSingleDestination() {
  try {
    const destinationSelectedId = localStorage.getItem("destinationSelectedId");

    fetch("db/destinations.json")
      .then((response) => response.json())
      .then((destinationsData) => {
        const selectedId = destinationsData.find(
          (tour) => tour.id == destinationSelectedId
        );

        if (selectedId) {
          // console.log(selectedId.title);
          document.getElementById("title").innerHTML = selectedId.title;
          document.getElementById("mini-title").innerHTML = selectedId.title;
          document.getElementById("location").innerHTML = selectedId.location;
          document.getElementById("price").innerHTML = selectedId.price.toFixed(2) + "  MAD";
          document.getElementById("description").innerHTML = selectedId.description;

          const carouselInner = document.querySelector("#carouselExampleIndicators .carousel-inner");
          const carouselIndicators = document.querySelector("#carouselExampleIndicators .carousel-indicators");

          selectedId.secondaryImages.forEach((imageSrc, index) => {
            // Create a carousel item for each image
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            if (index === 0) {
              carouselItem.classList.add("active");
            }
            const imageElement = document.createElement("img");
            imageElement.classList.add("d-block", "w-100", "rounded");
            imageElement.setAttribute("src", imageSrc);
            imageElement.setAttribute("alt", "Secondary Image");
            carouselItem.appendChild(imageElement);
            carouselInner.appendChild(carouselItem);

            // Create a carousel indicator button for each image
            const indicatorButton = document.createElement("button");
            indicatorButton.setAttribute("type", "button");
            indicatorButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
            indicatorButton.setAttribute("data-bs-slide-to", index.toString());
            if (index === 0) {
              indicatorButton.classList.add("active");
            }
            carouselIndicators.appendChild(indicatorButton);
          });

        } else {
          window.location.replace("destination.html");
        }
      });


    // console.log("3-33 : Single destination");
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

      function updateLikeStatusBlog(blogId) {
        let savedIds = JSON.parse(localStorage.getItem("likedBlogsIds")) || [];

        if (savedIds.includes(blogId)) {
          savedIds = savedIds.filter((id) => id !== blogId);
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
        } else {
          savedIds.push(blogId);
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
        }

        localStorage.setItem("likedBlogsIds", JSON.stringify(savedIds));
      }

      likeButton.addEventListener("click", () => {
        updateLikeStatusBlog(blog.id);
      });

      blogContainer.appendChild(blogCard);
    });
    // console.log("33 : blogs");
  } catch (error) {
    console.error("Error fetching blogs data:", error);
  }
}

async function renderMap() {
  try {
    // Initializes map
    const map = L.map("map"); // Initialize a Leaflet map instance

    // Create a GeoJSON layer and add it to the map
    const response = await fetch("db/points.json");
    const pointsData = await response.json();

    let pointsLayer = L.geoJSON(pointsData).addTo(map);
    pointIndex = leafletKnn(pointsLayer); // Create a k-nearest neighbors index for points

    // Set the initial view of the map to a specific location and zoom level
    map.setView([34.0198661, -6.8815661], 18);

    // Add a tile layer from OpenStreetMap to the map
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 12,
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
    // console.log("4 : map");
  } catch (error) {
    console.error("Error ", error);
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
    // console.log("5 : hide spinner");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function formSearch() {
  try {
    const form_Search = document.getElementById("searchForm");
    form_Search.addEventListener("submit", function (event) {
      event.preventDefault();

      let keyword = document.getElementById("key-Word-search").value.trim();
      let location = document.getElementById("location").value.trim();
      let category = document.getElementById("category").value.trim();
      let people = document.getElementById("people").value.trim();

      if (keyword === "" || location === "" || category === "" || people === "") {
        // Display an error message or take other appropriate action
        alert("Please provide all required information");
        return false;
      }

      let searchQuery =
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
    // console.log("6 : formSearch");
  } catch (error) {
    console.error("Error ", error);
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

    if (window.location.href.includes("/destination")) {
      await fetchAndRenderDestinations();
    }

    if (window.location.href.includes("details-destination")) {
      await fetchAndRenderSingleDestination();
      await bookingForm();
    }

    if (window.location.href.includes("/search-results")) {
      await fetchAndRenderDestinationsSearchResult();
    }

    if (window.location.href.includes("blogs")) {
      await fetchAndRenderBlogs();
    }

    if (window.location.href.includes("contact")) {
      await contactForm();
    }

    await hideSpinner();
  } catch (error) {
    console.error("Error initializing the page:", error);
  }
}

initPage();
