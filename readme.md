# Event Management API

A simple **Event Management application** built with **TypeScript** and **Express**, allowing users to create, read, update, and delete events. This project uses **JSON files for data storage** instead of a database, making it lightweight and easy to run.

---

## Features

- **CRUD operations** for events:
  - Create an event
  - Get all events or a single event
  - Update an event
  - Delete an event
- **JWT authentication** to secure endpoints
- **Authorization**: Only the event creator can update or delete their events
- **Input validation** using **Zod**
- **JSON-based storage** for simplicity
- **Structured TypeScript types** for better development experience

---

## Tech Stack

- **Backend:** Node.js, Express, TypeScript  
- **Validation:** Zod  
- **Authentication:** JWT  
- **Data Storage:** JSON files (`events.data.json, user.data.json`)  
- **Utilities:** UUID for unique IDs  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ranjanthapa/Event-Management-Backend-yI.git

cd Event-Management-Backend
```

2. Install dependencies:

```bash
npm i
```
3. Create a .env file with  JWT secret:
```ini
JWT_SECRET=secret key
```

## API Endpoints

### 1. User Registration

- **Method:** `POST`  
- **Endpoint:** `api/auth/signup`  
- **Description:** Register a new user and receive a JWT token.  
- **Authentication:** Not required  

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "strongpassword",
  "role": "user"
}
```
**Response:**
```json
{
    "status": "success",
    "message": "user registered successfully"
}
```


### 2. Login

- **Method:** `POST`  
- **Endpoint:** `api/auth/login`  
- **Description:** `Login an existing user and receive a JWT token`
- **Authentication:** Not required  

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "strongpassword",
}
```
**Response:**
```json
{
    "status": "success",
    "token": "jwt_token"
}
```



### 3. Get all event

- **Method:** `GET`  
- **Endpoint:** `api/events`  
- **Description:** `Get all events`
- **Authentication:** `Required  `

**Response:**
```json
{
    "events": [
        {
            "id": "evt123",
            "title": "Tech Hackathon 2025",
            "description": "A 48-hour hackathon for developers and designers.",
            "organizer": "Tech Club",
            "location": "Kathmandu University",
            "startDate": "2025-09-15T09:00:00.000Z",
            "endDate": "2025-09-17T09:00:00.000Z",
            "createdBy": 1757142389245
        },
        {
            "id": "evt123",
            "title": "Tech Hackathon 2025",
            "description": "A 48-hour hackathon for developers and designers.",
            "organizer": "Tech Club",
            "location": "Kathmandu University",
            "startDate": "2025-09-15T09:00:00.000Z",
            "endDate": "2025-09-17T09:00:00.000Z",
            "createdBy": 1757142389245
        },
        
    ]
}
```




### 4. Get event by event id

- **Method:** `GET`  
- **Endpoint:** `api/events/:id`  
- **Description:** `Get event by id`
- **Authentication:** `Required  `

**Response:**
```json
{
    "event": {
        "id": "evt123",
        "title": "Tech Hackathon 2025",
        "description": "A 48-hour hackathon for developers and designers.",
        "organizer": "Tech Club",
        "location": "Kathmandu University",
        "startDate": "2025-09-15T09:00:00.000Z",
        "endDate": "2025-09-17T09:00:00.000Z",
        "createdBy": 1757142389245
    }
}
```




### 5. Update event by event id

- **Method:** `PATCH`  
- **Endpoint:** `api/events/:id`  
- **Description:** `update event by id`
- **Authentication:** `Required  `


**Request Body:**

```json
{
    "title": "Tech Hackathon 2025 of Nepal",
}
```


**Response:**
```json
{
    "event": {
        "id": "evt123",
        "title": "Tech Hackathon 2025 of Nepal",
        "description": "A 48-hour hackathon for developers and designers.",
        "organizer": "Tech Club",
        "location": "Kathmandu University",
        "startDate": "2025-09-15T09:00:00.000Z",
        "endDate": "2025-09-17T09:00:00.000Z",
        "createdBy": 1757142389245
    }
}
```




### 6. Delete event by event id

- **Method:** `DELETE`  
- **Endpoint:** `api/events/:id`  
- **Description:** `delete event by id`
- **Authentication:** `Required  `

**Response:**

- **Status:** `204 No Content`
- **Body:** *None*






