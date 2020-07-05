import React, { Component } from 'react';
// import {BrowserRouter, Route,Link} from "react-router-dom";
import './Styles/App.css';
import Weather from'./Strutct/Weather'
import gsap from 'gsap';
class App extends Component {
  state = { 

    newCity: "",
    data:{
      City: "London",
      Weather: "",
      Temperature: "",
      Date: "",
      Img: ""
    }

   }
  
   params = {
    api: "https://api.openweathermap.org/data/2.5/weather?q=",
    key:"69e5e3e9ddaebb71e771b954b3f78b15"
   }
   img_src="";
  componentDidMount(){
    this.getData(this.state.data.City);
    // this.startEffect();
  }

  
  getData = (name) =>{
    const date = new Date();
    let today = date.toLocaleDateString();
    // console.log(name);
    fetch(`${this.params.api}${name}&appid=${this.params.key}`)
   .then(response => response.json())
   .then(data=> {
    
    
    this.img_src =`/images/${data.weather[0].main}/bgc.jpg`
    if(Math.floor(data.main.temp - 273.15)>20 && data.weather[0].main==="clear"){
      this.img_src=`/images/Sun/bgc.jpg`
    }
    const img = document.querySelector('.bgc');

    img.src = this.img_src;
    
    this.startEffect();
     this.setState({
       data:{
         City: data.name,
         Weather: data.weather[0].main,
         Temperature: Math.floor(data.main.temp - 273.15),
         Date: today,
         Img: this.img_src
       }
     }) 
     img.src = this.img_src;
     
   })
   .catch(error=>{
     console.log(error)
     alert("Enter the correct city name");
     this.startEffect();
  });
  }

  onSubmit = (e) =>{
    e.preventDefault();
    if(this.state.data.newCity!==""){
      this.endEffect();

      setTimeout(()=>{
          this.getData(this.state.newCity);
        this.setState({
          newCity: ""
      })
      },500)
      
    
      
    }
       
  }

  onChange =(e) =>{
    this.setState({
      newCity: e.target.value
    })
  }

  startEffect = () =>{

        const img = document.querySelector('.bgc'); 
        const form = document.querySelector('.form__weather');
        // img.src = img_src;
        let arr = [];
        for(let i=0;i<form.children.length-1;i++){
            arr.push(form.children[i]);
        }
        gsap.set([img,arr],{autoAlpha: 0});
        setTimeout(()=>{
          
          gsap.set(arr,{y:"+=100"})
          const t1 = gsap.timeline({defaults:{ease:'power3.inOut'}});
          t1.to(img,{autoAlpha: 1})
              .to(arr,{duration:1, autoAlpha:1,y:"-=100" },'-=0.25')
        },500)
        
  }

  endEffect = () =>{
    const form_child = document.querySelector('.form__weather').children;
    gsap.to(form_child,{duration:0.25,autoAlpha:0});
  }


  render() { 
    const {newCity,data} = this.state
    return ( 
        <div className="app">
          <Weather data = {data} city = {newCity} onChange={this.onChange}onSubmit={this.onSubmit}/>
        </div>
    );
  }
}
 
export default App;

