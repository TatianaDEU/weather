
import { UI, tabsHandler } from './view.js';
import { timeConv } from './help.js';

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

UI.FORM.addEventListener('submit', () => {
    getData();
    getDataHourly();
});

function getData() {
    const cityName = UI.INPUT.value;
    const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
    const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';
    const URL = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
    
    fetch(URL)
        .then(result => result.json())
        .then(res => {
            const data = {
                location: res.name,
                temp: Math.round(res.main.temp),
                feels_like: Math.round(res.main.feels_like),
                weather: res.weather[0].main,
                sunrise: timeConv(res.sys.sunrise),
                sunset: timeConv(res.sys.sunset),
            };

            UI.TEMP.textContent = data.temp;
            UI.currentCity.textContent = data.location;
            document.querySelector('.temp').textContent = `Temperature: ${data.temp}`;
            document.querySelector('.title1').textContent = data.location;
            document.querySelector('.feels').textContent = `Feels like: ${data.feels_like}`;
            document.querySelector('.weather-today').textContent = `Weather: ${data.weather}`;
            document.querySelector('.sunrise').textContent = `Sunrise: ${data.sunrise}`;
            document.querySelector('.sunset').textContent = `Sunset: ${data.sunset}`;
            document.querySelector('.weather-img').src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
        })
        .catch(err => alert(err));
    UI.LIKE.addEventListener('click', favouriteHandler);
}
//UI.deleteBtn.addEventListener('click', deleteHandler);

function deleteHandler() {
    this.parentElement.remove();
}

function favouriteHandler() {
    if (!UI.locations.textContent.includes(UI.currentCity.textContent)) {

        let li = document.createElement('li');
        let btn = document.createElement('button');
        li.className = "location";
        li.textContent = UI.currentCity.textContent;
        UI.locations.append(li);
        btn.className = "delete";
        li.append(btn);
        btn.addEventListener('click', deleteHandler);
        UI.LIKE.src = '/Users/miller/Desktop/JS/Wetter/img/herz-red.png';

        li.addEventListener('click', () => {
            UI.INPUT.value = li.textContent;
            getData();
        });
    };
}


function getDataHourly() {
    const cityName = UI.INPUT.value;
    const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
    const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';
    const URL = `${FORECAST_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;

    fetch(URL)
        .then(response => response.json())
        .then(result => {
            const resultArr = result.list.splice(0, 14)

            document.querySelector('.cards').innerHTML = ''

            for (const elem of resultArr) {
                const month = parseInt(elem.dt_txt.substr(0, 7).substr(-2, 2))
                const day = elem.dt_txt.substr(0, 10).substr(-2, 2)
                const time = elem.dt_txt.substr(11).substr(-8, 5)
                const temp = elem.main.temp
                const feels_like = elem.main.feels_like
                const weather = elem.weather[0].main

                document.querySelector('.cards').innerHTML += `<div class="box-forecast">
          <div class="top">
              <div class="top__date">${day} ${MONTHS[month - 1]}</div>
              <div class="top__time">${time}</div>
          </div>
          <div class="bottom">
              <div class="bottom__temp">
              ${temp}
                  <span > ${feels_like}</span>
              </div>
              <div class="bottom__weather">
                  <span>${weather}</span>
                  <img src="${`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}" alt="">
              </div>
          </div>
      </div>`
            }
        })
    .catch(err => alert(err));
}


