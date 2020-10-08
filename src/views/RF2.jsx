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
import { thArray, tdArray } from "variables/Variables.jsx";
import { Card } from "components/Card/Card.jsx";
import {
  dataPie,
  legendPie, 
  optionsBar,
  responsiveBar,  
} from "variables/Variables.jsx";

class RF2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consultas_realizadas: 0,
      dataBar: {
        labels: ["Consulta #1"],
        series: [["1"], ["3"], ["5"]]
      },
      legendBar: {
        names: ["Minimo", "Promedio", "Maximo"],
        types: ["info", "danger", "warning"]
      }
    }
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
  addChartData({consultas_realizadas, dataBar}, consulta) {
    //Amarillo
    dataBar.labels.push(`Consulta #${consultas_realizadas} - Amarillo`);
    //Valor minimo
    dataBar.series[0].push(consulta.minAmarillo.split(";")[0])
    //Valor promedio
    dataBar.series[1].push(consulta.meanAmarillo)
    //Valor maximo
    dataBar.series[2].push(consulta.maxAmarillo.split(";")[0])

    //Verde
    dataBar.labels.push(`Consulta #${consultas_realizadas} - Verde`);
    //Valor minimo
    dataBar.series[0].push(consulta.minVerde.split(";")[0])
    //Valor promedio
    dataBar.series[1].push(consulta.meanVerde)
    //Valor maximo
    dataBar.series[2].push(consulta.maxVerde.split(";")[0])

    //Actualizar el estado e incrementar el contador
    consultas_realizadas++;
    this.setState({
      ...this.state,
      consultas_realizadas: consultas_realizadas,
      dataBar: dataBar
    });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>          
          <Row>
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
                  <div className="legend">{this.createLegend(this.state.legendBar)}</div>
                }
              />
            </Col>          
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>
          <Row>                      
            <Col md={12}>
              <Card
                title="Resultados de la consulta"
                category="Valores minimo, maximo y promedio para cada tipo de taxi"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
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
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RF2;
