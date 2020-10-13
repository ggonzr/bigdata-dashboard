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
import {
  Grid,
  Row,
  Col,
  Table,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button,
} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { optionsBar, responsiveBar, style } from "variables/Variables.jsx";
import { executeRf1, retrieveData } from "services/backend";
import NotificationSystem from "react-notification-system";

class RF1 extends Component {
  //Variables estaticas
  legendBar = {
    names: [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ],
    types: [
      "info",
      "danger",
      "warning",
      "primary",
      "success",
      "info",
      "default",
    ],
  };

  mockedData = {
    1: "76;FHV,Thursday,1: 1@FHV,Monday,1: 1@GREEN,Thursday,1: 1@GREEN,Monday,1: 1@YELLOW,Thursday,1: 1@YELLOW,Monday,1: 1@FVFHV,Thursday,1: 1@FVFHV,Monday,1: 1",
    2: "25;FHV,Thursday,2: 21@FHV,Monday,2: 4",
    3: "3;FHV,Thursday,3: 1@FHV,Monday,3: 2",
  };

  table_head = ["ID", "Tipo", "Dia", "Vehiculos"];

  constructor(props) {
    super(props);
    this.groupDataRf1 = this.groupDataRf1.bind(this);
    this.state = {
      n: 3,
      hora_inicial: "",
      hora_final: "",
      consultas: [],
      request: [],
      table_data: [],
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,      
      _notificationSystem: this.refs.notificationSystem
    });
  }

  notify = (message) => {
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-info" />,
      message: (
        <div>
          {message}
        </div>
      ),
      level: "info",
      position: "tr",
      autoDismiss: 15
    });
  };  

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
  renderTable = (table_data, key) => {
    console.info("Table Content", table_data);
    return (
      <Col key={`table${key}`} md={12}>
        <Card
          title={`Top ${key + 1} - Zona ${table_data.key}`}
          category="Zonas con mayor solicitud de taxis en un rango de horas determinado"
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
                {table_data.data.map((prop, key) => {
                  let kv = prop.split(":");
                  let vSplit = kv[0].split(",");
                  let rData = [key + 1, vSplit[0], vSplit[1], kv[1]];
                  return (
                    <tr key={key}>
                      {rData.map((prop, key) => {
                        return <td key={key}>{prop}</td>;
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
   * @param {*} zona Objeto de la respuesta segun el marco de referencia
   */
  renderBarGraph = ({ key, value, data }) => {
    let dataBar = {
      labels: [],
      series: [[], [], [], [], [], [], []],
    };

    let parseByClass = {};
    for (let el of data) {
      let values = el.split(":");
      let keys = values[0].split(",");
      let newValue = {
        dia: this.giveBarPosition(keys[1].trim()),
        cantidad: values[1].trim(),
      };
      if (parseByClass[keys[0].trim()]) {
        // Si la llave esta definida
        parseByClass[keys[0].trim()].push(newValue);
      } else {
        let parsedValues = [];
        parsedValues.push(newValue);
        parseByClass[keys[0].trim()] = parsedValues;
      }
    }

    //Rellenar los datos en el objeto dataBar
    for (const [key, value] of Object.entries(parseByClass)) {
      // Crear la nueva etiqueta en el grafico
      dataBar.labels.push(key);
      // Agregar los datos
      for (const obj of value) {
        dataBar.series[obj.dia].push(obj.cantidad);
      }
    }

    return (
      <Col key={`Col${key}`} md={12}>
        <Card
          id={`rf1Zona${key}`}
          title={`Zona #${key}`}
          category={`Vehiculos que salieron de la zona: ${value}`}
          stats="Top de salida de vehiculos por zonas en NYC"
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
   * Crear consulta
   */

  submitQuery = () => {
    const { hora_inicial, hora_final } = this.state;
    if (hora_inicial.length === 0 || hora_inicial.split(":").length !== 3) {
      this.notify("Por favor ingrese adecuadamente la hora");
    } else if (hora_final.length === 0 || hora_final.split(":").length !== 3) {
      this.notify("Por favor ingrese adecuadamente la hora");
    } else {
      console.log("Validado");
      let body = {
        horaInicio: hora_inicial,
        horaFin: hora_final,
      };

      //Ejecutar la consulta
      executeRf1(body)
        .then((res) => {
          const { request } = this.state;
          request.push(res.data);
          this.notify(`Se ha creado la nueva consulta con el ID: ${res.data.id}`);
          this.setState({
            ...this.state,
            request: request,
          });
        })
        .catch((err) => console.error(err));
    }
  };

  /**
   * Permite agrupar los datos del requerimiento RF1 en grupos dado
   * las N zonas mas grandes
   * @param {*} datos Respuesta de la consulta
   */
  groupDataRf1 = (datos) => {
    const { n } = this.state;

    //Pasarlo a array para poder aplicar el sort
    let props = Object.keys(datos).map(function (key) {
      let value = this[key].split(";");
      return {
        key: key,
        value: parseInt(value),
        data: value[1].split("@"),
      };
    }, datos);

    // Ordenarlos
    props.sort(function (p1, p2) {
      return p2.value - p1.value;
    });

    // Retornar el top N
    let top = props.slice(0, n);
    return top;
  };

  /**
   * Recupera la consulta y agregar los datos
   */
  retrieveRequest = () => {
    let { request } = this.state;
    console.log(request);
    if (request.length === 0) {
      this.notify("Agregue una consulta");
      return;
    }
    retrieveData(request[0].id)
      .then((res) => {
        const groupData = this.groupDataRf1(res.data);
        this.setState({
          ...this.state,
          consultas: groupData,
        });
      })
      .catch((err) => {
        console.error(err);
        const { status } = err.response;
        if (status === 206) {
          this.notify(`La peticion con ID: ${request[0].id} 
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
        category="Seleccion de parametros"
        stats="Requerimiento funcional #1"
        content={
          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={6}>
                  <form>
                    <FormGroup
                      controlId="formBasicText"
                      validationState={this.getValidationState()}
                    >
                      <ControlLabel>Hora Inicial</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Hora Inicial"
                        onChange={(ev) =>
                          this.setState({
                            ...this.state,
                            hora_inicial: ev.target.value,
                          })
                        }
                      />
                      <FormControl.Feedback />
                      <HelpBlock>HH:mm:ss</HelpBlock>
                    </FormGroup>
                  </form>
                </Col>
                <Col md={6}>
                  <form>
                    <FormGroup validationState={this.getValidationState()}>
                      <ControlLabel>Hora final</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Hora final"
                        onChange={(ev) =>
                          this.setState({
                            ...this.state,
                            hora_final: ev.target.value,
                          })
                        }
                      />
                      <FormControl.Feedback />
                      <HelpBlock>HH:mm:ss</HelpBlock>
                    </FormGroup>
                  </form>
                </Col>
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

  render() {
    return (
      <div className="content">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Grid fluid>
          <Row>
            <Col>{this.renderControlPanel()}</Col>
            {this.state.consultas.map((req) => this.renderBarGraph(req))}
          </Row>
          <Row>
            {this.state.consultas.map((table, key) =>
              this.renderTable(table, key)
            )}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RF1;
