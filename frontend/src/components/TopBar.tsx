import { Sun } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios"

const TopBar = () => {

  const city = "ΑΘΗΝΑ"
  const [temperature, setTemperature] = useState<string | null>(null)

  const days = ['ΚΥΡΙΑΚΗ', 'ΔΕΥΤΕΡΑ', 'ΤΡΙΤΗ', 'ΤΕΤΑΡΤΗ', 'ΠΕΜΠΤΗ', 'ΠΑΡΑΣΚΕΥΗ', 'ΣΑΒΒΑΤΟ'];
  const months = ['ΙΑΝΟΥΑΡΙΟΥ', 'ΦΕΒΡΟΥΑΡΙΟΥ', 'ΜΑΡΤΙΟΥ', 'ΑΠΡΙΛΙΟΥ', 'ΜΑΪΟΥ', 'ΙΟΥΝΙΟΥ', 'ΙΟΥΛΙΟΥ', 'ΑΥΓΟΥΣΤΟΥ', 'ΣΕΠΤΕΜΒΡΙΟΥ', 'ΟΚΤΩΒΡΙΟΥ', 'ΝΟΕΜΒΡΙΟΥ', 'ΔΕΚΕΜΒΡΙΟΥ'];
  const today = new Date();
  const currentDate = `${days[today.getDay()]} ${today.getDate().toString().padStart(2, "0")} ${months[today.getMonth()]}`;

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      
      if (!apiKey) {
        console.error("API key not found!");;
        setTemperature("N/A");
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=el`;

      try {
        const response = await axios.get(url)
        const temp = Math.round(response.data.main.temp)
        setTemperature(`${temp}°C`)
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setTemperature("N/A")
      }
    }

    fetchWeather()
  }, [city])

  return (
    <>
    <div className="bg-blue-900 text-white text-sm py-1 border-gray-200">      
      <div className="container mx-auto flex justify-center items-center mt-2">
        <div>
          <span className="font-semibold mr-6">{currentDate}</span>
        </div>
        <div className="flex items-center spaxe-x-2">
          <Sun size={20} className="text-yellow-500 mr-2"/>
          <span className="mr-1">{city}</span>
          <span>{temperature || "..."}</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default TopBar;