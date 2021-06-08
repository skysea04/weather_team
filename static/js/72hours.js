fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-001?Authorization="+CWB_API_KEY+"&locations=宜蘭縣")
.then(response=>response.json())
.then(data=>{
    const weatherInfo = data["records"]["locations"][0]["location"][0]["weatherElement"]
    for(let i=0;i<24;i++){
        document.querySelectorAll(".time")[i].textContent=weatherInfo[1]["time"][i]["startTime"].slice(5,16)  //時間
        document.querySelectorAll(".Wx")[i].textContent=weatherInfo[1]["time"][i]["elementValue"][0]["value"]  //天氣現象
        document.querySelectorAll(".T")[i].textContent=weatherInfo[3]["time"][i]["elementValue"][0]["value"]+"°"  //溫度
        document.querySelectorAll(".CI")[i].textContent=weatherInfo[5]["time"][i]["elementValue"][1]["value"]  //舒適度
        let num = Number(weatherInfo[1]["time"][i]["elementValue"][1]["value"])  //天氣現象代號
        if(num<3){
            document.querySelectorAll(".weatherIcon")[i].style.backgroundImage='url("/static/images/icon-sun.png")'
        }
        else if(3<num && num<8){
            document.querySelectorAll(".weatherIcon")[i].style.backgroundImage='url("/static/images/icon-cloud.png")'
        }
        else{
            document.querySelectorAll(".weatherIcon")[i].style.backgroundImage='url("/static/images/icon-rain.png")'
        }
    }
})