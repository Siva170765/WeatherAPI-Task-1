//Wearther open API Key
let API_Key="1ba86a17871d3a90c0a032ae7f58d594";

//Function to find weather
async function weatherdata(Cityname){
    try{       

        //Find Weather details 
        let weather=await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${Cityname}&appid=${API_Key}`);

        //Convert json to object
        let Data=await weather.json();

        //Print object data
        console.log(Data)

        //Find weather datas from object
        //Find Weather condition
        let Weathercondition=Data.weather[0].main

        //Find description
        let Description=Data.weather[0].description;

        //Find icon
        let Icon=await fetch(`https://openweathermap.org/img/wn/${Data.weather[0].icon}@2x.png`);

        //Find temperature
        let Temperature=Math.round(Data.main.temp-273.15);

        //Find city
        let City_name=Data.name;

        //Find country
        let Country=Data.sys.country;

        //Find wind speed
        let Windspeed=Data.wind.speed;

        //Access weather content row
        let Row=document.querySelector(".row2");

        //Insert weather details
        Row.innerHTML=` <div class="col-lg-5 col-sm-12 m-4 fw-bold p-3 d-flex justify-content-center align-items-center bg-info bg-opacity-50 rounded contentdiv fs-2">
                            <p >${Weathercondition}</p>
                            
                            <img class="img-fluid" src="${Icon.url}" width="300rem"  >
                            <p>${Description}</p>
                        </div>
                        <div class="col-lg-5 col-sm-12 m-4 fw-bold pt-5 text-center bg-info bg-opacity-50 rounded contentdiv fs-3">
                            <p > <span>City :</span> <span>${City_name}</span></p>
                            <p > <span>Country :</span> <span>${Country}</span></p>
                            <p ><span>Temp : </span>${Temperature}<span>&deg;C</span></p>
                            <p > <span>Wind Speed :</span> <span>${Windspeed} Km/h</span></p>
                        </div>`




    }catch(error){

        //If server not respond, print error
        console.error("Server not responding");

        //Access weather content row
        let Row=document.querySelector(".row2");

        //Reset weather content
        Row.innerHTML="";

        //Insert error message
        Row.innerHTML=`
        <div  class="col-lg-5 col-sm-12 m-4 fw-bold pt-5 text-center bg-info bg-opacity-50 rounded contentdiv">
            <p class="fs-2">
                City not found
            </p><br><br><br>
            <p>
                After 5 second city name automatically changed to default
            </p>
        </div>`

        //After 5 second weather data changed to its default data
        setTimeout(citydefault,5000)        
    }
}

//call weather data and set chennai as a default data
weatherdata("Chennai");

//City default name
function citydefault(){
    weatherdata("Chennai");
}

//Give city name to find weather
function search(){
    let CityName=document.querySelector(".CityName").value;

    weatherdata(`${CityName}`)


}

//Enter key press from keyboard - behaviour set
document.addEventListener('keyup',event=>{
    if(event.key=="Enter"){
        search();
    }
})

//Content of search box
document.body.innerHTML=`  <div class="container-fluid d-flux justify-content-center align-items-center">
                                <div class="row">
                                    <div class="col-lg col-sm-12 input-group m-4 textinput">
                                        <input type="text" class="form-control CityName" placeholder="Enter city name..." aria-label="city" aria-describedby="city">
                                        <span class="input-group-text" onclick="search()">Search</span>
                                    </div>
                                </div>
                                <div class="row d-flux justify-content-center align-items-center row2">
                                
                                </div>
                            </div>`