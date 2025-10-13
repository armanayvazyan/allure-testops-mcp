#!/bin/bash

# Configuration - UPDATE THESE VALUES
DOCKERHUB_USERNAME="${DOCKERHUB_USERNAME:-yourusername}"
IMAGE_NAME="allure-testops-mcp"
VERSION="${VERSION:-1.0.0}"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if DOCKERHUB_USERNAME is set
if [ "$DOCKERHUB_USERNAME" = "yourusername" ]; then
    print_warning "DOCKERHUB_USERNAME not set. Please set it:"
    echo "  export DOCKERHUB_USERNAME=your-dockerhub-username"
    echo "  or edit this script to set it directly"
    exit 1
fi

print_info "Building Docker image..."
print_info "Image: ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION}"

# Build the image
if docker build -t ${IMAGE_NAME}:${VERSION} -t ${IMAGE_NAME}:latest .; then
    print_info "Build successful!"
else
    print_error "Build failed!"
    exit 1
fi

# Tag for Docker Hub
print_info "Tagging image for Docker Hub..."
docker tag ${IMAGE_NAME}:${VERSION} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION}
docker tag ${IMAGE_NAME}:latest ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest

# Ask if user wants to push
echo ""
read -p "Do you want to push to Docker Hub? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Check if logged in to Docker Hub
    if ! docker info | grep -q "Username: ${DOCKERHUB_USERNAME}"; then
        print_warning "Not logged in to Docker Hub. Attempting login..."
        if ! docker login; then
            print_error "Login failed. Please run 'docker login' manually."
            exit 1
        fi
    fi

    # Push to Docker Hub
    print_info "Pushing to Docker Hub..."
    if docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION} && \
       docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest; then
        print_info "Push successful!"
        echo ""
        print_info "Image available at:"
        echo "  docker pull ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION}"
        echo "  docker pull ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
    else
        print_error "Push failed!"
        exit 1
    fi
else
    print_info "Skipping push to Docker Hub."
    print_info "Local images built successfully:"
    echo "  ${IMAGE_NAME}:${VERSION}"
    echo "  ${IMAGE_NAME}:latest"
fi

# Show image size
echo ""
print_info "Image details:"
docker images | grep -E "REPOSITORY|${IMAGE_NAME}"

print_info "Done!"
