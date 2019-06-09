
import axios,{
    
    AxiosResponse,
    AxiosError

}from "../../node_modules/axios/index"
import { IMeassurement } from "./imeassurement";
let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let GetAllMeassurementsButton:HTMLButtonElement = <HTMLButtonElement>document.getElementById("getallbutton");

let addbutton:HTMLButtonElement = <HTMLButtonElement> document.getElementById("addbutton");
GetAllMeassurementsButton.addEventListener("click", showAllMeassurements)
addbutton.addEventListener("click",addmeassurement);
function  addmeassurement() :void {
    let addpressureelement : HTMLInputElement = < HTMLInputElement> document.getElementById("addpressure");
    let addhumidityelement : HTMLInputElement = <HTMLInputElement> document.getElementById("addhumidity");
    let addtemperatureelement : HTMLInputElement = <HTMLInputElement> document.getElementById("addtemperature");
    let addtimestampelement : HTMLInputElement = <HTMLInputElement> document.getElementById("addtimestamp");
    let MYpressure : number = +addpressureelement.value;
    let Myhumidity: number = +addhumidityelement.value;
    let Mytemperature : number  = +addtemperatureelement.value;
    let Mytimestamp : number = +addtimestampelement;
    
    axios.post<IMeassurement>("https://meassurement.azurewebsites.net/api/Meassurements",
    {pressure:MYpressure,humidity:Myhumidity,temperature:Mytemperature,timestamp:Mytimestamp}) 
    .then(function(Response :AxiosResponse):void
    {
        console.log("statuskoden er :"+ Response.status)
    })
    .catch(
   
        function (error : AxiosError) : void{
            
            console.log(error);
        }
    )
    
 
}


function showAllMeassurements():void{

    axios.get<IMeassurement[]>("https://meassurement.azurewebsites.net/api/Meassurements")
    
    .then(function(response:AxiosResponse<IMeassurement[]>):void

   {
       console.log("er i then")
       console.log(response);

       let result : string="<ol>"

       response.data.forEach((meassurement: IMeassurement)=>{
           result +="<li>"+"  "  +meassurement.pressure+"  "   +meassurement.humidity +"  " +meassurement.Temperature+" "+meassurement.timestamp+" " +"<li>"
       });
       result+= "</ol>"
       ContentElement.innerHTML=result;

   
   })

   .catch(
   
    function (error : AxiosError) : void{
        
        console.log(error);
    }
    )
    

    console.log("er i slutning af showallMeassurements function");

  


}
// showAllMeassurements();