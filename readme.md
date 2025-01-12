# Mitzvot API

This project facilitates the searching through the 613 mitzvot & sections of the Tanakh, AI summaries for daily Mitzvot completion, and more.

Accessible at: https://web-production-aae7.up.railway.app/

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

#### Response:
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

### Search Mitzvot by Description

- **URL:** `/api/mitzvot/search`
- **Method:** `GET`
- ** Query parameters:** q (required): The query string to search in the description.
- **Description:** Searches for mitzvot by description..

#### Response:
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

### Search Mitzvot by Source

- **URL:** `/api/mitzvot/source`
- **Method:** `GET`
- ** Query parameters:** source (required): The query string to search in the source.
- **Description:** Searches for mitzvot by source.

#### Response:
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

### Random part from the Tanakh

- **URL:** `/api/tanakh/random`
- **Method:** `GET`
- **Description:** Provides a random section from the Tanakh, alongisde the book it comes from.

#### Response:
```json
    {
      "book": "Lamentations",
      "line": "חשב יהוה להשחית חומת בת ציון נטה קו לא השיב ידו מבלע ויאבל חל וחומה יחדו אמללו"
    }
```
### Random part from the Tanakh (ENGLISH)

- **URL:** `/api/tanakh/random/english`
- **Method:** `GET`
- **Description:** Provides a random section from the Tanakh, alongisde the book it comes from, this time with English included.

#### Response:
```json
    {
        "book": "Judges",
        "line": "והיה בבקר כזרח השמש תשכים ופשטת על העיר והנה הוא והעם אשר אתו יצאים אליך ועשית לו כאשר תמצא ידך",
        "english": "And there was the east cattle the sun and simplified on the city and here he and the people with whom he will come to you and you did to him when you find your hand"
    }
```

### AI Mitzvot summary for the day.

- **URL:** `/api/mitzvot/ai`
- **Method:** `GET`
- **Description:** Based on an explanation of the activities you have completed in a day, Google Gemini AI will act as a Rabbi and return the list of Mitzvot completed (if any), in a JSON format.

#### Input (JSON request body):
```json
    {
        "prompt": "Said the Shema"
    }
```

#### Response:
```json
    {
        "mitzvotForToday": ["Shema"],
        "mitzvotCount": 1
    }
```
