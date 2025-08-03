import { Sun, Cloud, CloudRain, CloudSnow, Zap, Eye } from "lucide-react"
import { useEffect, useState } from "react";

const TopBar = () => {
  const city = "ΑΘΗΝΑ"
  const [currentTime, setCurrentTime] = useState<string>("");
  const [weatherIcon, setWeatherIcon] = useState<React.ReactElement>(<Sun size={20} className="text-yellow-500 mr-2"/>);

  const days = ['ΚΥΡΙΑΚΗ', 'ΔΕΥΤΕΡΑ', 'ΤΡΙΤΗ', 'ΤΕΤΑΡΤΗ', 'ΠΕΜΠΤΗ', 'ΠΑΡΑΣΚΕΥΗ', 'ΣΑΒΒΑΤΟ'];
  const months = ['ΙΑΝΟΥΑΡΙΟΥ', 'ΦΕΒΡΟΥΑΡΙΟΥ', 'ΜΑΡΤΙΟΥ', 'ΑΠΡΙΛΙΟΥ', 'ΜΑΪΟΥ', 'ΙΟΥΝΙΟΥ', 'ΙΟΥΛΙΟΥ', 'ΑΥΓΟΥΣΤΟΥ', 'ΣΕΠΤΕΜΒΡΙΟΥ', 'ΟΚΤΩΒΡΙΟΥ', 'ΝΟΕΜΒΡΙΟΥ', 'ΔΕΚΕΜΒΡΙΟΥ'];
  const today = new Date();
  const currentDate = `${days[today.getDay()]} ${today.getDate().toString().padStart(2, "0")} ${months[today.getMonth()]}`;

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return <Sun size={20} className="text-yellow-500 mr-2"/>;
      case 'clouds':
        return <Cloud size={20} className="text-gray-300 mr-2"/>;
      case 'rain':
      case 'drizzle':
        return <CloudRain size={20} className="text-blue-400 mr-2"/>;
      case 'snow':
        return <CloudSnow size={20} className="text-white mr-2"/>;
      case 'thunderstorm':
        return <Zap size={20} className="text-yellow-400 mr-2"/>;
      case 'mist':
      case 'fog':
      case 'haze':
        return <Eye size={20} className="text-gray-400 mr-2"/>;
      default:
        return <Sun size={20} className="text-yellow-500 mr-2"/>;
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // More explicit 24-hour format
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      
      if (!apiKey) {
        console.error("API key not found!");
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=el`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherIcon(getWeatherIcon(data.weather[0].main));
      } catch (error) {
        console.error("Error fetching weather data:", error);
        // Keep default sun icon on error
      }
    };

    // Update time immediately and every minute
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);
    
    // Fetch weather immediately and every 10 minutes
    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 600000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(weatherInterval);
    };
  }, [city]);

  return (
    <>
    <div className="bg-blue-900 text-white text-sm py-1 border-gray-200">      
      <div className="container mx-auto flex justify-center items-center mt-2">
        <div>
          <span className="font-semibold mr-6">{currentDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          {weatherIcon}
          <span className="mr-1">{city}</span>
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default TopBar;