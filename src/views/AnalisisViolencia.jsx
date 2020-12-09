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
import {
  Grid,
  Row,
  Col,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button,
} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { style } from "variables/Variables.jsx";
import { execute_predict, retrieveData } from "services/backend";
import NotificationSystem from "react-notification-system";
import { violenceHashtags } from "info/hashtags";
import dataset from "assets/img/elastic/kibana.png";
import matrix from "assets/img/model/matrix.png";
import acc from "assets/img/model/acc.png";


class AnalisisViolencia extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      _notificationSystem: this.refs.notificationSystem,
    });
  }

  notify = (message) => {
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-info" />,
      message: <div>{message}</div>,
      level: "info",
      position: "tr",
      autoDismiss: 15,
    });
  };

  /**
   * Crear consulta
   */

  submitQuery = () => {
    const { hora_inicial } = this.state;
    if (hora_inicial === undefined) {
      this.notify("Por favor ingrese la frase a analizar");    
    } 
    else if (hora_inicial.length === 0) {
      this.notify("Por favor ingrese la frase a analizar");    
    }
    else {
      console.log("Validado");
      let body = {
        text: hora_inicial,        
      };

      //Ejecutar la consulta
      execute_predict(body)
        .then((res) => {
          const { request } = this.state;          
          this.notify(
            `Clasificacion: ${res.data.label} \n
             Puntaje: ${res.data.score}
            `
          );
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
        category="Ingrese la frase a análizar"
        stats="Analisis basico de sentimientos"
        content={
          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <form>
                    <FormGroup
                      controlId="formBasicText"
                      validationState={this.getValidationState()}
                    >
                      <ControlLabel>Texto a analizar</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Por favor escriba una frase para predecir"
                        onChange={(ev) =>
                          this.setState({
                            ...this.state,
                            hora_inicial: ev.target.value,
                          })
                        }
                      />
                      <FormControl.Feedback />
                      <HelpBlock>Por favor escriba una frase para predecir</HelpBlock>
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
              </Row>
            </Grid>
          </div>
        }
      />
    );
  };

  renderHashtags = () => {
    return (
      <Card
        statsIcon="fa fa-cog"
        title="Dashboard de resultados"
        category="Credenciales de acceso"
        stats="Analisis Semantico"
        content={
          <div className="content">
            <Grid fluid>
              <Row>
                <p>
                  Por favor acceda al siguiente enlace para acceder
                  a ElasticSearch
                </p>
                <a 
                  href="https://cloud.elastic.co/login?redirectTo=%2Fhome"
                  target="_blank"
                >
                  Inicio de sesión ElasticSearch
                </a>
                <h2>
                  Credenciales de acceso
                </h2>
                <p>
                  Por favor utilice la opción de inicio de sesión con Google
                  e ingrese con la siguiente cuenta.
                </p>
                <p><b>Correo: </b> bigdata07.uniandes.2020@gmail.com</p>
                <p><b>Clave: </b> $BigData07$</p>
              </Row>
            </Grid>
          </div>
        }
      />
    );
  };

  renderTweets = () => {
    return (
      <Card
        statsIcon="fa fa-cog"
        title="Panel de control"
        category="Ingrese la frase a análizar"
        stats="Analisis basico de sentimientos"
        content={
          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <form>
                    <FormGroup
                      controlId="formBasicText"
                      validationState={() => {
                        return this.state.hora_inicial.length > 0
                      }}
                    >
                      <ControlLabel>Texto a analizar</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Por favor escriba una frase para predecir"
                        onChange={(ev) =>
                          this.setState({
                            ...this.state,
                            hora_inicial: ev.target.value,
                          })
                        }
                      />
                      <FormControl.Feedback />
                      <HelpBlock>Por favor escriba una frase para predecir</HelpBlock>
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
              </Row>
            </Grid>
          </div>
        }
      />
    );
  };

  renderMetrics = () => {
    return (
      <Col md={12}>        
        <Card
          statsIcon="fa fa-cog"
          title="Visualizaciones disponibles"
          category="Acceso e interacción con las visualizaciones"
          stats="Analisis Semantico"
          content={
            <div className="content">
            <p>
              Se deja disponible un tablero de control el cual permite
              visualizar las preguntas realizadas e interactuar dinamicamente
              con la consulta que se desee realizar. Asimismo en la sección de grafos
              está disponible una visualización con los aportes de los usuarios mas experimentados
              con respecto a los temas que el usuario seleccione dinamicamente.

              Para acceder a ellos acceda a <b>Kibana</b> y seleccione la opción <b>Dashboard </b> 
              o <b>Graph</b> respectivamente.
            </p>
            <img
              src={dataset}
              alt="metricas-modelo"              
              height="100%"
              width="100%"
            />
            </div>
          }
        />        
      </Col>      
    );
  };

  render() {
    return (
      <div className="content">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Grid fluid>          
          <Row>
            <Col>{this.renderHashtags()}</Col>
          </Row>          
          <Row>{this.renderMetrics()}</Row>
        </Grid>
      </div>
    );
  }
}

export default AnalisisViolencia;
