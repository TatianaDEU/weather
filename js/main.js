
import { UI, tabsHandler } from './view.js';

UI.FORM.addEventListener('submit', () => {
    getData(UI.INPUT.value);

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
                //weather: res.main,
                sunrise: timeConv(res.sys.sunrise),
                sunset: timeConv(res.sys.sunset),
            };
            UI.TEMP.textContent = data.temp;
            UI.currentCity.textContent = data.location;
            document.querySelector('.temp').textContent = `Temperature: ${data.temp}`;
            document.querySelector('.title1').textContent = data.location;
            document.querySelector('.feels').textContent = `Feels like: ${data.feels_like}`;
            // document.querySelector('.weather').textContent = `Weather: ${data.weather}`;
            document.querySelector('.sunrise').textContent = `Sunrise: ${data.sunrise}`;
            document.querySelector('.sunset').textContent = `Sunset: ${data.sunset}`;
        })
        .catch(err => alert(err));
    UI.LIKE.addEventListener('click', favouriteHandler);
}
UI.deleteBtn.addEventListener('click', deleteHandler);

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

    for (let i = 0; i < UI.locations.length; i++) {
        const element = locations[i];
    }


}

function timeConv(data) {
    const TIME_DATA = new Date(data * 1000)
    let hour = TIME_DATA.getHours()
    let min = TIME_DATA.getMinutes()
    min = (min < 10) ? '0' + min : min
    hour = (hour < 10) ? '0' + hour : hour
    return hour + ':' + min
}


