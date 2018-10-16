<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html
        ng-app="app"
        class="background">
<head>
    <!--[if IE]><!-->
    <meta
            http-equiv="X-UA-Compatible"
            content="IE=edge"/>
    <!--<![endif]-->
    <meta charset="utf-8">
    <%-- <base href="${pageContext.request.contextPath}/"> --%>

    <meta name="_csrf" content="${_csrf.token}"/>
    <meta name="_csrf_header" content="${_csrf.headerName}"/>

    <link
            rel="icon"
            href="libs/img/favicon.ico"
            type="image/x-icon">

    <!-- ESTO ES PARA REINICIAR LOS ESTILOS DEFINIDOS POR LOS EXPLORADORES -->
    <link
            rel="stylesheet"
            type="text/css"
            href="libs/styles/normalize.css"/>

    <!-- FUENTES -->
    <link
            rel="stylesheet"
            type="text/css"
            href="libs/styles/agilita.css"/>

    <link
            rel="stylesheet"
            type="text/css"
            href="libs/angularjs/ui-bootstrap/2.5.0/bootstrap.min.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="libs/angularjs/material/1.1.5/angular-material.min.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="libs/angularjs/ui-grid/4.0.3/ui-grid.min.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="libs/angularjs/ui-select/0.19.8/select.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="libs/angularjs/np-autocomplete/np-autocomplete.min.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="libs/styles/w3_stoggle_switch.css"/>
    <link
            rel="stylesheet"
            type="text/css"
            href="libs/styles/app.css"/>

    <title>{{$root.titulo}}</title>
</head>
<body style="background-color: transparent;">
<div class="hide">
    <div class="customMsgbox">
        <h1 style="text-decoration: underline;">Ocurrio un error al iniciar la aplicacion:</h1>
        <p>{{$root.msgError}}</p>
        <div class="footer">Por favor, comuniquese con el 911</div>
    </div>
</div>
<div
        class="hide"
        ng-class="$root.requesting ? 'overlay' : 'hide'">
    <div class="loader center-in-window"></div>
</div>
<div id="modelBase"></div>
<div menu></div>
<div role="main" class="body">
    <div class="container">
        <h1 class="title">{{$root.titulo}}</h1>
        <div ng-view></div>
    </div>
</div>
</body>

<script
        type="text/javascript"
        src="libs/app/funcionesExternas.js"></script>

<script
        src="http://code.jquery.com/jquery-2.1.4.min.js"
        integrity="sha256-8WqyJLuWKRBVhxXIL1jBDD7SDxU936oZkCnxQbWwJVw="
        crossorigin="anonymous"></script>

<script
        type="text/javascript"
        src="libs/angularjs/1.6.1/angular.min.js"></script>

<script
        type="text/javascript"
        src="libs/angularjs/route/1.6.1/angular-route.min.js"></script>
<script
        type="text/javascript"
        src="libs/angularjs/animate/1.6.1/angular-animate.min.js"></script>
<script
        type="text/javascript"
        src="libs/angularjs/messages/1.6.1/angular-messages.min.js"></script>
<script
        type="text/javascript"
        src="libs/angularjs/material/1.1.5/angular-material.min.js"></script>
<script
        type="text/javascript"
        src="libs/angularjs/base64/1.2.23/angular-base64.min.js"></script>
<script
        type="text/javascript"
        src="libs/angularjs/msgbox/0.1.1/angular-msgbox.js"></script>
<script
        type="text/javascript"
        src="libs/angularjs/sanitize/1.6.1/angular-sanitize.min.js"></script>
<script
        type="text/javascript"
        src="libs/angularjs/ui-select/0.19.8/select.js"></script>
<script
        type="text/javascript"
        src="libs/angularjs/aria/1.6.1/angular-aria.min.js"></script>
<script
        type="text/javascript"
        src="libs/angularjs/np-autocomplete/np-autocomplete.min.js"></script>

<script
        type="text/javascript"
        src="libs/angularjs/ui-grid/4.0.3/ui-grid.min.js"></script>
<script
        type="text/javascript"
        src="libs/angularjs/ui-grid/4.0.3/i18n/ui-grid.language.es.min.js"></script>

<script
        type="text/javascript"
        src="libs/angularjs/ui-bootstrap/2.5.0/ui-bootstrap-tpls-2.5.0.min.js"></script>

<script
        type="text/javascript"
        src="libs/app/utilsModule.js"></script>
<script
        type="text/javascript"
        src="libs/app/validationModule.js"></script>
<script
        type="text/javascript"
        src="libs/app/appModule.js"></script>
<script
        type="text/javascript"
        src="libs/app/datosUsuarioModule.js"></script>
<script
        type="text/javascript"
        src="libs/app/menuModule.js"></script>

<script
        type="text/javascript"
        src="libs/app/echoModule.js"></script>
<script
        type="text/javascript"
        src="libs/app/productoModule.js"></script>
<script
        type="text/javascript"
        src="libs/app/comboModule.js"></script>

<script
        type="text/javascript"
        src="libs/app/app.js"></script>

</html>