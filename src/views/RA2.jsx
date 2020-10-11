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
import { optionsBar, responsiveBar } from "variables/Variables.jsx";
import { executeRf1, retrieveData } from "services/backend";

class RA2 extends Component {
  //Variables estaticas
  legendBar = {    
    names: [
      "Verde",
      "Amarillo",
      "FHV",
      "FHFHV",      
    ],
    types: [
      "info",
      "danger",
      "warning",
      "primary",      
    ],
  };

  mockedData = {    
    2020: "235;254;123;678",
    2019: "235;254;123;678",
    2018: "235;254;123;678",
  };

  table_head = ["ID", "Año", "Verde", "Amarillo", "FHV", "FHFHV"];

  constructor(props) {
    super(props);
    this.state = {
      temporada: -1,
      consultas: [],
      request: [],
      table_data: [],
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      consultas: this.mockedData,
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
  renderTable = (table_data, key) => {
    console.info("Table Content", table_data);
    return (
      //<año>:<verde>;<amarillo>;<fhv>;<fhfhv>
      <Col key={`table${key}`} md={12}>
        <Card
          title={`Demanda de vehiculos en determinada temporada`}
          category="Análisis de demanda de vehiculos por temporada especial del año"
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
                {Object.keys(table_data).map(function (key, idx) {
                  console.info("Object", this)
                  let values = this[key].split(";");
                  let row = [idx + 1, key].concat(values); 
                  return (
                    <tr key={key}>
                      {row.map((prop, key) => {
                        return <td key={key}>{prop}</td>;
                      })}
                    </tr>
                  );
                }, table_data)}
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
          title={`Temporada`}
          category={`Analisis de demanda por temporada de los vehiculos`}
          stats="Analisis de temporada de solicitud de vehiculos en NYC"
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
      alert("Por favor ingrese adecuadamente la hora");
    } else if (hora_final.length === 0 || hora_final.split(":").length !== 3) {
      alert("Por favor ingrese adecuadamente la hora");
    } else {
      return console.log("Validado");
      let body = {
        horaInicio: hora_inicial,
        horaFin: hora_final,
      };

      //Ejecutar la consulta
      executeRf1(body)
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
      alert("Agregue una consulta");
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
        <Grid fluid>
          <Row>
            <Col>{this.renderControlPanel()}</Col>
            {this.state.consultas ? this.renderBarGraph(this.state.consultas) : null}
          </Row>
          <Row>
            {this.state.consultas ? this.renderTable(this.state.consultas) : null}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RA2;
