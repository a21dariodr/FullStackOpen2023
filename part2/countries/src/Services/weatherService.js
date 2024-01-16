import axios from "axios"

const owmApiKey = import.meta.env.VITE_OWM_API_KEY

const getCityWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${owmApiKey}&units=metric`
    return await axios.get(url)
}

export default getCityWeather
