let records = null
let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=" + CWB_API_KEY
fetch(url).then((res) => {
	return res.json()
}).then((result) => {
	const records = result.records
  	const data_len = records.location.length
	const container = document.querySelector("#raining")
	for(let i=0;i<data_len;i++){
		renderdata(i,records,container)
	}
})
const renderdata = (i,records,container) => {
    const location = records.location[i]
    if(location.parameter[0].parameterValue === "宜蘭縣" && location.weatherElement[6].elementName === "HOUR_24"){
    document.createElement("amount")
        renderView(location,container)
    }
}

const renderView = (location,container) => {
  const item = document.createElement("div")
    item.className = "location"
    const stop = document.createElement("div")
    stop.className = "stop"
    stop.textContent = location.locationName
    const town = document.createElement("div")
    town.className = "town"
    town.textContent = location.parameter[0].parameterValue + " - " + location.parameter[2].parameterValue
    const amount = document.createElement("amount")
    amount.className = "amount"
    amount.textContent = location.weatherElement[6].elementValue+" mm"
    if(location.weatherElement[6].elementValue > 50){
      amount.style.color = '#f24'
    }
    const progress = document.createElement("div")
    progress.className = "progress"
    const progress_bar = document.createElement("div")
    progress_bar.className = "progress-bar progress-bar-striped progress-bar-animated bg-info"
    progress_bar.role = "progressbar"
    progress_bar.style = "width:" + location.weatherElement[6].elementValue + "%"
    progress_bar.ariaValuenow = location.weatherElement[6].elementValue
    progress_bar.ariaValuemin = "0.00"
    progress_bar.ariaValuemax = "100.00"
    appenditem(container,item,town,stop,amount,progress,progress_bar)
}

const appenditem = (container,item,town,stop,amount,progress,progress_bar)=>{
    item.appendChild(town)
    item.appendChild(stop)
    item.appendChild(amount)
    item.appendChild(progress)
    progress.appendChild(progress_bar)
    container.appendChild(item)
}