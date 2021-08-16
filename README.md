# dogtame

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


--- Descripción del proyecto

El proyecto se llama Dogtame, es una aplicación web que como objetivo busca abrir un espacio para que las personas puedan adoptar o dar en adopción cuatro tipo de mascotas: perros, gatos, roedores y aves. El tipo de usuarios a que apunta son personas que respetan y aman a los animales quienes pueden estar interesados en adoptar un nuevo miembro o dar en adopción. 

---Guía de estilos:

La guía de estilos principales del proyecto es base a BootstrapVue, se utilizan componentes de librería. 

---Guía de instalación del proyecto: 

Para la instalación de este proyecto será necesario trabajar con Cloud Functions para la recopilación de usuarios e imágenes que han de subir los mismos. 
Se utilizará Webpack.

El deployment de Dogtame ha sido realizado con Docker y Heroku. 
Para ello, utilicé Docker para crear una imagen única y después registrarlo con Heroku. 

Registro a container 
```
heroku container:login
```

Construcción de Dockerfile en un directorio para hacer push a Docker image. 
```
heroku container:push web
```
Para finalizar el Deploy de la imagen.
``` 
heroku container:release web
```

--- Rutas de acceso: 

https://dogtame.herokuapp.com/
