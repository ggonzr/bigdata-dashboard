/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,  
} from "react-bootstrap";

import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import geovanny from "assets/img/faces/geovanny.jpg";
import cesar from "assets/img/faces/cesar.jpg";
import alex from "assets/img/faces/alex.jpg";

class UserProfile extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>            
            <Col md={4}>
              <UserCard
                bgImage="https://cdn.aarp.net/content/dam/aarp/travel/international/2017-02/1140-1-ss-caribbean-aruba-esp.imgcache.revefbd5e33d000607a94cca359ee9ee2dd.web.900.513.jpg"
                avatar={geovanny}
                name="Geovanny González"
                userName="ggonzr"
                description={
                  <span>
                    <p/>
                    <p/>
                    Estudiante de último semestre de Ingeniería de Sistemas y Computación en la Universidad de los Andes. 
                    Me llama mucho la atención los temas relacionados con el análisis de información para la toma de decisiones en las organizaciones,
                    así como la manipulación de grandes cantidades de información para construir soluciones de aprendizaje automático. 
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <a href="https://www.linkedin.com/in/ggonzr/" target="__blank">
                        <i className="fa fa-linkedin-square" />
                      </a>
                    </Button>
                    <Button simple>
                      <a href="https://github.com/ggonzr" target="__blank">
                      <i className="fa fa-github" />
                      </a>
                    </Button>                    
                  </div>
                }
              />              
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={cesar}
                name="Cesar Vega"
                userName="CesarAVegaF-UNIANDES"
                description={
                  <span>
                    <p/>
                    <p/>
                    Hola, soy ingeniero graduado de la Escuela Colombiana de Ingeniería Julio Garavito del programa de Ingeniería De Sistemas 
                    y con estudios en Ingeniería Electrónica, con experiencia en el uso de sistemas y dispositivos programables con enfoque a 
                    robótica móvil; uso de Redes Neuronales Artificiales para clasificación de la cual cuento con una publicación académica.                     
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <a href="https://www.linkedin.com/" target="__blank">
                        <i className="fa fa-linkedin-square" />
                      </a>
                    </Button>
                    <Button simple>
                      <a href="https://github.com/CesarAVegaF-UNIANDES" target="__blank">
                      <i className="fa fa-github" />
                      </a>
                    </Button>                    
                  </div>
                }
              />              
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://upload.wikimedia.org/wikipedia/commons/4/4b/Desfile_Portela_2014_%28906185%29.jpg"
                avatar={alex}
                name="Alex Romero"
                userName="aromero45"
                description={
                  <span>
                    <p/>
                    <p/>
                    Soy Ingeniero Mecatrónico graduado desde el 2009, tengo 34 años y trabajo para una multinacional llamada Schwind Latin S.A
                    en equipos médicos y software orientado a telemedicina.
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <a href="https://www.linkedin.com/" target="__blank">
                        <i className="fa fa-linkedin-square" />
                      </a>
                    </Button>
                    <Button simple>
                      <a href="https://github.com/aromero45" target="__blank">
                      <i className="fa fa-github" />
                      </a>
                    </Button>                    
                  </div>
                }
              />              
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
