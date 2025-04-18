# Virtual Tours API

This project consists of two APIs designed to work together for virtual tours:
1. **Mock Server API**: Provides mock data for virtual tours.
2. **Google Street View API**: Consumes the mock data and generates Google Street View URLs.

Both APIs are built using Node.js and Express, and they run in Docker containers.

---

## Project Structure

```
mockserver
├── mockserver-api
│   ├── src
│   │   ├── app.js               # Entry point for the mock server
│   │   ├── data
│   │   │   └── mockData.json    # Mock data for virtual tours
│   ├── Dockerfile               # Dockerfile for the mock server
│   ├── package.json             # npm configuration file
│   ├── .dockerignore            # Files to ignore when building the Docker image
│   └── README.md                # Documentation
├── google-streetview-api
│   ├── src
│   │   └── app.js               # Entry point for the Google Street View API
│   ├── Dockerfile               # Dockerfile for the Street View API
│   ├── package.json             # npm configuration file
│   ├── .env                     # Environment variables (e.g., Google API key)
│   └── .dockerignore            # Files to ignore when building the Docker image
```

---

## Prerequisites

- Docker installed on your machine.
- A valid **Google API Key** with access to the Google Street View API.

---

## Setting Up the APIs

### 1. **Create a Docker Network**
To allow the two APIs to communicate, create a Docker network:
```bash
docker network create mock-network
```

---

### 2. **Mock Server API**

#### Build the Docker Image
Navigate to the `mockserver-api` directory and build the Docker image:
```bash
docker build -t mockserver-api ./mockserver-api
```

#### Run the Docker Container
Run the container on the `mock-network`:
```bash
docker run --rm -d --name mockserver --network mock-network -p 3000:3000 mockserver-api
```

#### Test the Mock Server
Access the mock server at:
```
http://localhost:3000/api/mockdata
```

---

### 3. **Google Street View API**

#### Add Your Google API Key
Create a `.env` file in the `google-streetview-api` directory with the following content:
```
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
```

#### Build the Docker Image
Navigate to the `google-streetview-api` directory and build the Docker image:
```bash
docker build -t google-streetview-api ./google-streetview-api
```

#### Run the Docker Container
Run the container on the `mock-network` and pass the `.env` file:
```bash
docker run --rm -d --name streetview --network mock-network -p 4000:4000 --env-file .env google-streetview-api
```

#### Test the Google Street View API
Access the Street View API at:
```
http://localhost:4000/api/streetview/1
```
Replace `1` with the ID of the location you want to view.

---

## Example Workflow

1. Start both containers as described above.
2. Access the mock server to view available locations:
   ```
   http://localhost:3000/api/mockdata
   ```
3. Use the Google Street View API to generate a Street View URL for a specific location:
   ```
   http://localhost:4000/api/streetview/1
   ```

---

## Troubleshooting

- **Mock Server Not Found**: Ensure both containers are on the same Docker network (`mock-network`).
- **Google API Key Issues**: Verify that your API key is valid and has access to the Google Street View API.
- **Rebuild Containers**: If you make changes to the code, rebuild the Docker images.

---

## License

This project is licensed under the MIT License.