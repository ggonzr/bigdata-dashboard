import axios from 'axios'

const host = "http://104.197.191.127:8000/"
const url = host + "bigdata07/execute/rf2"

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
    return axios.post(url, params);
}