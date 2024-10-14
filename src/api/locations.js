import {apiManager} from "./apiManager";
const all_locations = async () => {
    try {
    const result = await apiManager('GET', null,null, 'event-location/getAll');
    console.log("locations_api")
    console.log(result);
    return result;
    } catch (error) {
    console.error('Error en la solicitud locations:', error);
    return { error: error.message };
  }
};

export {all_locations};