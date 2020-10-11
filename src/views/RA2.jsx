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
  Button,
} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { optionsBar, responsiveBar, style } from "variables/Variables.jsx";
import { executeRa2, retrieveData } from "services/backend";
import CustomCheckbox from "components/CustomCheckbox/CustomCheckbox2.jsx";
import NotificationSystem from "react-notification-system";

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

  checkBoxes = [
    {number: 1, label: "Año nuevo"},
    {number: 2, label: "San Valentin"},
    {number: 3, label: "Dia del Presidente"},
    {number: 4, label: "Dia de la independencia"},
    {number: 5, label: "Dia del trabajador"},
    {number: 6, label: "Halloween"},
    {number: 7, label: "Dia de accion de gracias"},
    {number: 8, label: "Navidad"},
  ];

  constructor(props) {
    super(props);
    this.handleChanges = this.handleChanges.bind(this);
    this.state = {
      temporada: -1,
      consultas: [],
      request: [],
      table_data: [],
      selectedId: null
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      consultas: this.mockedData,
      _notificationSystem: this.refs.notificationSystem
    });
  };

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
   * Control para el checkbox
   * @param {} id ID del checkbox
   * @param {*} value Booleano que indica a cada checkbox si debe estar habilitado para ser seleccionado
   */

  handleChanges(id, value) { 
    this.setState({selectedId: value===true ? id : null})
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
    let temporada = (this.state.selectedId) ? this.checkBoxes[this.state.selectedId - 1].label : "";  
    return (
      //<año>:<verde>;<amarillo>;<fhv>;<fhfhv>
      <Col key={`table${key}`} md={12}>
        <Card
          title={`Demanda de vehiculos en la temporada: ${temporada}`}
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
    let temporada = (this.state.selectedId) ? this.checkBoxes[this.state.selectedId - 1].label : "";  
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
          title={`Temporada: ${temporada}`}
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
   * Transforma la temporada a una fecha en especifico
   */

  selectData = () => {    
    let date = "";
    switch (this.state.selectedId) {
      case 1:
        date = "2019-01-01 00:00:00"
        break;
      case 2:
        date = "2019-02-14 00:00:00"
        break;
      case 3:
        date = "2019-02-17 00:00:00"
        break;
      case 4:
        date = "2019-07-04 00:00:00"
        break;
      case 5:
        date = "2019-09-07 00:00:00"
        break;
      case 6:
        date = "2019-10-31 00:00:00"
        break;
      case 7:
        date = "2019-11-26 00:00:00"
        break;
      case 8:
        date = "2019-12-24 00:00:00"
        break;      
      default:
        break;
    }
    return date;
  };

  /**
   * Crear consulta
   */

  submitQuery = () => {
    const { selectedId } = this.state;
    if (selectedId === null) {
      this.notify("Por favor seleccione una temporada")
    }
    else {
      //Ejecutar la consulta
      const body = {
        fecha: this.selectData()
      };

      return console.log("Validado", body);

      executeRa2(body)
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
        this.setState({
          ...this.state,
          consultas: res.data,
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

  render() {
    return (
      <div className="content">
        <NotificationSystem ref="notificationSystem" style={style} />
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
