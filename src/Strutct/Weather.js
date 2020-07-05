import React, {useEffect} from 'react';
import '../Styles/Weather.css'



const Weather = (props) => {

    const {data,city,onChange,onSubmit} = props;
   
    // console.log(img_src);
    return (
        
        <form className="form__weather" onSubmit={onSubmit}>
            <h1 className="city">{data.City}</h1>
            <h4 className="date">{data.Date}</h4>
            <h1 className="temperature">{data.Temperature}<sup>0</sup> C</h1>
            <h3 className="weather">{data.Weather}</h3>
           
           <div className="con">
                <input className="inp blue"type="text" value={city}
                onChange={onChange} placeholder="SEARCH FOR A CITY..."/>
                <button className="search "><i class="fas fa-search"></i></button>
           </div>
           <img className ="bgc" src="" alt="Clouds"/>
        </form>
        
        
    );
}
 
export default Weather;