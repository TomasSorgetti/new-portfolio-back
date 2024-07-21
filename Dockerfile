# Usa una imagen base de Node.js
FROM node:18

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el contenido de src al directorio de trabajo en el contenedor
COPY src ./src

# Define el comando por defecto para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]
