fetch("https://api.covid19india.org/data.json").then((result)=>{return result.json()}).then((result)=>{
   console.log(result)
   document.getElementById("active__cases").innerHTML=`${result.statewise[0].active}`
   document.getElementById("confirmed__cases").innerHTML=`${result.statewise[0].confirmed}`
   document.getElementById("recoverd__cases").innerHTML=`${result.statewise[0].recovered}`
   document.getElementById("deaths__cases").innerHTML=`${result.statewise[0].deaths}`
})

document.addEventListener("DOMContentLoaded",function(){
   document.getElementById("getdata_button").addEventListener("click",getdata)
})

function getdata(){
   fetch("https://api.covid19india.org/data.json").then((result) => {return result.json()}).then((result)=>{
      let state=document.getElementById("state").value;
      if(state !== "--:: Select a State ::--")
      {
         for (i in result.statewise){
            if (result.statewise[i].state == state){
               document.querySelector(".table_info").style.display="block"
               let STATE = document.getElementById("searched_state")
               let active=document.getElementById("active__cases_searched")
               let confirmed=document.getElementById("confirmed__cases_searched")
               let recoverd=document.getElementById("recoverd__cases_searched")
               let deaths=document.getElementById("deaths__cases_searched")
               STATE.innerHTML=state
               active.innerHTML=result.statewise[i].active
               confirmed.innerHTML=result.statewise[i].confirmed
               recoverd.innerHTML=result.statewise[i].recovered
               deaths.innerHTML=result.statewise[i].deaths
            }
         }
      }
   })
}