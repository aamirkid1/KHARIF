import React, { useState, useEffect } from 'react';
import i18n from 'i18next';


// Helper function to classify nutrient levels
function classifyLevel(value, type) {
  if (type === "N") {
    if (value < 240) return { level: "Low", color: "text-red-600" };
    if (value <= 480) return { level: "Medium", color: "text-yellow-600" };
    return { level: "High", color: "text-green-600" };
  }
  if (type === "P") {
    if (value < 11) return { level: "Low", color: "text-red-600" };
    if (value <= 22) return { level: "Medium", color: "text-yellow-600" };
    return { level: "High", color: "text-green-600" };
  }
  if (type === "K") {
    if (value < 110) return { level: "Low", color: "text-red-600" };
    if (value <= 280) return { level: "Medium", color: "text-yellow-600" };
    return { level: "High", color: "text-green-600" };
  }
  return { level: "Unknown", color: "text-gray-600" };
}


// Define the translation resources
const resources = {
  en: {
    translation: {
      "app_title": "Fertilizer Recommendation System",
      "app_header": "RECOMMENDING BEST FERTILIZER FOR YOUR CROP",
      "change_language": "Change Language",
      "temperature_label": "Temperature:",
      "humidity_label": "Humidity:",
      "moisture_label": "Moisture:",
      "soil_type_label": "Soil Type:",
      "crop_type_label": "Crop Type:",
      "nitrogen_label": "Nitrogen:",
      "potassium_label": "Potassium:",
      "phosphorous_label": "Phosphorous:",
      "predict_button": "Predict",
      "result_header": "Recommended Fertilizer For Your Crop IS:",
      "default_result": "Fill the form and click 'Predict'",
      "language_en": "English",
      "language_pa": "ਪੰਜਾਬੀ",
      "language_hi": "हिन्दी",
      "soil_black": "Black",
      "soil_clayey": "Clayey",
      "soil_loamy": "Loamy",
      "soil_sandy": "Sandy",
      "soil_red": "Red",
      "crop_barley": "Barley",
      "crop_maize": "Maize",
      "crop_wheat": "Wheat",
      "crop_rice": "Rice",
      "crop_cotton": "Cotton",
      "enter_app": "Enter Application",
      "slogan": "Soil Health & Fertilizer Guidance"
    }
  },
  pa: {
    translation: {
      "app_title": "ਖਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਪ੍ਰਣਾਲੀ",
      "app_header": "ਤੁਹਾਡੀ ਫਸਲ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਖਾਦ ਦੀ ਸਿਫਾਰਸ਼ ਕਰ ਰਿਹਾ ਹੈ",
      "change_language": "ਭਾਸ਼ਾ ਬਦਲੋ",
      "temperature_label": "ਤਾਪਮਾਨ:",
      "humidity_label": "ਨਮੀ:",
      "moisture_label": "ਨਮੀ:",
      "soil_type_label": "ਮਿੱਟੀ ਦੀ ਕਿਸਮ:",
      "crop_type_label": "ਫਸਲ ਦੀ ਕਿਸਮ:",
      "nitrogen_label": "ਨਾਈਟ੍ਰੋਜਨ:",
      "potassium_label": "ਪੋਟਾਸ਼ੀਅਮ:",
      "phosphorous_label": "ਫਾਸਫੋਰਸ:",
      "predict_button": "ਅਨੁਮਾਨ ਲਗਾਓ",
      "result_header": "ਤੁਹਾਡੀ ਫਸਲ ਲਈ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਖਾਦ ਹੈ:",
      "default_result": "ਫਾਰਮ ਭਰੋ ਅਤੇ 'ਅਨੁਮਾਨ ਲਗਾਓ' 'ਤੇ ਕਲਿੱਕ ਕਰੋ",
      "language_en": "ਅੰਗਰੇਜ਼ੀ",
      "language_pa": "ਪੰਜਾਬੀ",
      "language_hi": "ਹਿੰਦੀ",
      "soil_black": "ਕਾਲੀ",
      "soil_clayey": "ਚੀਕਣੀ",
      "soil_loamy": "ਰੇਤਲੀ",
      "soil_sandy": "ਰੇਤਲੀ",
      "soil_red": "ਲਾਲ",
      "crop_barley": "ਜੌਂ",
      "crop_maize": "ਮੱਕੀ",
      "crop_wheat": "ਕਣਕ",
      "crop_rice": "ਚੌਲ",
      "crop_cotton": "ਕਪਾਹ",
      "enter_app": "ਐਪਲੀਕੇਸ਼ਨ ਦਾਖਲ ਕਰੋ",
      "slogan": "ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਅਤੇ ਖਾਦ ਮਾਰਗਦਰਸ਼ਨ"
    }
  },
  hi: {
    translation: {
      "app_title": "उर्वरक सिफारिश प्रणाली",
      "app_header": "आपकी फसल के लिए सर्वोत्तम उर्वरक की सिफारिश",
      "change_language": "भाषा बदलें",
      "temperature_label": "तापमान:",
      "humidity_label": "आर्द्रता:",
      "moisture_label": "नमी:",
      "soil_type_label": "मिट्टी का प्रकार:",
      "crop_type_label": "फसल का प्रकार:",
      "nitrogen_label": "नाइट्रोजन:",
      "potassium_label": "पोटेशियम:",
      "phosphorous_label": "फास्फोरस:",
      "predict_button": "भविष्यवाणी करें",
      "result_header": "आपकी फसल के लिए अनुशंसित उर्वरक है:",
      "default_result": "फ़ॉर्म भरें और 'भविष्यवाणी करें' पर क्लिक करें",
      "language_en": "अंग्रेज़ी",
      "language_pa": "ਪੰਜਾਬੀ",
      "language_hi": "हिन्दी",
      "soil_black": "काली",
      "soil_clayey": "चिकनी",
      "soil_loamy": "दोमट",
      "soil_sandy": "रेतीली",
      "soil_red": "लाल",
      "crop_barley": "जौ",
      "crop_maize": "मक्का",
      "crop_wheat": "गेहूं",
      "crop_rice": "चावल",
      "crop_cotton": "कपास",
      "enter_app": "एप्लिकेशन दर्ज करें",
      "slogan": "मृदा स्वास्थ्य और उर्वरक मार्गदर्शन"
    }
  }
};

