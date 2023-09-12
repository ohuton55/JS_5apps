export function hello(){

    let targetCityName = 'tokyo';
    const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + targetCityName + ',jp;' + '&appid=' + config.apikey + '&units=metric';

    //Ajax通信用のオブジェクト
    let xhr = new XMLHttpRequest();

    //通信方式とurlを設定
    xhr.open('GET', requestUrl);

    //通信を実行する
    xhr.send();

    //通信ステータスが変わったら実行される
    xhr.onreadystatechange = function(){
        //通信が完了したら
        if(xhr.readyState == 4){
            ShowTodaysWeather(xhr.responseText);
        }
    }
}

export function ShowTodaysWeather(response){

    let obj = JSON.parse(response);

    let weather = obj.weather[0].main;
    let city = obj.name;
    let temp = obj.main.temp;
    let result = city + '  ' + weather + ' ' + temp + '°';

    const cover = document.querySelector('#cover');
    cover.insertAdjacentHTML('beforeend', '<br><br><h1>' + result + '!</h1>');
}