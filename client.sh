#!/bin/sh

# Set the URL of the client service
CLIENT_URL=http://client:3000  # Adjust port if needed

# Wait for the client service to be reachable
until $(curl --output /dev/null --silent --head --fail $CLIENT_URL); do
    echo "Waiting for client service to become available..."
    sleep 1
done

echo "Client service is available. Starting Nginx..."
