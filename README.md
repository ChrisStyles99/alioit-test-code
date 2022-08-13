# Pasos para poder correr el proyecto

## Requisitos

1. Tener instalado node y npm o yarn.
2. Tener un string para poder conectarse a MongoDB. Ej: ```mongodb://localhost:27017```

## Para correr el frontend

1. Para correr el front-end se tiene que ir a la carpeta client, con el comando ```cd client```.
2. Al hacer esto se tiene que instalar los paquetes necesarios con el comando ```npm install``` el cual instalará todos los paquetes necesarios.
3. Para correr la app de react, es necesario utilizar el comando ```npm start``` el cual iniciará la aplicación.

## Para correr el back-end

1. Ir a la carpeta server con el comando ```cd server```.
2. Instalar los paquetes necesarios utilizando el comando ```npm install``` el cual instalará los paquetes necesarios.
3. Dentro de la carpeta de server, crear un archivo .env, el cual contendrá la variable ```MONGODB_URI``` con el string de conexión para MongoDB.
4. Para iniciar la aplicación en modo desarrollo, puede utilizar el comando ```npm run dev``` el cual iniciará un servidor que se reiniciará cada vez que se haga un cambio.
5. Si no quiere utilizar ese comando, puede utilizar el comando ```npm start``` el cual iniciará el servidor.