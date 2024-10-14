import {apiManager} from "./apiManager";
const all_events = async () => {
    try {
    const result = await apiManager('GET', null,null, 'event/getAll');
    console.log("Hola ----------------------------------")
    console.log(result);
    return result;
    } catch (error) {
    console.error('Error en la solicitud locations:', error);
    return { error: error.message };
  }
};

const createEvent = async (event) => {
  console.log(event)
  try {
  const result = await apiManager('POST', null, event, 'event/createEvent');
  console.log("crear evento")
  console.log(result);
  return result;
  } catch (error) {
  console.error('Error en la solicitud:', error);
  return { error: error.message };
}
};

export {all_events, createEvent};