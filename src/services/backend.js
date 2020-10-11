import axios from 'axios'

const host = "http://ec2-54-234-44-198.compute-1.amazonaws.com:24009/";
const rf2 = host + "bigdata07/execute/rf2";
const is_complete = host + "complete/"

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
}

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
    return axios.post(rf2, params);
}

/**
 * Permite recuperar la informacion de una consulta
 * Si el estado no es 200 la promesa hace reject
 * @param {*} id ID de la consulta
 */
export const retrieveData = (id) => {
    return axios({
        url: is_complete + id,
        method: 'post',
        validateStatus: (status) => (status === 200)        
    });
};