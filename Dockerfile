FROM node:21

WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

RUN npm install

# Copy the rest of the files, including .env
COPY . .

# Ensure the Prisma client is generated
RUN npx prisma generate

EXPOSE 3000

# Default command to start the application
CMD ["npm", "run", "start:dev"]