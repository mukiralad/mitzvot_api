# Mitzvot API

This is a simple API to access and search the 613 mitzvot.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

The server will start on port 3000.

## API Endpoints

### Get All Mitzvot

- **URL:** `/api/mitzvot/all`
- **Method:** `GET`
- **Description:** Returns all mitzvot.

#### Response
```json
[
    {
        "number": 1,
        "description": "To know there is a God.",
        "source": "Exodus 20:2"
    },
    ...
]