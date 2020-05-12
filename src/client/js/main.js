/** Global variables */
const baseURL = "http://api.geonames.org/searchJSON?q=";
const apiKey = "&username=anisiomandlate";

const urlweather = "https://api.weatherbit.io/v2.0/forecast/daily?";
const apiWeather = "74a6a8af6b9a4b4eb78303d308bf238c";

const urlImages = "https://pixabay.com/api/?key=";
const apiImages = "16447058-179c1fb6eb8f36e5ed73a0122";

function performAction(e) {
  const destination = document.getElementById("city").value;
  getCity(baseURL, destination, apiKey);
}

const getCity = async (baseURL, city, key) => {
  const res = await fetch("http://api.geonames.org/searchJSON?q=" + city + key);
  try {
    const data = await res.json();

    /** Getting the value from the input box for the start date and end date*/
    const startDate = document.getElementById("date").value;
    const endDate = document.getElementById("end_date").value;

    /** Create a new date instance dynamically with JS*/
    let d = new Date();
    let newDate =
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    function parseDate(input) {
      let parts = input.match(/(\d+)/g);
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    console.log(parseDate(newDate));
    console.log(parseDate(startDate));

    /** Calculate the time difference of current date and vacation date*/
    var differenceInTime =
      parseDate(startDate).getTime() - parseDate(newDate).getTime();

    /** Calculate the time difference of vacation date start and vacation date end */

    var differenceInVacation =
      parseDate(endDate).getTime() - parseDate(startDate).getTime();

    /** Calculate the no. of days between two dates */
    var differenceInDays = differenceInTime / (1000 * 3600 * 24);
    console.log(differenceInDays);

    /** Calculate the no. of days between two dates */
    var differenceInVacationInDays = differenceInVacation / (1000 * 3600 * 24);
    console.log(differenceInVacationInDays);

    /** Getting the country name and addind to the page */
    const country = data.geonames[0].countryName;
    document.getElementById("country").innerHTML = country;

    /** This is getting the longitude and latitude from the data */
    const lat = data.geonames[0].lat;
    document.getElementById("lat").innerHTML = lat;
    const long = data.geonames[0].lng;
    document.getElementById("long").innerHTML = long;

    /** Getting the no. of days till travel and the total days os travel */
    const daysAway = differenceInDays;
    document.getElementById("daysaway").innerHTML = `${daysAway} days away!`;
    const totalOfDays = DifferenceInVacationInDays;
    document.getElementsByClassName(
      "trip_length"
    ).innerHTML = `${totalOfDays} days.`;

    /** Fetching data from Weather API */
    const weather = fetch(
      "https://api.weatherbit.io/v2.0/forecast/daily?" +
        "lat=" +
        lat +
        "&lon=" +
        long +
        "&key=" +
        apiWeather
    )
      .then((weatherResponse) => {
        return weatherResponse.json();
      })
      .then((dataWeather) => {
        console.log(dataWeather);
        console.log(dataWeather.data[15].weather.description);

        /** Defining weather Description */
        const weatherDescription = dataWeather.data[15].weather.description;
        const highTemp = dataWeather.data[15].high_temp;
        const lowTemp = dataWeather.data[15].low_temp;

        /** Adding to the UI */
        document.getElementById(
          "weather"
        ).innerHTML = `${weatherDescription} </br>High Temp: ${highTemp} </br>Low Temp: ${lowTemp}`;

        /** Fetching data from Image API */
        const image = fetch(
          "https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?safesearch" +
            apiImages +
            "&q=" +
            city +
            "+city" +
            "&image_type=photo"
        )
          .then((imageResponse) => {
            return imageResponse.json();
          })
          .then((dataImage) => {
            console.log(dataImage.hits[0].largeImageURL);
            //Defining image src
            const imageSrc = dataImage.hits[0].largeImageURL;
            //Adding src to image div
            document.getElementById(
              "trip_img"
            ).innerHTML = `<img class="trip_img" src="${imageSrc}" />`;
          })
          .catch((err) => {
            console.log("There is no image");
            //Defining image src
            const noImage = "/src/client/img/unamed.jpg";
            //Adding src to image div
            document.getElementById(
              "trip_img"
            ).innerHTML = `<img class="trip_img" src=" ${noImage} " />`;
          });
        console.log(image);
      });
    console.log(weather);

    return data;
  } catch (error) {
    console.log("error", error);
  }
};
export { performAction };
