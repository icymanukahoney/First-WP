import { useState, useEffect } from "react";
import axios from "axios";

const useCustomiser = () => {
     // variable for each setting from the customiser
     const [bgColor, setBgColor] = useState('');
     const [fontFamily, setFontFamily] = useState('');
     // Add extra state for extra settings
     const [navColor, setNavColor] = useState('');

 
     const baseUrl = import.meta.env.VITE_WP_BASEURL

    // Full customiser API Endpoint:

    //http://localhost:8888/myfirstwp/wp-json/custom-theme/v1/customizer-settings

   // http://localhost/myfirstwp/wp-json/custom-theme/v1/customizer-settings

  
   useEffect(() => {
    axios.get(`${baseUrl}wp-json/custom-theme/v1/customizer-settings`)
    .then((response) => {
        const {backgroundColor, fontFamily, navbarColor} = response.data // add to the destructure
        setBgColor(backgroundColor)
        setFontFamily(fontFamily)
        // change the state to the destructure
        setNavColor(navbarColor)

    })
    .catch((error) => {
        console.error('Error fetching customizer settings:', error)
    })

}, [baseUrl])

   

return {bgColor, fontFamily, navColor} // add to retrun object
}

export default useCustomiser
