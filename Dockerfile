FROM node:16-stretch-slim 

# Create and set working directory for image
RUN mkdir /app
WORKDIR /app

# Copy package.json and package-lock.json to allow using cached packages
COPY package*.json ./

# Added for bcrypt support
# RUN apt-get update && apt-get install install -y --virtual builds-deps build-base python
# RUN apk --no-cache add --virtual builds-deps build-base python

# Install node dependencies
RUN npm install

# Copy source files to working directory
COPY . .

EXPOSE 5000

# Define command for starting app process
CMD ["/usr/local/bin/npm", "start"]