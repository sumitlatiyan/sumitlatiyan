const main = document.querySelector(".main"),
inputPart = document.querySelector(".entery"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
print = main.querySelector(".data"),
wIcon =print.querySelector("img"),
arrowBack = main.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d8e8d71bb6603866612cbf45a042944f
`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords; api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=d8e8d71bb6603866612cbf45a042944f`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){ 
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        if(id == 800){
          document.body.style.background="url('clear.jpg')"
            document.body.style.backgroundSize="100% 100%";
        }else if(id >= 200 && id <= 232){
            
            document.body.style.background="url('storm.jpg')"
            wIcon.src = "icons/storm.svg";  document.body.style.backgroundSize="100% 100%";
        }else if(id >= 600 && id <= 622){
            
            document.body.style.background="url('snow.jpg')"
            document.body.style.backgroundSize="100% 100%";
        }else if(id >= 701 && id <= 781){
            
            document.body.style.background="url('haze.jpg')"
            document.body.style.backgroundSize="100% 100%";
        }else if(id >= 801 && id <= 804){
            
            document.body.style.background="url('cloud.jpg')";
            document.body.style.backgroundSize="100% 100%";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            document.body.style.background="url('rain.jpg')"
            document.body.style.backgroundSize="100% 100%";
        }
        
       print.querySelector(".temp .numb").innerText = Math.floor(temp);
       print.querySelector(".weather").innerText = description;
       print.querySelector(".location span").innerText = `${city}, ${country}`;
       print.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
       print.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        main.classList.add("active");
    }
}

arrowBack.addEventListener("click", ()=>{
    main.classList.remove("active");
});
