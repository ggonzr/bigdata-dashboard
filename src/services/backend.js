import axios from "axios";

const host = "http://mine4102-7.virtual.uniandes.edu.co:8000/";
const rf2 = host + "bigdata07/execute/rf2";
const rf1 = host + "bigdata07/execute/rf1";
const ra2 = host + "bigdata07/execute/ra2";
const ra1_1 = host + "bigdata07/execute/ra1_1";
const predict = host + "predict";
const is_complete = host + "complete/";

/**
 * Permite ejecutar el requerimiento funcional 2
 * @param {*} body Cuerpo de la peticion
 */
export const executeRf2 = (body) => {
  const params = {
    ...body,
    input: "/user/bigdata07/input/small/",
    output: "/user/bigdata07/output",
  };
  return axios.post(rf2, params);
};

/**
 * Permite ejecutar el req. funcional 1
 * @param {*} body Cuerpo de la consulta
 */

export const executeRf1 = (body) => {
  const params = {
    ...body,
    input: "/user/bigdata07/input/small/",
    output: "/user/bigdata07/output",
  };
  return axios.post(rf1, params);
};

/**
 * Permite ejecutar el req. analisis 2
 * @param {*} body Cuerpo de la consulta
 */

export const executeRa2 = (body) => {
  const params = {
    ...body,
    input: "/user/bigdata07/input/small/",
    output: "/user/bigdata07/output",
  };
  return axios.post(ra2, params);
};

/**
 * Permite ejecutar el req. analisis 1 - Pregunta 1
 * @param {*} body Cuerpo de la consulta
 */

export const executeRa1_1 = () => {
  const params = {
    input: "/user/bigdata07/input/small/",
    output: "/user/bigdata07/output",
  };
  return axios.post(ra1_1, params);
};

export const execute_predict = (body) => {
  return axios.post(predict, body);
};

/**
 * Permite recuperar la informacion de una consulta
 * Si el estado no es 200 la promesa hace reject
 * @param {*} id ID de la consulta
 */
export const retrieveData = (id) => {
  return axios({
    url: is_complete + id,
    method: "post",
    validateStatus: (status) => status === 200,
  });
};
