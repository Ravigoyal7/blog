# Step 1: Use official Node.js image
FROM node:18

# Step 2: Create app directory inside container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy all files
COPY . .

# Step 5: Start the app
CMD ["node", "index.js"]
