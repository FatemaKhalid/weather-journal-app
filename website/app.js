/* Global Variables */// Personal API Key for OpenWeatherMap API
const PERSONAL_API_KEY = '13c2767b8a94fc112fededdb20b379fc';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=' + PERSONAL_API_KEY;

// Asynchronous function to fetch the data
const getWeatherData = async (zipCode) => {
    const REQUEST = BASE_URL + zipCode + apiKey;
    const res = await fetch(REQUEST);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        alert("Hello! We are Facing an error!", error);
    }
}


const updateUI = newData => {
    const dateDiv = document.getElementById('date');
    const tempDiv = document.getElementById('temp');
    const contentDiv = document.getElementById('content');
    dateDiv.innerText = newData.date;
    tempDiv.innerText = newData.temp;
    contentDiv.innerText = newData.feeling;
}
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}


const performAct = e => {
    const zipDiv = document.getElementById('zip');
    zipCode = zipDiv.value;
    getWeatherData(zipCode).then(data => {
        const feelingsDiv = document.getElementById('feelings');
        const d = new Date();
        const newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
        postData('/saveWeather', { date: newDate, temp: data.main.temp, feeling: feelingsDiv.value }).then(data => updateUI(data)
        );

    }
    );

}

// Event listener to add function to existing HTML DOM element
const submitBtn = document.getElementById('generate');
submitBtn.addEventListener('click', performAct);