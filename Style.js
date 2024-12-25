function fetchCountryData() {
    var searchTerm = document.getElementById("searchBox").value;
    document.getElementById("searchBox").value = "";
  
    var countryUrl = `https://restcountries.com/v3.1/name/${searchTerm}`;
  
    fetch(countryUrl)
      .then(res => res.json())
      .then(countries => displayCountryData(countries))
      .catch(() => {
        document.getElementById("countryResults").innerHTML = `<p class="text-danger">Country not found. Please try again.</p>`;
      });
  }
  
  function displayCountryData(countries) {
    var resultsContainer = document.getElementById("countryResults");
    resultsContainer.textContent = "";
  
    countries.forEach(country => {
      var card = document.createElement("div");
      card.classList.add("col-lg-4", "col-md-6");
  
      card.innerHTML = `
        <div class="card h-100">
          <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title text-primary">${country.name.common}</h5>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <button class="btn btn-more-details btn-sm" onclick="fetchWeatherData('${country.capital ? country.capital[0] : ""}')">
              Weather Details
            </button>
          </div>
        </div>
      `;
  
      resultsContainer.appendChild(card);
    });
  }
  
  function fetchWeatherData(capital) {
    if (!capital) {
      alert("No capital information available for this country.");
      return;
    }
  
    var apiKey = "2ba3fdb7fd8a466f88000015240812"; 
    var weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}&aqi=no`;
  
    fetch(weatherUrl)
      .then(res => res.json())
      .then(weather => displayWeatherData(weather))
      .catch(() => alert("Unable to fetch weather data. Please try again."));
  }
  
  function displayWeatherData(weather) {
    var weatherInfo = `
      Weather in ${weather.location.name}:
      - Temperature: ${weather.current.temp_c}°C
      - Condition: ${weather.current.condition.text}
      - Local Time: ${weather.location.localtime}
    `;
    alert(weatherInfo);
  }
  
 
