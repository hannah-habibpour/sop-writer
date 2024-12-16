FROM node:18-alpine

WORKDIR /app

# Accept build args
ARG NEXT_PUBLIC_OPENAI_API_KEY
ARG NEXT_PUBLIC_RESEND_API_KEY

# Set them as environment variables
ENV NEXT_PUBLIC_OPENAI_API_KEY=$NEXT_PUBLIC_OPENAI_API_KEY
ENV NEXT_PUBLIC_RESEND_API_KEY=$NEXT_PUBLIC_RESEND_API_KEY

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]