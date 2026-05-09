# Frontend Tier - Node.js Express Web Server

## Overview
This is the frontend tier for the birthday-app application. It serves a responsive web form where users can register by providing their username, email, and birthdate. The form communicates with the backend API for validation.

## Building the Docker Image

```bash
docker build -t birthday-app-frontend:latest .
```

## Running the Container

```bash
docker run -d \
  --name birthday-app-frontend \
  -e BACKEND_URL=http://birthday-app-backend:5000 \
  -p 3000:3000 \
  birthday-app-frontend:latest
```

## Connection Details

- **Host**: `localhost` (when accessing from host machine)
- **Host**: `birthday-app-frontend` (when connecting from another container on the same network)
- **Port**: `3000` (Node.js Express server)
- **URL**: `http://localhost:3000`

## Accessing the Application

Once the frontend container is running, open your web browser and navigate to:
```
http://localhost:3000
```

## Environment Variables

- `BACKEND_URL`: The URL of the backend API service
  - Default: `http://localhost:5000`
  - When using Docker network: `http://birthday-app-backend:5000`

## API Endpoints

### Health Check
- **Endpoint**: `GET /health`
- **Purpose**: Check if the frontend service is running
- **Response**:
  ```json
  {
    "status": "ok",
    "message": "Frontend service is running"
  }
  ```

### Static Files
- All files in the `public/` directory are served as static content

## Form Features

### User Input Fields
1. **Username**: Text input for user's name
2. **Email Address**: Email input with validation
3. **Date of Birth**: Date picker input

### Client-Side Features
- Responsive design that works on mobile and desktop
- Real-time form validation feedback
- Loading indicator while submitting
- Success and error message display
- Form remains open after submission (as per requirements)
- Date picker limited to at least 16 years ago

### Communication with Backend
The form sends a POST request to the backend API endpoint with the following JSON payload:
```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "birthdate": "2007-05-15"
}
```

## Backend Communication

The frontend connects to the backend API using the `BACKEND_URL` environment variable. In the HTML, the JavaScript fetches to:
```javascript
const BACKEND_API = 'http://localhost:5000/submit';
```

When running in Docker with a network, set `BACKEND_URL=http://birthday-app-backend:5000` so the frontend can communicate with the backend container.

## Network Configuration

If running containers manually, you need to be on the same Docker network. Create a network first:
```bash
docker network create birthday-app-network
```

Then run the frontend container with this network:
```bash
docker run -d \
  --name birthday-app-frontend \
  --network birthday-app-network \
  -e BACKEND_URL=http://birthday-app-backend:5000 \
  -p 3000:3000 \
  birthday-app-frontend:latest
```

## Testing the Service

### Using curl
```bash
# Health check
curl http://localhost:3000/health

# Access the web form
curl http://localhost:3000
```

### Browser Testing
1. Open `http://localhost:3000` in your web browser
2. Fill in the form with test data:
   - Username: "Test User"
   - Email: "test@example.com"
   - Birthdate: Select a date that makes the person 16+ years old
3. Click "Submit"
4. Wait for confirmation from the backend

## Dependencies

- Express 4.18.2: Web server framework

## Development

To run locally without Docker:
```bash
npm install
npm start
```

Then access at `http://localhost:3000`

## Troubleshooting

### Backend Connection Issues
If you see the error "Failed to reach the backend service", ensure:
1. The backend container is running
2. Both containers are on the same Docker network
3. The `BACKEND_URL` environment variable is set correctly
4. The backend port (5000) is accessible from the frontend container

### Port Already in Use
If port 3000 is already in use, you can map to a different port:
```bash
docker run -d \
  --name birthday-app-frontend \
  -p 8080:3000 \
  birthday-app-frontend:latest
```
Then access at `http://localhost:8080`

## Logs

To view the container logs:
```bash
docker logs birthday-app-frontend
```
