import { useState } from 'react';
import { Sun, Cloud, CloudRain, Snowflake, RefreshCw, Droplets, Thermometer } from 'lucide-react';

interface WeatherInfo {
  temp: number;
  humidity: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowflake';
}

const weatherData: Record<string, WeatherInfo> = {
  Cotonou:  { temp: 31, humidity: 78, condition: 'sunny' },
  Paris:    { temp: 14, humidity: 62, condition: 'cloudy' },
  Tokyo:    { temp: 22, humidity: 55, condition: 'rainy' },
  Montreal: { temp: -3, humidity: 80, condition: 'snowflake' },
};

const WeatherIcon = ({ condition }: { condition: WeatherInfo['condition'] }) => {
  switch (condition) {
    case 'sunny':
      return <Sun className="text-amber-500 w-16 h-16" style={{ color: '#f59e0b' }} />;
    case 'cloudy':
      return <Cloud className="text-gray-400 w-16 h-16" style={{ color: '#94a3b8' }} />;
    case 'rainy':
      return <CloudRain className="text-blue-400 w-16 h-16" style={{ color: '#60a5fa' }} />;
    case 'snowflake':
      return <Snowflake className="text-blue-200 w-16 h-16" style={{ color: '#bfdbfe' }} />;
    default:
      return null;
  }
};

export default function App() {
  const cities = Object.keys(weatherData);
  const [selectedCity, setSelectedCity] = useState<string>(cities[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState<WeatherInfo>(weatherData[cities[0]]);

  const handleRefresh = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setDisplayData(weatherData[selectedCity]);
      setIsLoading(false);
    }, 1200);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setDisplayData(weatherData[city]);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Dashboard Météo</h1>

        {/* Sélecteur de ville */}
        <div className="form-group">
          <label htmlFor="city-select" className="form-label">Choisir une ville :</label>
          <select
            id="city-select"
            className="form-select"
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            disabled={isLoading}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Affichage des données ou du chargement */}
        {isLoading ? (
          <div className="loading-container">
            <RefreshCw className="spinner animate-spin" />
            <p>Mise à jour des données...</p>
          </div>
        ) : (
          <div className="weather-display">
            <div className="icon-wrapper">
              <WeatherIcon condition={displayData.condition} />
              <span className="condition-text">{displayData.condition.toUpperCase()}</span>
            </div>

            <div className="info-grid">
              <div className="info-box">
                <Thermometer style={{ color: '#ef4444' }} />
                <div>
                  <span className="info-label">Température</span>
                  <span className="info-value">{displayData.temp}°C</span>
                </div>
              </div>

              <div className="info-box">
                <Droplets style={{ color: '#3b82f6' }} />
                <div>
                  <span className="info-label">Humidité</span>
                  <span className="info-value">{displayData.humidity}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bouton Actualiser */}
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="btn-refresh"
        >
          <RefreshCw size={18} style={{ marginRight: 8 }} className={isLoading ? 'animate-spin' : ''} />
          {isLoading ? 'Chargement...' : 'Actualiser'}
        </button>
      </div>
    </div>
  );
}