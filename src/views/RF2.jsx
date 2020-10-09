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
  MenuItem,
  DropdownButton,
  Button
} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { optionsBar, responsiveBar } from "variables/Variables.jsx";
import CustomCheckbox from "components/CustomCheckbox/CustomCheckbox";
import { executeRf2 } from "services/rf2";

class RF2 extends Component {
  //Variables estaticas
  legendBar = {
    names: ["Minimo", "Promedio", "Maximo"],
    types: ["info", "danger", "warning"],
  };

  table_head = [
    "ID",
    "Tipo",
    "Total",
    "Fecha",
    "Zona de Ida",
    "Zona de Llegada",
    "Promedio",
  ];

  constructor(props) {
    super(props);
    this.addRemoveDay = this.addRemoveDay.bind(this);
    this.state = {      
      dias: [],
      consultas_realizadas: 0,
      dataBar: {
        labels: [],
        series: [],
      },
      table_data: [],
    };
  }

  /**
   * Permite crear la leyenda del grafico de barras
   * @param {*} legendBar Objeto con la informacion de la legenda del grafico de barras
   *            Se utiliza el que se declara en el state
   */
  createLegend(legendBar) {
    var legend = [];
    for (var i = 0; i < legendBar["names"].length; i++) {
      var type = "fa fa-circle text-" + legendBar["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(legendBar["names"][i]);
    }
    return legend;
  }

  /**
   * Permite agregar un nuevo dato al grafico de barras
   * @param {*} state Estado del componente, desagrega los siguientes datos:
   *            consultas_realizadas: Numero de consultas agregadas, tuplas en la grafica
   *            dataBar: Objetos con los datos del grafico
   *            consulta: Resultados de la consulta, Response
   */
  addChartData({ consultas_realizadas, dataBar }, consulta) {
    //Amarillo
    dataBar.labels.push(`Consulta #${consultas_realizadas} - Amarillo`);
    //Valor minimo
    dataBar.series[0].push(consulta.minAmarillo.split(";")[0]);
    //Valor promedio
    dataBar.series[1].push(consulta.meanAmarillo);
    //Valor maximo
    dataBar.series[2].push(consulta.maxAmarillo.split(";")[0]);

    //Verde
    dataBar.labels.push(`Consulta #${consultas_realizadas} - Verde`);
    //Valor minimo
    dataBar.series[0].push(consulta.minVerde.split(";")[0]);
    //Valor promedio
    dataBar.series[1].push(consulta.meanVerde);
    //Valor maximo
    dataBar.series[2].push(consulta.maxVerde.split(";")[0]);

    //Actualizar el estado e incrementar el contador
    consultas_realizadas++;
    this.setState({
      ...this.state,
      consultas_realizadas: consultas_realizadas,
      dataBar: dataBar,
    });
  }

  /**
   * Permite añadir un resultado para que sea renderizado a forma de tabla
   * @param {*} consulta Response de la consulta
   * @param {*} consultas_realizadas Numero de consultas realizadas, des-estructurada del objeto state
   */
  addResultTable({ consultas_realizadas, table_data }, consulta) {
    let filas = [];
    let data = consulta.minAmarillo.split(";");
    //Minimo amarillo
    filas.push([
      1,
      "Minimo Amarillo",
      data[0],
      data[1],
      data[2],
      data[3],
      consulta.meanAmarillo,
    ]);
    //Maximo amarillo
    data = consulta.maxAmarillo.split(";");
    filas.push([
      2,
      "Maximo Amarillo",
      data[0],
      data[1],
      data[2],
      data[3],
      consulta.meanAmarillo,
    ]);
    //Minimo Verde
    data = consulta.minVerde.split(";");
    filas.push([
      3,
      "Maximo Amarillo",
      data[0],
      data[1],
      data[2],
      data[3],
      consulta.meanVerde,
    ]);
    //Maximo Verde
    data = consulta.maxVerde.split(";");
    filas.push([
      4,
      "Maximo Amarillo",
      data[0],
      data[1],
      data[2],
      data[3],
      consulta.meanVerde,
    ]);

    //Actualizar las tablas
    table_data.push({
      consulta: consultas_realizadas,
      data: filas,
    });

    //Actualizar el estado
    this.setState({
      ...this.state,
      table_data: table_data,
    });
  }

  /**
   * Permite añadir o remover un dia para los parametros segun el checkbox
   * @param {*} number Numero del dia de la semana 1 como Domingo 7 como Sabado
   * @param {*} add True si se desea agregar el numero, false para eliminarlo
   */
  addRemoveDay(number, add) {
    let { dias } = this.state;
    if (add) {
      dias.push(number);
      this.setState({
        ...this.state,
        dias: dias,
      });
    } else {
      dias = dias.filter((el) => {
        if (el !== number) {
          return el;
        }        
      });
      this.setState({
        ...this.state,
        dias: dias,
      });
    }
  }

  /**
   * Permite validar el Form
   */
  getValidationState() {
    if (!this.state.zona_salida || !this.state.zona_llegada) {
      return null;
    } else if (
      this.state.zona_salida > 0 &&
      this.state.zona_salida < 264 &&
      this.state.zona_llegada > 0 &&
      this.state.zona_llegada < 264
    ) {
      return "success";
    } else {
      return "error";
    }
  }

  /**
   * Agregar mes de consulta
   * @param {*} month Mes de consulta
   */
  addMonth(month) {
    this.setState({
      ...this.state,
      month: month,
    });
  }

  /**
   * Renderiza cada una de las tablas con los resultado
   * @param {*} table_data Objeto con el numero de consulta y las filas
   */
  renderTable(table_data, key) {
    return (
      <Col key={key} md={12}>
        <Card
          title={`Resultados de la consulta #${table_data.consulta}`}
          category="Valores minimo, maximo y promedio para cada tipo de taxi"
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
                  return (
                    <tr key={key}>
                      {prop.map((prop, key) => {
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
  }

  /**
   * Permite renderizar el grafico de barras de la aplicacion
   */
  renderBarGraph() {
    return (
      <Col md={8}>
        <Card
          id="rf2Times"
          title="Requerimiento Funcional #2"
          category="Valores minimo, maximo y promedio de viajes en una zona determinada"
          stats="Tiempos de respuesta de la consulta"
          statsIcon="fa fa-check"
          content={
            <div className="ct-chart">
              <ChartistGraph
                data={this.state.dataBar}
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
  }

  /**
   * Crear consulta
   */
  
  submitQuery() {    
    if (this.state.dias.length === 0) {
      alert("Por favor seleccione al menos un dia");      
    }
    else if (this.state.month === undefined) {
      alert("Por favor seleccione un mes");            
    }
    else if (this.state.zona_llegada === undefined) {
      alert("Por favor determine una zona de llegada");
    }
    else if (this.state.zona_salida === undefined) {
      alert("Por favor determine una zona de salida");
    }
    else {
      let dias = "";      
      for (let i = 0; i < this.state.dias.length; i++) {
        dias += `${this.state.dias[i]};`;
      }      
      dias = (this.state.dias.length === 1) ? dias : dias.slice(0, -1);
      let zonas = `${this.state.zona_salida};${this.state.zona_llegada}`;
      let mes = parseInt(this.state.month)
      const params = {
        dias: dias,
        zonas: zonas,
        mes: mes
      };

      //Actualizar datos
      executeRf2(params)
      .then((res) => {
        this.addChartData(this.state, res.data);
        this.addResultTable(this.state, res.data);
      })
      .catch((err) => console.error(err));
    }
  }

  /**
   * Permite renderizar el panel de control de la aplicacion
   */
  renderControlPanel() {
    return (
      <Col md={4}>
        <Card
          statsIcon="fa fa-cog"
          title="Panel de control"
          category="Seleccion de parametros"
          stats="Requerimiento funcional #2"
          content={
            <div className="content">
              <label>Seleccion de dias</label>
              <Grid fluid>
                {/* Seccion de Checkboxes */}
                <Row>
                  <Col md={4}>
                    <CustomCheckbox
                      number={1}
                      label={"Domingo"}
                      addNumber={this.addRemoveDay}
                    />
                  </Col>
                  <Col md={4}>
                    <CustomCheckbox
                      number={2}
                      label={"Lunes"}
                      addNumber={this.addRemoveDay}
                    />
                  </Col>
                  <Col md={4}>
                    <CustomCheckbox
                      number={3}
                      label={"Martes"}
                      addNumber={this.addRemoveDay}
                    />
                  </Col>
                  <Col md={4}>
                    <CustomCheckbox
                      number={4}
                      label={"Miercoles"}
                      addNumber={this.addRemoveDay}
                    />
                  </Col>
                  <Col md={4}>
                    <CustomCheckbox
                      number={5}
                      label={"Jueves"}
                      addNumber={this.addRemoveDay}
                    />
                  </Col>
                  <Col md={4}>
                    <CustomCheckbox
                      number={6}
                      label={"Viernes"}
                      addNumber={this.addRemoveDay}
                    />
                  </Col>
                  <Col md={4}>
                    <CustomCheckbox
                      number={7}
                      label={"Sabado"}
                      addNumber={this.addRemoveDay}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <form>
                      <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                      >
                        <ControlLabel>Zona Salida</ControlLabel>
                        <FormControl
                          type="number"
                          placeholder="Zona de salida"
                          onChange={(ev) =>
                            this.setState({
                              ...this.state,
                              zona_salida: ev.target.value,
                            })
                          }
                        />
                        <FormControl.Feedback />
                        <HelpBlock>1 - 263</HelpBlock>
                      </FormGroup>
                    </form>
                  </Col>
                  <Col md={6}>
                    <form>
                      <FormGroup                        
                        validationState={this.getValidationState()}
                      >
                        <ControlLabel>Zona Llegada</ControlLabel>
                        <FormControl
                          type="number"
                          placeholder="Zona de llegada"
                          onChange={(ev) =>
                            this.setState({
                              ...this.state,
                              zona_llegada: ev.target.value,
                            })
                          }
                        />
                        <FormControl.Feedback />
                        <HelpBlock>1 - 263</HelpBlock>
                      </FormGroup>
                    </form>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <DropdownButton   
                      bsStyle="info"                   
                      title={"Mes"}
                      key={2409}
                      id={`dropdown-basic-${2409}`}
                    >
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(0)}>
                        Enero
                      </MenuItem>
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(1)}>
                        Febrero
                      </MenuItem>
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(2)}>
                        Marzo
                      </MenuItem>
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(3)}>
                        Abril
                      </MenuItem>
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(4)}>
                        Mayo
                      </MenuItem>
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(5)}>
                        Junio
                      </MenuItem>
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(6)}>
                        Julio
                      </MenuItem>
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(7)}>
                        Agosto
                      </MenuItem>
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(8)}>
                        Septiembre
                      </MenuItem>
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(9)}>
                        Octubre
                      </MenuItem>
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(10)}>
                        Noviembre
                      </MenuItem>
                      <MenuItem eventKey={0} onSelect={() => this.addMonth(11)}>
                        Diciembre
                      </MenuItem>                      
                    </DropdownButton>
                  </Col>
                  <Col md={8}>
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
                </Row>
              </Grid>
            </div>
          }
        />
      </Col>
    );
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            {this.renderBarGraph()}
            {this.renderControlPanel()}
          </Row>
          <Row>
            {this.state.table_data.map((table, key) =>
              this.renderTable(table, key)
            )}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RF2;
