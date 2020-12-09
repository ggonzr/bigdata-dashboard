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

const dashboardRoutes = [
  {
    path: "/analisis",
    name: "Analisis Semantico e Indexacion",
    icon: "pe-7s-info",
    component: AnalisisViolencia,
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
