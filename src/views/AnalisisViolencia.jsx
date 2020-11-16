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
import { executeRf1, retrieveData } from "services/backend";
import NotificationSystem from "react-notification-system";
import { violenceHashtags } from "info/hashtags";
import Tweet from "components/Tweet/tweet.jsx";

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
          this.notify(
            `Se ha creado la nueva consulta con el ID: ${res.data.id}`
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

  renderHashtags = () => {
    return (
      <Card
        statsIcon="fa fa-cog"
        title="Hashtags analizados"
        category="Hashtags seleccionados para entrenar el modelo"
        stats="Analisis basico de sentimientos"
        content={
          <div className="content">
            <Grid fluid>
              <Row>
                {violenceHashtags.map((el, idx) => {
                  return (
                    <Col key={idx} md={2}>
                      {el}
                    </Col>
                  );
                })}
              </Row>
            </Grid>
          </div>
        }
      />
    );
  };

  renderTweets = () => {
    return (
      <Col md={3}>
        <Tweet title="Title A" text="Prueba" />
      </Col>
    );
  };

  renderMetrics = () => {
    return (
      <Col md={4}>
        <Card
          statsIcon="fa fa-cog"
          title="Hashtags analizados"
          category="Hashtags seleccionados para entrenar el modelo"
          stats="Analisis basico de sentimientos"
          content={
            <img
              src="https://estaticos.miarevista.es/media/cache/1140x_thumb/uploads/images/gallery/59144d795cafe812663c986a/razonescomermanzana-int.jpg"
              alt="metricas-modelo"
              height="100"
              width="100"
            />
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
          <Row>{this.renderTweets()}</Row>
          <Row>{this.renderMetrics()}</Row>
        </Grid>
      </div>
    );
  }
}

export default AnalisisViolencia;
