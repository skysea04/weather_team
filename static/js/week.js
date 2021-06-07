const weekWeather = document.querySelector('#week-weather')

fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-003?Authorization="+CWB_API_KEY)
    .then(res => res.json())
    .then(data => data.records.locations[0].location[0].weatherElement)
    .then(data => {
        for(let i = 0; i <7; i++){

            const cardGroup = document.createElement('div')
            cardGroup.className = 'card-group'
            
            // 日期
            const cardDate = document.createElement('div')
            cardDate.className = 'card week-date rounded-0 text-white'
            const dateContain = document.createElement('div')
            dateContain.className = 'm-auto'
            const date = document.createElement('h5')
            date.innerText = moment().add(i+1, 'days').format('MM/DD')
            const week = document.createElement('h5')
            week.innerText = moment().add(i+1, 'days').format('dddd')
            dateContain.append(date, week)
            cardDate.append(dateContain)
            
            // 白天天氣
            const cardDay = document.createElement('div')
            cardDay.className = 'card'
            const dayContain = document.createElement('div')
            dayContain.className = 'card-body text-center'
            const dayTitle = document.createElement('h5')
            dayTitle.innerText = '白天'
            const dayTemp = document.createElement('p')
            dayTemp.innerText = `${data[8].time[i*2+1].elementValue[0].value} ~ ${data[12].time[i*2+1].elementValue[0].value} ℃`
            const dayRain = document.createElement('p')
            dayRain.innerText = `降雨機率：${data[0].time[i*2+1].elementValue[0].value!=' '? data[0].time[i*2+1].elementValue[0].value+'%' : '-'}`
            const dayWx = document.createElement('p')
            dayWx.innerText = data[6].time[i*2+1].elementValue[0].value
    
            dayContain.append(dayTitle, dayTemp, dayRain, dayWx)
            cardDay.append(dayContain)
            
            
            // 晚上天氣
            const cardNight = document.createElement('div')
            cardNight.className = 'card rounded-0 night-weather'
            const nightContain = document.createElement('div')
            nightContain.className = 'card-body text-center'
            const nightTitle = document.createElement('h5')
            nightTitle.innerText = '晚上'
            const nightTemp = document.createElement('p')
            nightTemp.innerText = `${data[8].time[i*2+2].elementValue[0].value} ~ ${data[12].time[i*2+2].elementValue[0].value} ℃`
            const nightRain = document.createElement('p')
            nightRain.innerText = `降雨機率：${data[0].time[i*2+2].elementValue[0].value!=' '? data[0].time[i*2+2].elementValue[0].value+'%' : '-'}`
            const nightWx = document.createElement('p')
            nightWx.innerText = data[6].time[i*2+2].elementValue[0].value
    
            nightContain.append(nightTitle, nightTemp, nightRain, nightWx)
            cardNight.append(nightContain)
    
            cardGroup.append(cardDate, cardDay, cardNight)
            weekWeather.append(cardGroup)
        }
    })