// Initialize i18n
i18n.init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

// Mappings
const generalSoilTypeMapping = { Black: 0, Clayey: 1, Loamy: 2, Sandy: 3, Red: 4 };
const generalCropTypeMapping = { Barley: 0, Maize: 1, Wheat: 2, Rice: 3, Cotton: 4 };

const App = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [inputs, setInputs] = useState({
    temperature: '', humidity: '', moisture: '', soilType: 'Black', cropType: 'Barley',
    nitrogen: '', potassium: '', phosphorous: '',
  });
  const [result, setResult] = useState(i18n.t('default_result'));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLanguage(lng);
      setResult(i18n.t('default_result'));
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => { i18n.off('languageChanged', handleLanguageChange); };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleGeneralPredict = async () => {
    setIsLoading(true);
    setResult("Loading...");


//     // Utility function to classify levels
// const classifyLevel = (valueKgHa, nutrient) => {
//   if (nutrient === "N") {
//     if (valueKgHa < 240) return { level: "Low", color: "text-red-600" };
//     if (valueKgHa <= 480) return { level: "Medium", color: "text-yellow-600" };
//     return { level: "High", color: "text-green-600" };
//   }
//   if (nutrient === "P") {
//     if (valueKgHa < 11) return { level: "Low", color: "text-red-600" };
//     if (valueKgHa <= 22) return { level: "Medium", color: "text-yellow-600" };
//     return { level: "High", color: "text-green-600" };
//   }
//   if (nutrient === "K") {
//     if (valueKgHa < 110) return { level: "Low", color: "text-red-600" };
//     if (valueKgHa <= 280) return { level: "Medium", color: "text-yellow-600" };
//     return { level: "High", color: "text-green-600" };
//   }
// };



    

    const dataToSend = {
      temperature: inputs.temperature,
      humidity: inputs.humidity,
      moisture: inputs.moisture,
      soilType: generalSoilTypeMapping[inputs.soilType],
      cropType: generalCropTypeMapping[inputs.cropType],
      nitrogen: inputs.nitrogen,
      potassium: inputs.potassium,
      phosphorous: inputs.phosphorous,
    };

    try {
      const response = await fetch('https://plantapp-2.onrender.com/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dataToSend),
});

      // const response = await fetch('http://127.0.0.1:5000/predict', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dataToSend),
      // });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      setResult(data.recommendation);
    } catch (error) {
      console.error(error);
      setResult("Error: Could not get a recommendation.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";
  const labelClass = "text-sm md:text-base font-semibold text-gray-700";
  const buttonClass = "bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-12 rounded-full transition-colors duration-300 shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const renderGeneralForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left */}
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{i18n.t('temperature_label')}</label>
            <div className="flex items-center">
              <input type="number" name="temperature" value={inputs.temperature} onChange={handleInputChange} className={`${inputClass} flex-1`} />
              <span className="ml-2 text-gray-600 font-medium">°C</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>{i18n.t('humidity_label')}</label>
            <div className="flex items-center">
              <input type="number" name="humidity" value={inputs.humidity} onChange={handleInputChange} className={`${inputClass} flex-1`} />
              <span className="ml-2 text-gray-600 font-medium">%</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>{i18n.t('moisture_label')}</label>
            <div className="flex items-center">
              <input type="number" name="moisture" value={inputs.moisture} onChange={handleInputChange} className={`${inputClass} flex-1`} />
              <span className="ml-2 text-gray-600 font-medium">%</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>{i18n.t('nitrogen_label')}</label>
            <div className="flex items-center">
              <input type="number" name="nitrogen" value={inputs.nitrogen} onChange={handleInputChange} className={`${inputClass} flex-1`} />
              <span className="ml-2 text-gray-600 font-medium">ppm</span>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{i18n.t('soil_type_label')}</label>
            <select name="soilType" value={inputs.soilType} onChange={handleInputChange} className={inputClass}>
              {Object.keys(generalSoilTypeMapping).map(key => <option key={key} value={key}>{i18n.t(`soil_${key.toLowerCase()}`)}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>{i18n.t('crop_type_label')}</label>
            <select name="cropType" value={inputs.cropType} onChange={handleInputChange} className={inputClass}>
              {Object.keys(generalCropTypeMapping).map(key => <option key={key} value={key}>{i18n.t(`crop_${key.toLowerCase()}`)}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>{i18n.t('potassium_label')}</label>
            <div className="flex items-center">
              <input type="number" name="potassium" value={inputs.potassium} onChange={handleInputChange} className={`${inputClass} flex-1`} />
              <span className="ml-2 text-gray-600 font-medium">ppm</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>{i18n.t('phosphorous_label')}</label>
            <div className="flex items-center">
              <input type="number" name="phosphorous" value={inputs.phosphorous} onChange={handleInputChange} className={`${inputClass} flex-1`} />
              <span className="ml-2 text-gray-600 font-medium">ppm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button onClick={handleGeneralPredict} disabled={isLoading} className={buttonClass}>
          {isLoading ? 'Predicting...' : i18n.t('predict_button')}
        </button>
      </div>
    </>
  );

  const renderHomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4 md:p-8">
      <div className="text-center mb-10">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-white tracking-wider drop-shadow-lg">KHARIF</h1>
        <p className="mt-2 text-xl sm:text-2xl font-medium text-white drop-shadow-lg">
          A Soil Health Recommendations And Fertilizer Guidance WebApp
        </p>
      </div>
      <button onClick={() => setIsFormVisible(true)} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full text-xl shadow-2xl">
        {i18n.t('enter_app')}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/adele-payman-2oYMwuFgnTg-unsplash.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Header */}
      <div className="relative z-20 w-full flex justify-between items-center px-6 pt-6">
        {!isFormVisible && (
          <div className="flex items-center space-x-2">
            <label htmlFor="language-select-home" className="text-white font-medium hidden md:block">
              {i18n.t('change_language')}:
            </label>
            <select
              id="language-select-home"
              value={currentLanguage}
              onChange={handleLanguageChange}
              className="p-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="en">{i18n.t('language_en')}</option>
              <option value="pa">{i18n.t('language_pa')}</option>
              <option value="hi">{i18n.t('language_hi')}</option>
            </select>
          </div>
        )}
      </div>

      <div className="absolute top-5 w-full flex justify-center">
        <h1 className="text-4xl font-extrabold text-white tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          TEAM IOTA Presents
        </h1>
      </div>

      {/* Main */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4 md:p-8">
        {isFormVisible ? (
          <>
            <div className="w-full max-w-2xl flex justify-end items-center mb-4 relative z-20">
              <button onClick={() => setIsFormVisible(false)} className="bg-gray-700 hover:bg-gray-800 text-white text-sm font-bold py-2 px-4 rounded-full mr-2">
                ← Back
              </button>
              <label htmlFor="language-select" className="text-white font-medium hidden md:block mr-2">{i18n.t('change_language')}:</label>
              <select id="language-select" value={currentLanguage} onChange={handleLanguageChange} className="p-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="en">{i18n.t('language_en')}</option>
                <option value="pa">{i18n.t('language_pa')}</option>
                <option value="hi">{i18n.t('language_hi')}</option>
              </select>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 max-w-2xl w-full">
              <div className="flex justify-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-extrabold text-gray-800 text-center">{i18n.t('app_header')}</h2>
              </div>
              {renderGeneralForm()}
            </div>

            {/* Result Card
            {result && result !== i18n.t('default_result') && (
              <div className="mt-10 w-full max-w-2xl animate-fadeInUp">
                <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 text-center transform transition-all duration-700 hover:scale-105 hover:shadow-green-300/40">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-green-900 drop-shadow-lg">
                    🌱 {i18n.t('result_header')}
                  </h3>
                  <p className="text-4xl md:text-5xl font-extrabold text-green-800 drop-shadow-md">
                    {result}
                  </p>
                </div>
              </div>
            )} */}

            
{result && result !== i18n.t('default_result') && (
  <div className="mt-10 w-full max-w-2xl animate-fadeInUp">
    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 text-center transform transition-all duration-700 hover:scale-105 hover:shadow-green-300/40">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-green-900 drop-shadow-lg">
        🌱 {i18n.t('result_header')}
      </h3>
      <p className="text-4xl md:text-5xl font-extrabold text-green-800 drop-shadow-md mb-6">
        {result}
      </p>

     
      <div className="mt-6 text-left">
        <h4 className="text-3xl font-bold mb-4 text-gray-800">🧪 Soil Health</h4>
        {(() => {
          const nitrogenKgHa = inputs.nitrogen * 2;
          const phosphorusKgHa = inputs.phosphorous * 2;
          const potassiumKgHa = inputs.potassium * 2;

          const nStatus = classifyLevel(nitrogenKgHa, "N");
          const pStatus = classifyLevel(phosphorusKgHa, "P");
          const kStatus = classifyLevel(potassiumKgHa, "K");

          return (
            <ul className="space-y-2">
              <li className={`font-semibold text-xl ${nStatus.color}`}>
                Nitrogen (N): {nStatus.level}
              </li>
              <li className={`font-semibold text-xl ${pStatus.color}`}>
                Phosphorus (P): {pStatus.level}
              </li>
              <li className={`font-semibold text-xl ${kStatus.color}`}>
                Potassium (K): {kStatus.level}
              </li>
            </ul>
          );
        })()}
      </div>
    </div>
  </div>
)}  





          </>
        ) : (
          renderHomeScreen()
        )}
      </div>
    </div>
  );
};

export default App;
