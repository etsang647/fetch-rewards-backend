# Fetch Rewards Coding Exercise - Backend Software Engineering

## Steps to build and run server

### Requirements
- [Node.js](https://nodejs.org/)

### Install dependencies
```bash
npm install
```

### Start server
```bash
npm start # hosted at http://localhost:3001/
```

## Routes

### POST /transactions

Accepts requests with body of type:

```json
{
  "payer": string,
  "points": integer,
  "timestamp": date
}
```

Creates a new transaction that is saved locally and returns the new transaction as JSON.

Example response:
```json
{
    "payer": "DANNON",
    "points": 1000,
    "timestamp": "2020-11-02T14:00:00Z",
    "id": 0
}
```

### POST /spend

Accepts requests with body of type:

```json
{
  "points": integer
}
```

Subtracts the requested amount of points from current transactions from oldest to newest, and returns a JSON list of total points subtracted by payer.

Example response:
```json
[
  { "payer": "DANNON", "points": -100 },
  { "payer": "UNILEVER", "points": -200 },
  { "payer": "MILLER COORS", "points": -4700 }
]
```

### GET /points

Returns all payer point balances as JSON in the form:

```json
{
  "companyName1": 1000,
  "companyName2": 2000
}
```

Example response:
```json
{
  "DANNON": 1100,
  "UNILEVER": 200,
  "MILLER COORS": 10000
}
```

## Possible Improvements
- add input validation for request bodies
  - at the moment, the application assumes properly formatted requests
- use more meaningful HTTP response codes
  - right now the application only sends error 400 for any requests that the server could not complete
    - regardless if the request was well formatted or not
- improve sorting performance
  - instead of sorting transactions after every new transaction
    - O(n log n) worst case
  - can use a bisection algorithm to find insertion point, then insert
    - O(n) worst case

