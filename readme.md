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
```

#### Search Mitzvotby Description

- **URL:** `/api/mitzvot/search`
- **Method:** `GET`
- ** Query parameters:** q (required): The query string to search in the description.
- **Description:** Searches for mitzvot by description..

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
```

#### Search Mitzvot by Source

- **URL:** `/api/mitzvot/source`
- **Method:** `GET`
- ** Query parameters:** source (required): The query string to search in the source.
- **Description:** Searches for mitzvot by source.

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
```

#### Random part from the Tanakh

- **URL:** `/api/tanakh/random`
- **Method:** `GET`
- **Description:** Provides a random section from the Tanakh, alongisde the book it comes from.

#### Response
```json
    {
      "book": "Lamentations",
      "line": "חשב יהוה להשחית חומת בת ציון נטה קו לא השיב ידו מבלע ויאבל חל וחומה יחדו אמללו"
    }
```
