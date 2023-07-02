import { useState } from "react";
import useFetch from "./useFetch"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
function App() {
  const [input, setInput] = useState("")
  let API = "4337089df51cdeb9774ef107b436b3dc"
  const {data,isPending,error} = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API}`)

  const [weather, setWeather] = useState("")
  const handleChange = (e) => {
      setInput(e.target.value)
  }
  const handleSubmit = (e) =>{
    console.log(data)
      e.preventDefault()
      setWeather(
        <div className="fetch-data">
          {isPending && <div className="handle">loading...</div>}
          {error && <div className="handle">Try Again Later...</div>}
            <p>{data!== null ? data.name : ""}</p>
            {data!== null ?<h1>{data.main.temp.toFixed()}°C</h1> : ""}
            <div className="bottom">
              {data !== null ? <div className="bottom-child">
                <h3>Feels Like</h3>
                {data!== null ?<p>{data.main.feels_like}°C</p>: ""}
              </div> : null}
              {data !== null ? <div className="bottom-child">
                <h3>Humidity</h3>
                <p>{data!== null ? data.main.humidity: ""}%</p>
              </div> : null}
              {data !== null ? <div className="bottom-child-end">
                <h3>Wind Speed</h3>
                <p>{data!== null ? data.wind.speed: ""}MPH</p>
              </div> : null}
            </div>
        </div>
  )
  }
  return ( 
    <div className="App">

      <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
              <label htmlFor="search">
              <FontAwesomeIcon icon={faLocationDot} style={{color: "#3e3b51"}} />
              </label>
              <input type="text" id="search" value={input} onChange={handleChange} placeholder="Enter City Location..."/>
              <label htmlFor="submit">
              <input type="submit" id="submit" value={""}/>
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#3e3b51",}} />
              </label>
          </form>
      </div>
      {weather}
    </div>
   );
}

export default App;
