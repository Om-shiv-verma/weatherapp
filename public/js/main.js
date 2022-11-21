const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const day = document.getElementById('day');

const today_date = document.getElementById('today_date');
const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    } else {

        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=e7ae6972962a5516fb32e4ee028f3db8`
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`; //india in
            temp_real_val.innerText = arrData[0].main.temp; //32 degree
            const tempMood = arrData[0].weather[0].main; //clear
            console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";

            }
            datahide.classList.remove('data_hide');
            cityVal = "";

            const getCurrentDay = () => {
                var weekday = new Array(7);
                weekday[0] = "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tue";
                weekday[3] = "Wed";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
        
                let currentTime = new Date();
                let day = weekday[currentTime.getDay()];
                // console.log(weekday[currentTime.getDate()]);
                return day;
              };

              const getCurrentTime = () => {
                var months = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "June",
                  "July",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
        
                var now = new Date();
                var month = months[now.getMonth() + 1];
                var date = now.getDate();
        
                let hours = now.getHours();
                let mins = now.getMinutes();
        
                let periods = "AM";
        
                if (hours > 11) {
                  periods = "PM";
                  if (hours > 12) hours -= 12;
                }
                if (mins < 10) {
                  mins = "0" + mins;
                } 
        
                return `${month} ${date} | ${hours}:${mins}${periods}`;
              };
        
              day.innerText = getCurrentDay();
              today_date.innerText = getCurrentTime();

        } catch {
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText = `please enter the proper city name`;
            console.log('please add the proper city name');
        }

    }
}

submitBtn.addEventListener('click', getInfo);