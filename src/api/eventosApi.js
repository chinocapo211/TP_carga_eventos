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

const enrollEvent = async (idEvent, user) => {
  console.log(idEvent)
  console.log(user)
  try {
  const result = await apiManager('POST', null, user, `event/${idEvent}/${user}/enrollment`);
  console.log("enroll")
  console.log(result);
  return result;
  } catch (error) {
  console.error('Error en la solicitud:', error);
  return { error: error.message };
}
};

const deleteEvent = async (idEvent, user) => {
  console.log(idEvent)
  console.log(user)
  try {
  const result = await apiManager('DELETE', null, user, `event/${idEvent}/${user}/del`);
  console.log("delete")
  console.log(result);
  return result;
  } catch (error) {
  console.error('Error en la solicitud:', error);
  return { error: error.message };
}
};

export {all_events, createEvent, enrollEvent, deleteEvent};