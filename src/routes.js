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
import UserProfile from "views/UserProfile.jsx";
import AnalisisViolencia from "views/AnalisisViolencia.jsx";
import Maps from "views/Maps.jsx";
import RF2 from "views/RF2.jsx";
import RF1 from "views/RF1.jsx";
import RA2 from "views/RA2.jsx";
import RA1_1 from "views/RA1_1.jsx";

const dashboardRoutes = [
  {
    path: "/violencia",
    name: "Analisis de violencia en Colombia",
    icon: "pe-7s-close-circle",
    component: AnalisisViolencia,
    layout: "/admin",
  },
  {
    path: "/rf1",
    name: "Req. Funcional 1",
    icon: "pe-7s-cloud-upload",
    component: RF1,
    layout: "/admin",
  },
  {
    path: "/rf2",
    name: "Req. Funcional 2",
    icon: "pe-7s-graph3",
    component: RF2,
    layout: "/admin",
  },
  {
    path: "/ra1_1",
    name: "Req. Analisis 1 - Pregunta 1",
    icon: "pe-7s-cash",
    component: RA1_1,
    layout: "/admin",
  },
  {
    path: "/ra2",
    name: "Req. Analisis 2",
    icon: "pe-7s-piggy",
    component: RA2,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin",
  },
  {
    upgrade: true,
    path: "/integrantes",
    name: "Integrantes",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin",
  },
];

export default dashboardRoutes;
