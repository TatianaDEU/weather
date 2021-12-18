
const INPUT = document.querySelector('.input1');
const FORM = document.querySelector('.weather');
const LIST = document.querySelectorAll('.tabs__item');

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const cityName = 'Boston';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

LIST.forEach(item => {
    item.addEventListener('click', () => {
        LIST.forEach(el => {
            el.classList.remove('active');
        });
        item.classList.add('active');
    });
});

function getData(cityName) {
    fetch(url)
        .then(result => result.json())
            
        .then(result => {
            const data = {
                location: result.name,
                temp: Math.round(result.main.temp)
            };
            document.querySelector('.content__left-text').textContent = data.temp;
            document.querySelector('.descr__text').textContent = data.location;

        })
        .catch(err => alert(err));
        
}
FORM.addEventListener('submit', () => {
    getData(INPUT.value);
})
