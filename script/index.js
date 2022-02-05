const form = document.querySelector('form')
const overlay = document.querySelector('.overlay')
form.addEventListener('submit',function (e){
  e.preventDefault()
  let inputData = this[0].value;
  // Regular expression to check if string is a IP address
  const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

if(regexExp.test(inputData)){
    overlay.classList.remove('hidden')
    ipData(inputData)

 this[0].value=''

 } else{
    const errMsg = document.createElement('span');
     errMsg.innerHTML = 'not a valid Ip Address'
     errMsg.setAttribute('class','error-msg')
     form.append(errMsg)
     setTimeout(() => {
         errMsg.remove()
     }, 2000);
 }

})
// 192.212.174.101 

const ipData = async (inputData='8.8.8') =>{
   const data= await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_ej8ONrT2E7rC02ncS4hEfErduuexo&ipAddress=${inputData}`)
   .then(response => response.json())
   .then(data => {
       const{ip,isp,location} = data
       const {country,region,timezone} = location
        createData(ip,isp,country,region,timezone)
   })
   .catch(e =>{
    // const {isp,ip,location} = 'network error'
    createData(ip='network',isp="error",country="",region="error",timezone="error")
   })
}

// ipData()

function createData(ip,isp,country,region,timezone){
    //select corresponding tags
    let ipDisplay = document.querySelector('.ip-display');
    let  ipAddress = document.querySelector('.ip-address')
    let  ipIsp = document.querySelector('.ip-isp')
    let  iptimeZone = document.querySelector('.ip-timeZone')
     
    let ipSpan = document.createElement('span')
    let ispSpan = document.createElement('span')
    let countrySpan = document.createElement('span')
    let regionSpan = document.createElement('span')
    let timeZoneSpan = document.createElement('span')
    
    //append info

    ipSpan.innerHTML = ip
    ispSpan.innerHTML = isp
    countrySpan.innerHTML = country
    regionSpan.innerHTML = `${region}, ${country}`
    timeZoneSpan.innerHTML = `UTC ${timezone}`

    ipDisplay.append(ipSpan)
    ipAddress.append(regionSpan)
    ipIsp.append(ispSpan)
    iptimeZone.append(timeZoneSpan)
    overlay.classList.add('hidden')

}