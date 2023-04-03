function createBlock(value, classL, inBlock, innerText = ''){
    value.classList.add(`${classL}`);
    value.innerText = `${innerText}`;  
    inBlock.append(value);
}
function optionSelected(value, what){
    for(let item of value.children){
        if(item.selected == `${what}`){
            localStorage('city', item.selected);
        }
    }
}
function createArrBlock(value, classL, inBlock, innerText = ''){
let el = document.createElement(`${value}`);
el.classList.add(`${classL}`);
el.innerText = `${innerText}`;  
inBlock.append(el);
}
function createImg(classImg, link, inblock){
let img = document.createElement('img');
img.classList.add(`${classImg}`);
img.src = 'https:' + link;  
inblock.append(img);
}
function createH2(val, innerText, inBlock){
    let el = document.createElement(`${val}`);
    el.innerText = `${innerText}`;
    inBlock.append(el);
}
function createOption(val, innerText, inBlock){
    let el = document.createElement(`${val}`);
    el.value = `${innerText}`;
    el.innerText = `${el.value}`;
    inBlock.append(el);
}
function createInput(value, typeI, inblock, classI = '', placeholderI = ''){
    value.type = `${typeI}`;
    value.placeholder = `${placeholderI}`;
    value.classList.add(`${classI}`);
    inblock.append(value);
}
function deleteEl(){
    for(let item  in arguments){
    arguments[item].remove();
    }
}
function userButton(){
    if(localStorage.getItem('password')){
        deleteEl(buttonLog); 
        createBlock(buttonUser, 'btn', document.body, 'Пользователь');
        buttonUser.classList.add('btn-warning');
        buttonUser.classList.add('log');
    }
}
function locStor(optionValue = ''){
    if(localStorage.getItem('background') == 'Ночь' || optionValue == 'Ночь'){
            fir.style.background = 'url(img/bodyNigth.jpg) no-repeat center /cover';
            downMain.style.background = 'url(img/centerMainNight.jpeg) no-repeat center /cover';
            
        }
        if(localStorage.getItem('background') == 'День' || optionValue == 'День'){
            fir.style.background = 'url(img/leto3.jpg) no-repeat center /cover';
            downMain.style.background = 'url(img/leto1.jpg) no-repeat center /cover';
        }
}
function changeThemeWindow(){
    const getOptions = itemNight.querySelectorAll('option');
        for (let item of getOptions) {
            if(item.selected){
                locStor(item.value);
            }
        }
}
function fetchWeather(){  
    url = `http://api.weatherapi.com/v1/forecast.json?key=7263066957634ac7a15142941232102&q=${localStorage.getItem('city')}&days=${inputNumber.value}&aqi=no&alerts=no`;
    fetch(url)
               .then(res => res.json())
               .then((res) => {
                   console.log(res);
                  
                   let weatherArr = document.getElementsByClassName('weatherCard');
                    for(let k = 0; k < weatherArr.length; k++){
                       let headerCard = document.querySelectorAll('.headerCard');
                       headerCard[k].innerText = `${res.forecast.forecastday[k].day.condition.text}`;
                       createImg('imgCard', res.forecast.forecastday[k].day.condition.icon, weatherArr[k]);
                       let tempCard = document.querySelectorAll('.temp');
                       tempCard[k].innerText =`${res.forecast.forecastday[k].day.avgtemp_c}`;
                       let dataCard = document.querySelectorAll('.data');
                       dataCard[k].innerText = `${res.forecast.forecastday[k].date}`;
                   } 
               })
}
function tomorrow(){
    fetch(url)
    .then(res => res.json())
    .then(res => {
        let baseWayData = res.forecast.forecastday[1].day;
        let baseWay2 = res.forecast.forecastday[2].day;
            function tomArr(bWD, arr){
                for(let i = 0; i < 9; i++){
                    if(i == 0){
                        arr[i].innerText = `${bWD.avghumidity}%`;
                    }
                    if(i == 1){
                        arr[i].innerText = `${bWD.maxwind_kph}`;
                    }
                    if(i == 2){
                        arr[i].innerText = `${bWD.maxwind_mph}`;
                    }
                    if(i == 3){
                        arr[i].innerText = `${bWD.daily_chance_of_snow}%`;
                    }
                    if(i == 4){
                        arr[i].innerText = `${bWD.daily_chance_of_rain}%`;
                    }
                    if(i == 5){
                        arr[i].innerText = `${bWD.maxtemp_c}`;
                    }
                    if(i == 6){
                        arr[i].innerText = `${bWD.mintemp_c}`;
                    }
                    if(i == 7){
                        arr[i].innerText = `${bWD.maxtemp_f}`;
                    }
                    if(i == 8){
                        arr[i].innerText = `${bWD.mintemp_f}`;
                    }
                }
            }
            tomArr(baseWayData, tomorrowArr);
            tomArr(baseWay2, NextTom);     
})
}
function gridToday(){ 
    fetch(url)
    .then(res => res.json())
    .then((res) => {
        url = `http://api.weatherapi.com/v1/forecast.json?key=7263066957634ac7a15142941232102&q=${nameCity}&aqi=no&alerts=no`
        let imgLink =  res.forecast.forecastday[0];
    
        for(let i = 0; i < 8; i++){
            createArrBlock('div', 'inMain', gridMain); 
        }
        let inMainArr = document.querySelectorAll('.inMain');
        
        createArrBlock('div', 'hour', inMainArr[0]);
            for(let k = 1; k < 9; k++){
            if(k){
                    createArrBlock('div', 'hour', inMainArr[0], `${(k-1)*3}:00`);
            }
        }
            for(let c = 0; c < 9; c++){
            if(c == 0){
                createArrBlock('div', 'hour', inMainArr[1], 'Icon');
            }
            if(c){
            createImg('icon', imgLink.hour[(c-1)*3].condition.icon, inMainArr[1]);
            }
            } 
            function hourBlock(inBlockNumber, text, link, text2){
            for(let k = 0; k < 9; k++){
                if(k == 0){
                    createArrBlock('div', 'hour', inMainArr[inBlockNumber], `${text}`);
                }
                if(k){
                    createArrBlock('div', 'hour', inMainArr[inBlockNumber], `${imgLink.hour[(k-1)*3][link]}${text2}`);
                }
            }
        }
            hourBlock(2, 'Temp', 'temp_c', 'C');
            hourBlock(3, 'Wind', 'wind_kph', 'kph');
            hourBlock(4, 'Precip', 'precip_mm','mm');
            hourBlock(5, 'Cloud', 'cloud', '%');
            hourBlock(6, 'Humidity', 'humidity', '%');
            hourBlock(7, 'Pressure', 'pressure_in', 'in');  
    })
}
function deleteArr(arr){
    for(let item of arr){
        item.remove();
    }
}
