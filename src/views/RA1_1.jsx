/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Created by Creative Tim
* Modified by Geovanny Andres Gonzalez
* for Big Data Dashboard Project

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { optionsBar, responsiveBar } from "variables/Variables.jsx";
import { executeRa1_1, retrieveData } from "services/backend";
import CustomCheckbox from "components/CustomCheckbox/CustomCheckbox2.jsx";

class RA1_1 extends Component {
  //Variables estaticas
  legendBar = {
    names: ["Trayectos llegan a la misma zona", "Total de trayectos"],
    types: ["info", "danger"],
  };

  checkBoxes = [
    { number: 1, label: "Top 1" },
    { number: 2, label: "Top 2" },
    { number: 3, label: "Top 3" },
    { number: 4, label: "Top 4" },
    { number: 5, label: "Top 5" },
  ];

  mockedData = {
    102: "77;478;102,48,1,2020-01-01 00:49:00,2020-01-01 01:52:01@102,191,2,2020-01-01 01:45:15,2020-01-09 02:20:22@102,195,1,2020-01-02 05:30:00,2020-01-02 05:49:27@102,196,4,2020-01-01 00:10:57,2020-01-02 10:09:00@102,197,7,2020-01-01 00:38:25,2020-01-01 19:13:00@102,198,101,2020-01-01 00:09:11,2020-01-06 11:44:05@102,232,1,2020-01-01 01:37:29,2020-01-01 02:18:13@102,112,3,2020-01-01 00:31:58,2020-01-01 01:47:39@102,157,15,2020-01-01 00:26:05,2020-01-10 15:41:31@102,235,3,2020-01-01 06:35:50,2020-01-08 17:57:21@102,237,1,2020-01-05 05:59:40,2020-01-05 06:21:49@102,117,2,2020-01-01 01:38:07,2020-01-01 15:03:00@102,92,1,2020-01-02 21:01:25,2020-01-02 21:12:35@102,50,1,2020-01-01 01:16:51,2020-01-01 02:17:08@102,95,8,2020-01-01 00:25:07,2020-01-06 13:50:41@102,96,1,2020-01-02 12:59:00,2020-01-02 13:43:00@102,53,1,2020-01-01 00:32:12,2020-01-01 00:50:15@102,10,1,2020-01-01 01:37:49,2020-01-01 01:59:30@102,11,1,2020-01-01 01:54:57,2020-01-01 02:27:47@102,56,1,2020-01-02 08:28:14,2020-01-02 08:46:20@102,14,1,2020-01-01 01:47:16,2020-01-01 02:15:50@102,15,1,2020-01-07 13:05:40,2020-01-07 13:48:10@102,16,3,2020-01-01 09:29:32,2020-01-02 11:43:38@102,17,7,2020-01-01 00:22:30,2020-01-01 07:07:00@102,19,2,2020-01-01 00:24:49,2020-01-02 13:17:59@102,160,33,2020-01-01 00:12:28,2020-01-02 21:36:00@102,161,1,2020-01-07 08:03:24,2020-01-07 09:07:49@102,163,1,2020-01-01 07:56:00,2020-01-01 08:52:00@102,244,1,2020-01-01 01:07:42,2020-01-01 01:44:20@102,124,3,2020-01-01 00:43:33,2020-01-02 10:27:50@102,5,1,2020-01-01 17:53:46,2020-01-01 18:49:37@102,127,2,2020-01-01 00:11:08,2020-01-01 01:39:01@102,7,4,2020-01-01 00:32:28,2020-01-01 02:16:55@102,205,3,2020-01-01 00:06:07,2020-01-02 02:33:00@102,129,8,2020-01-01 00:06:45,2020-01-05 15:10:11@102,60,1,2020-01-01 00:10:52,2020-01-01 00:41:51@102,208,1,2020-01-01 01:26:57,2020-01-01 01:51:51@102,61,2,2020-01-01 00:46:27,2020-01-01 01:59:10@102,63,12,2020-01-01 00:21:31,2020-01-02 21:29:02@102,69,1,2020-01-01 01:38:16,2020-01-01 02:17:54@102,25,2,2020-01-01 01:11:31,2020-01-02 10:32:00@102,28,3,2020-01-01 00:18:29,2020-01-01 01:40:42@102,170,1,2020-01-02 08:10:00,2020-01-02 09:19:00@102,171,1,2020-01-02 14:01:49,2020-01-02 14:14:15@102,173,5,2020-01-01 00:22:05,2020-01-02 20:53:07@102,130,3,2020-01-02 09:39:00,2020-01-06 18:39:09@102,252,2,2020-01-01 00:12:54,2020-01-01 01:59:57@102,131,1,2020-01-02 12:27:00,2020-01-02 12:41:00@102,132,1,2020-01-01 05:21:29,2020-01-01 05:37:56@102,177,2,2020-01-01 00:22:15,2020-01-01 01:55:13@102,134,4,2020-01-01 00:20:39,2020-01-02 08:48:00@102,255,2,2020-01-01 01:52:37,2020-01-01 11:36:00@102,256,2,2020-01-01 00:53:05,2020-01-01 19:47:00@102,135,2,2020-01-01 00:09:06,2020-01-01 00:56:10@102,212,1,2020-01-01 01:31:59,2020-01-01 01:56:47@102,179,2,2020-01-01 00:35:09,2020-01-01 01:57:51@102,258,17,2020-01-01 00:09:00,2020-01-03 13:35:04@102,214,1,2020-01-01 00:56:24,2020-01-01 01:33:29@102,216,4,2020-01-01 00:52:35,2020-01-02 10:50:00@102,70,1,2020-01-01 00:28:13,2020-01-01 00:43:17@102,73,1,2020-01-02 14:46:30,2020-01-02 15:01:31@102,76,6,2020-01-01 00:25:09,2020-01-09 08:50:05@102,77,2,2020-01-01 01:21:44,2020-01-01 19:39:00@102,36,26,2020-01-01 00:23:09,2020-01-02 15:26:00@102,37,20,2020-01-01 00:05:37,2020-01-03 23:03:29@102,180,1,2020-01-02 09:44:55,2020-01-02 09:59:29@102,140,1,2020-01-01 01:40:19,2020-01-01 02:08:20@102,263,1,2020-01-01 01:31:15,2020-01-01 02:14:42@102,264,1,2020-01-08 01:45:07,2020-01-08 01:45:10@102,265,2,2020-01-01 00:13:16,2020-01-01 01:13:17@102,145,1,2020-01-01 00:37:41,2020-01-01 00:57:01@102,222,1,2020-01-01 00:58:44,2020-01-01 01:18:37@102,101,1,2020-01-02 08:26:22,2020-01-02 08:48:59@102,223,2,2020-01-01 00:46:42,2020-01-01 01:14:56@102,146,1,2020-01-01 01:35:51,2020-01-01 02:15:55@102,225,8,2020-01-01 00:24:19,2020-01-05 10:29:15@102,226,4,2020-01-01 00:09:29,2020-01-02 05:59:00@102,80,2,2020-01-01 00:34:39,2020-01-01 01:14:07@102,82,16,2020-01-01 00:24:20,2020-01-07 11:32:57@102,83,2,2020-01-01 01:58:24,2020-01-01 11:19:00@102,86,1,2020-01-08 13:14:39,2020-01-08 13:57:01",
    109: "24;145;109,22,1,2020-01-01 01:11:37,2020-01-01 01:43:43@109,44,10,2020-01-01 00:04:43,2020-01-02 09:54:07@109,23,12,2020-01-01 00:24:43,2020-01-02 09:43:31@109,67,1,2020-01-01 00:35:38,2020-01-01 01:10:39@109,172,7,2020-01-01 00:58:10,2020-01-02 14:12:41@109,251,3,2020-01-01 00:39:25,2020-01-02 11:27:11@109,176,9,2020-01-01 00:06:38,2020-01-02 14:22:53@109,132,1,2020-01-02 15:00:00,2020-01-02 15:40:00@109,210,2,2020-01-01 00:27:16,2020-01-01 02:05:43@109,156,2,2020-01-01 00:25:30,2020-01-01 16:31:54@109,214,7,2020-01-01 00:28:31,2020-01-02 10:10:32@109,115,1,2020-01-01 00:06:02,2020-01-01 00:30:29@109,118,6,2020-01-01 00:23:32,2020-01-01 09:06:01@109,14,2,2020-01-01 01:12:00,2020-01-01 01:59:29@109,187,3,2020-01-01 00:23:19,2020-01-02 12:25:40@109,1,2,2020-01-01 03:54:30,2020-01-01 06:06:00@109,265,2,2020-01-01 00:46:27,2020-01-01 02:35:56@109,221,1,2020-01-01 00:12:22,2020-01-01 00:30:18@109,144,1,2020-01-01 00:53:02,2020-01-01 01:30:02@109,5,7,2020-01-01 00:12:22,2020-01-01 01:46:47@109,204,6,2020-01-01 00:02:14,2020-01-02 11:55:27@109,6,1,2020-01-01 01:01:25,2020-01-01 01:20:59@109,107,1,2020-01-01 01:12:45,2020-01-01 01:59:40@109,84,31,2020-01-01 00:03:32,2020-01-02 10:03:07@109,21,2,2020-01-01 00:23:21,2020-01-01 01:14:04",
  };

