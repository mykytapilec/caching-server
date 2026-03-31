# Caching Proxy Server

Simple caching proxy server built with **Node.js** and **TypeScript**.
It forwards requests to a target API and caches successful responses in memory.

---

## Features

* Proxy requests to external API
* In-memory caching with TTL (60 seconds)
* Cache hit / miss logging
* Error handling (500, 404, etc.)
* Configurable via environment variables

---

## Setup

1. Clone the repo:

```bash
git clone https://github.com/mykytapilec/caching-server.git
cd caching-server
```

2. Install dependencies:

```bash
npm install
```

3. Run in development:

```bash
ORIGIN=https://jsonplaceholder.typicode.com PORT=3000 npx ts-node src/index.ts
```

Server will be available at: `http://localhost:3000`

---

## Usage

### Example Request

```bash
curl -i http://localhost:3000/todos/1
```

### Example Response

```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

---

## Cache Behavior

* First request → **Cache miss** (data fetched from origin)
* Repeated request → **Cache hit** (served from memory)
* Cache TTL: **60 seconds**

---

## Testing

```bash
# Cache miss
curl -i http://localhost:3000/todos/1

# Cache hit
curl -i http://localhost:3000/todos/1

# Non-existent route (404)
curl -i http://localhost:3000/non-existent-path
```

---

## Project Structure

```
src/
├─ cache/
│  └─ cacheStore.ts
├─ cli/
│  └─ index.ts
├─ server/
│  └─ createServer.ts
└─ index.ts
```

---

## Environment Variables

| Variable | Description         | Default / Example                    |
| -------- | ------------------- | ------------------------------------ |
| PORT     | Server port         | 3000                                 |
| ORIGIN   | Target API base URL | https://jsonplaceholder.typicode.com |

---

## Notes

* Uses in-memory cache (not persistent)
* Only successful responses (status 200–299) are cached
* Errors from origin (e.g. 404) are not cached
* Suitable for learning and small projects

---

## Project link

https://roadmap.sh/projects/caching-server
