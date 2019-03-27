
import axios,{
    
    AxiosResponse,
    AxiosError

}from "../../node_modules/axios/index"
import { ICar } from "./icar";
let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let GetAllCarsButton:HTMLButtonElement = <HTMLButtonElement>document.getElementById("getallbutton");

let addbutton:HTMLButtonElement = <HTMLButtonElement> document.getElementById("addbutton");
GetAllCarsButton.addEventListener("click", showAllCars)
addbutton.addEventListener("click",addcar);
function  addcar() :void {
    let addmodelelement : HTMLInputElement = < HTMLInputElement> document.getElementById("addmodel");
    let addvendorelement : HTMLInputElement = <HTMLInputElement> document.getElementById("addvendor ");
    let addpriceelement : HTMLInputElement = < HTMLInputElement> document.getElementById("addprice");
    let Mymodel : string = addmodelelement.value;
    let Myvendor : string = addvendorelement.value;
    let Myprice : number = +addpriceelement.value;
    
    axios.post<ICar>("https://webapicar20190326034339.azurewebsites.net/api/cars",
    {model:Mymodel,vendor:Myvendor,price:Myprice}) 
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


function showAllCars():void{

    axios.get<ICar[]>("https://webapicar20190326034339.azurewebsites.net/api/cars")
    
    .then(function(response:AxiosResponse<ICar[]>):void

   {
       console.log("er i then")
       console.log(response);

       let result : string="<ol>"

       response.data.forEach((car: ICar)=>{
           result +="<li>"+"  "  +car.model+"  "   +car.vendor +"  " +car.id+"<li>"
       });
       result+= "</ol>"
       ContentElement.innerHTML=result;

   
   })

   .catch(
   
    function (error : AxiosError) : void{
        
        console.log(error);
    }
    )
    

    console.log("er i slutning af showallcars function");

  


}
// showAllCars();