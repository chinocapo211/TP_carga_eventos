import {apiManager} from "./apiManager";
const all_categories = async () => {
    try {
    const result = await apiManager('GET', null,null, 'event-category/getAll');
    console.log("jijijijijijijijijij")
    console.log(result);
    return result;
    } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

export {all_categories};