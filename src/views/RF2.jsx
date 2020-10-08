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
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import {    
  optionsBar,
  responsiveBar,
} from "variables/Variables.jsx";
import CustomCheckbox from "components/CustomCheckbox/CustomCheckbox";

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
      form_validated: false,
      dias: [],
      consultas_realizadas: 0,
      dataBar: {
        labels: ["Consulta #1"],
        series: [["1"], ["3"], ["5"]],
      },
      table_data: [
        {
          consulta: 1,
          data: [
            [
              "1",
              "Amarillo",
              "$36,738",
              "Hoy",
              "Chapinero",
              "Colina Campestre",
              "$12.75",
            ],
          ],
        },
        {
          consulta: 2,
          data: [
            [
              2,
              "Verde",
              "$36,738",
              "Hoy",
              "Bellavista",
              "La Riviera",
              "$12.75",
            ],
          ],
        },
      ],      
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
    console.log("Numero agregandose", number);
    console.log("Estado", add);

    const { dias } = this.state;
    if (add) {
      dias.push(number);
      this.setState({
        ...this.state,
        dias: dias
      })
    }
    else {
      dias.filter((val) => val !== number);
      this.setState({
        ...this.state,
        dias: dias
      })
    }
  }

  /**
   * Determina si el formulario del panel de control es correcto
   */
  handleSubmit() {

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
                {/* Seccion de Textfields   
                <Form noValidate validated={this.state.form_validated} onSubmit={this.handleSubmit}>
                  <Form.Row>
                    <FormGroup as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Zona de Salida</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="74"                        
                      />
                    </Form.Group>                    
                  </Form.Row>
                </Form>
                */}
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
            {this.state.table_data.map((table, key) => this.renderTable(table, key))}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RF2;
