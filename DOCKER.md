# Docker Deployment Guide for Allure TestOps MCP Server

This guide explains how to build, publish, and use the Allure TestOps MCP server as a Docker container.

## Prerequisites

- Docker installed (Docker Desktop or Docker Engine)
- Docker Hub account (for publishing)
- Allure TestOps instance with API access
- API token from Allure TestOps

## Building the Docker Image

The Dockerfile uses a multi-stage build process to create an optimized production image:
- **Build stage**: Compiles TypeScript code
- **Production stage**: Contains only runtime dependencies and compiled code

### Build Locally

```bash
docker build -t allure-testops-mcp:latest .
```

### Build with Version Tag

```bash
docker build -t allure-testops-mcp:1.0.0 -t allure-testops-mcp:latest .
```

## Publishing to Docker Hub

### 1. Log in to Docker Hub

```bash
docker login
```

Enter your Docker Hub username and password when prompted.

### 2. Tag the Image

Replace `YOUR_DOCKERHUB_USERNAME` with your actual Docker Hub username:

```bash
docker tag allure-testops-mcp:latest YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest
docker tag allure-testops-mcp:latest YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:1.0.0
```

### 3. Push to Docker Hub

```bash
docker push YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest
docker push YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:1.0.0
```

### Complete Build and Push Script

Create a `build-and-push.sh` script:

```bash
#!/bin/bash

# Configuration
DOCKERHUB_USERNAME="YOUR_DOCKERHUB_USERNAME"
IMAGE_NAME="allure-testops-mcp"
VERSION="1.0.0"

# Build the image
echo "Building Docker image..."
docker build -t ${IMAGE_NAME}:${VERSION} -t ${IMAGE_NAME}:latest .

# Tag for Docker Hub
echo "Tagging image for Docker Hub..."
docker tag ${IMAGE_NAME}:${VERSION} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION}
docker tag ${IMAGE_NAME}:latest ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest

# Push to Docker Hub
echo "Pushing to Docker Hub..."
docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION}
docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest

echo "Done! Image available at: ${DOCKERHUB_USERNAME}/${IMAGE_NAME}"
```

Make it executable and run:

```bash
chmod +x build-and-push.sh
./build-and-push.sh
```

## Running the Container

### Using Docker Run

#### Basic Usage

```bash
docker run -i \
  -e ALLURE_TESTOPS_URL=https://your-allure-instance.com \
  -e ALLURE_TOKEN=your-api-token \
  -e PROJECT_ID=1 \
  YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest
```

#### Run in Background

```bash
docker run -d --name allure-mcp -i \
  -e ALLURE_TESTOPS_URL=https://your-allure-instance.com \
  -e ALLURE_TOKEN=your-api-token \
  -e PROJECT_ID=1 \
  --restart unless-stopped \
  YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest
```

### Using Docker Compose

Update the `docker-compose.yml` file to use your published image:

```yaml
version: '3.8'

services:
  allure-testops-mcp:
    image: YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest
    container_name: allure-testops-mcp
    environment:
      - ALLURE_TESTOPS_URL=${ALLURE_TESTOPS_URL:-https://allure-testops.labs.jb.gg}
      - ALLURE_TOKEN=${ALLURE_TOKEN}
      - PROJECT_ID=${PROJECT_ID}
    restart: unless-stopped
    stdin_open: true
    tty: true
```

Create a `.env` file in the same directory:

```bash
ALLURE_TESTOPS_URL=https://your-allure-instance.com
ALLURE_TOKEN=your-api-token-here
PROJECT_ID=1
```

Run with Docker Compose:

```bash
docker-compose up -d
```

## Configuring MCP Clients

### Claude Desktop (Docker Container)