  table_head = [
    "ID",
    "Zona de Salida",
    "Zona de Llegada",
    "Viajes Realizados",
    "Fecha inicial",
    "Fecha Final",
  ];

  constructor(props) {
    super(props);
    this.handleChanges = this.handleChanges.bind(this);
    this.state = {
      temporada: -1,
      consultas: [],
      request: [],
      table_data: [],
      selectedId: null,
      top: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedId !== prevState.selectedId) {
      this.setState({
        ...this.state,
        top: this.topData(this.state.consultas),
      });
    }
  }

  /**
   * Control para el checkbox
   * @param {} id ID del checkbox
   * @param {*} value Booleano que indica a cada checkbox si debe estar habilitado para ser seleccionado
   */

  handleChanges(id, value) {
    this.setState({
      selectedId: value === true ? id : null,
    });
  }

  /**
   * Permite crear la leyenda del grafico de barras
   * @param {*} legendBar Objeto con la informacion de la legenda del grafico de barras
   *            Se utiliza el que se declara en el state
   */
  createLegend = (legendBar) => {
    var legend = [];
    for (var i = 0; i < legendBar["names"].length; i++) {
      var type = "fa fa-circle text-" + legendBar["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(legendBar["names"][i]);
    }
    return legend;
  };

  /**
   * Permite validar el Form
   */
  getValidationState = () => {
    if (!this.state.hora_final || !this.state.hora_inicial) {
      return null;
    } else if (
      this.state.hora_final.split(":") === 3 &&
      this.state.hora_inicial.split(":") === 3
    ) {
      return "success";
    } else {
      return "error";
    }
  };

  /**
   * Renderiza cada una de las tablas con los resultado
   * @param {*} table_data Objeto con el formato de consulta del top (dado por groupData())
   */
  renderTable = (zona, data, idx) => {
    let split_data = data.split(";");
    return (
      //<zona>:<total-misma-zona>;<total>;[<datos>]@^(0..n)
      //<datos> := <zona>,<zona-llegada>,<total-zona>,<fecha-inicial>,<fecha-final>
      <Col key={`table${idx}`} md={12}>
        <Card
          title={`Analisis de viajes zonales: ${zona}`}
          category={`Total misma zona: ${split_data[0]} - Total vehiculos que parten de la zona ${split_data[1]}`}
          ctTableFullWidth
          ctTableResponsive
          content={
            <Table striped hover>
              <thead>
                <tr>
                  {this.table_head.map((prop, key) => {
                    return <th key={key}>{prop}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {split_data[2].split("@").map(function (value, idx) {
                  let values = value.split(",");
                  let row = [idx + 1].concat(values);
                  return (
                    <tr key={`Row${idx}`}>
                      {row.map((prop, key) => {
                        return <td key={`Field${key}`}>{prop}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          }
        />
      </Col>
    );
  };

  /**
   * Retorna la posicion en el arreglo de series dado un dia de la semana
   * @param {*} dayName Dia de la semana en ingles
   */
  giveBarPosition = (dayName) => {
    let dia = -1;
    switch (dayName) {
      case "Monday":
        dia = 0;
        break;
      case "Tuesday":
        dia = 1;
        break;
      case "Wednesday":
        dia = 2;
        break;
      case "Thursday":
        dia = 3;
        break;
      case "Friday":
        dia = 4;
        break;
      case "Saturday":
        dia = 5;
        break;
      case "Sunday":
        dia = 6;
        break;
      default:
        dia = 0;
        break;
    }
    return dia;
  };

  /**
   * Permite renderizar el grafico de barras con cada una de las zonas y sus datos
   * @param {*} consulta Objeto de la respuesta segun el marco de referencia.
   */
  renderBarGraph = (consulta) => {
    let top =
      this.state.selectedId !== null ? `Top ${this.state.selectedId}` : "";
    let dataBar = {
      labels: [],
      series: [[], [], [], []],
    };

    //Rellenar los datos en el objeto dataBar
    for (const [key, value] of Object.entries(consulta)) {
      // Crear la nueva etiqueta en el grafico
      dataBar.labels.push(key);
      // Agregar los datos
      value.split(";").forEach((el, idx) => {
        dataBar.series[idx].push(el);
      });
    }

    return (
      <Col key={`Col${consulta.key}`} md={12}>
        <Card
          id={`rf1Zona${consulta.key}`}
          title={`Analisis de trayectos por zonas ${top}`}
          category={`Analisis de proporcion de salidas y llegadas de taxis por zonas`}
          stats="Analisis de llegada y salida de trayectos a una misma zona o diferentes"
          statsIcon="fa fa-check"
          content={
            <div className="ct-chart">
              <ChartistGraph
                data={dataBar}
                type="Bar"
                options={optionsBar}
                responsiveOptions={responsiveBar}
              />
            </div>
          }
          legend={
            <div className="legend">{this.createLegend(this.legendBar)}</div>
          }
        />
      </Col>
    );
  };

  /**
   * Transforma la temporada a una fecha en especifico
   */

  selectData = () => {
    let date = "";
    switch (this.state.selectedId) {
      case 1:
        date = "2019-01-01 00:00:00";
        break;
      case 2:
        date = "2019-02-14 00:00:00";
        break;
      case 3:
        date = "2019-02-17 00:00:00";
        break;
      case 4:
        date = "2019-07-04 00:00:00";
        break;
      case 5:
        date = "2019-09-07 00:00:00";
        break;
      case 6:
        date = "2019-10-31 00:00:00";
        break;
      case 7:
        date = "2019-11-26 00:00:00";
        break;
      case 8:
        date = "2019-12-24 00:00:00";
        break;
      default:
        break;
    }
    return date;
  };

  /**
   * Permite agrupar los datos del requerimiento RA1 - 1 en grupos dado
   * las N zonas con mayo salida de vehiculos
   * @param {*} datos Respuesta de la consulta
   */
  topData = (datos) => {
    const n = this.state.selectedId;

    //Pasarlo a array para poder aplicar el sort
    let props = Object.keys(datos).map(function (key) {
      let value = this[key].split(";")[1];
      return {
        key: key,
        value: parseInt(value),
        data: this[key],
      };
    }, datos);

    // Ordenarlos
    props.sort(function (p1, p2) {
      return p2.value - p1.value;
    });

    // Retornar el top N
    let top = props.slice(0, n);

    // Reducir a un nuevo objeto
    let topObj = top.reduce(function (obj, prop) {
      obj[prop.key] = prop.data;
      return obj;
    }, {});

    return topObj;
  };

  /**
   * Crear consulta
   */

  submitQuery = () => {
    executeRa1_1()
      .then((res) => {
        const { request } = this.state;
        request.push(res.data);
        alert(`Se ha creado la nueva consulta con el ID: ${res.data.id}`);
        this.setState({
          ...this.state,
          request: request,
        });
      })
      .catch((err) => console.error(err));
  };

  /**
   * Recupera la consulta y agregar los datos
   */
  retrieveRequest = () => {
    let { request } = this.state;
    console.log(request);
    if (request.length === 0) {
      alert("Agregue una consulta");
      return;
    }
    retrieveData(request[0].id)
      .then((res) => {
        this.setState({
          ...this.state,
          consultas: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        const { status } = err.response;
        if (status === 206) {
          alert(`La peticion con ID: ${request[0].id} 
               se esta procesando aún. Intente mas tarde
            `);
        } else {
          console.error("Error fatal al recuperar la respuesta", err);
        }
      });
  };

  /**
   * Permite renderizar el panel de control de la aplicacion
   */
  renderControlPanel = () => {
    return (
      <Card
        statsIcon="fa fa-cog"
        title="Panel de control"
        category="Pregunta: ¿Cuál es la proporción de viajes que se hacen dentro de cada una de las zonas? ¿Cuál es la de viajes
        interzonas?"
        stats="Requerimiento Analisis #1"
        content={
          <div className="content">
            <Grid fluid>
              {/* Seccion de Checkboxes */}
              <Row>
                {this.checkBoxes.map((data, idx) => {
                  return (
                    <Col md={4} key={`colCheckBox${idx}`}>
                      <CustomCheckbox
                        selectedId={this.state.selectedId}
                        data={data}
                        handleChanges={this.handleChanges}
                      />
                    </Col>
                  );
                })}
              </Row>
              <Row>
                <Col md={6}>
                  <Button
                    bsStyle="success"
                    onClick={(ev) => {
                      ev.preventDefault();
                      this.submitQuery();
                    }}
                  >
                    Crear consulta
                  </Button>
                </Col>
                <Col md={6}>
                  <Button
                    bsStyle="warning"
                    onClick={(ev) => {
                      ev.preventDefault();
                      this.retrieveRequest();
                    }}
                  >
                    Recuperar consulta
                  </Button>
                </Col>
              </Row>
            </Grid>
          </div>
        }
      />
    );
  };

  renderAllTables = () => {
    if (this.state.top !== null) {
      return Object.keys(this.state.top).map((key, idx) => {
        return this.renderTable(key, this.state.consultas[key], idx);
      });
    } else if (this.state.consultas) {
      return Object.keys(this.state.consultas).map((key, idx) => {
        return this.renderTable(key, this.state.consultas[key], idx);
      });
    } else {
      return null;
    }
  };

  renderAllBarGraph = () => {
    if (this.state.top !== null) {      
      return this.renderBarGraph(this.state.top);
    } else if (this.state.consultas) {
      return this.renderBarGraph(this.state.consultas);
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>{this.renderControlPanel()}</Col>
            {this.renderAllBarGraph()}
          </Row>
          <Row>{this.renderAllTables()}</Row>
        </Grid>
      </div>
    );
  }
}

export default RA1_1;