Add to your MCP client configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "allure-testops": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "ALLURE_TESTOPS_URL=https://your-allure-instance.com",
        "-e",
        "ALLURE_TOKEN=your-api-token",
        "-e",
        "PROJECT_ID=1",
        "YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest"
      ]
    }
  }
}
```

### Using Environment Variables from Host

If you prefer to keep credentials in a `.env` file on the host:

```json
{
  "mcpServers": {
    "allure-testops": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--env-file",
        "/path/to/your/.env",
        "YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest"
      ]
    }
  }
}
```

Create `.env` file with:

```bash
ALLURE_TESTOPS_URL=https://your-allure-instance.com
ALLURE_TOKEN=your-api-token-here
PROJECT_ID=1
```

### Using Docker Compose Service

If running as a Docker Compose service, you can connect to it directly:

```json
{
  "mcpServers": {
    "allure-testops": {
      "command": "docker",
      "args": [
        "exec",
        "-i",
        "allure-testops-mcp",
        "node",
        "dist/index.js"
      ]
    }
  }
}
```

Note: The container must be running before starting the MCP client.

## Verifying the Image

### Test the Container

```bash
# Run interactively
docker run -i \
  -e ALLURE_TESTOPS_URL=https://your-instance.com \
  -e ALLURE_TOKEN=your-token \
  -e PROJECT_ID=1 \
  YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest
```

You should see:
```
Allure TestOps MCP Server running on stdio
```

### Check Image Size

```bash
docker images YOUR_DOCKERHUB_USERNAME/allure-testops-mcp
```

### Inspect Image Layers

```bash
docker history YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest
```

## Troubleshooting

### Container Exits Immediately

Make sure to use the `-i` flag (interactive mode) as the MCP server uses stdio for communication.

### Authentication Errors

Verify your environment variables:
```bash
docker run --rm \
  -e ALLURE_TESTOPS_URL=https://your-instance.com \
  -e ALLURE_TOKEN=your-token \
  -e PROJECT_ID=1 \
  YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest \
  node -e "console.log(process.env.ALLURE_TESTOPS_URL)"
```

### View Container Logs

```bash
docker logs allure-testops-mcp
```

### Interactive Shell for Debugging

```bash
docker run -it --rm \
  -e ALLURE_TESTOPS_URL=https://your-instance.com \
  -e ALLURE_TOKEN=your-token \
  -e PROJECT_ID=1 \
  YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest \
  sh
```

## Security Best Practices

1. **Never commit credentials**: Keep `.env` files in `.gitignore`
2. **Use secrets management**: For production, use Docker secrets or vault solutions
3. **Scan images**: Regularly scan for vulnerabilities
   ```bash
   docker scan YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest
   ```
4. **Keep images updated**: Rebuild regularly to get security updates
5. **Use specific tags**: Avoid relying on `:latest` in production

## Updating the Image

When you make changes to the code:

```bash
# Rebuild
docker build -t YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:1.1.0 .

# Tag as latest
docker tag YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:1.1.0 \
           YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest

# Push both tags
docker push YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:1.1.0
docker push YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest
```

## Multi-Architecture Builds (Optional)

To support multiple platforms (amd64, arm64):

```bash
# Create builder
docker buildx create --name multiarch --use

# Build and push for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 \
  -t YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest \
  -t YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:1.0.0 \
  --push .
```

## Client Deployment Examples

### Deploy on Multiple Machines

1. Push image to Docker Hub (once)
2. On each client machine:

```bash
# Pull the image
docker pull YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest

# Create .env file with credentials
cat > .env << EOF
ALLURE_TESTOPS_URL=https://your-instance.com
ALLURE_TOKEN=your-token
PROJECT_ID=1
EOF

# Configure MCP client (Claude Desktop, etc.)
# Use the docker command with --env-file flag
```

### Automated Deployment Script

Create `deploy-client.sh`:

```bash
#!/bin/bash

# Pull latest image
docker pull YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest

# Stop and remove old container if exists
docker stop allure-mcp 2>/dev/null || true
docker rm allure-mcp 2>/dev/null || true

# Run new container
docker run -d --name allure-mcp -i \
  --env-file .env \
  --restart unless-stopped \
  YOUR_DOCKERHUB_USERNAME/allure-testops-mcp:latest

echo "Allure TestOps MCP server deployed successfully"
```

## Support

For issues or questions:
- Check the main README.md for usage details
- Review Docker logs: `docker logs allure-testops-mcp`
- Verify environment variables are set correctly
- Ensure Allure TestOps instance is accessible from the container
