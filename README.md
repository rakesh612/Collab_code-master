# Collaborative Code Editor - Fullstack App

This is a **collaborative code editor** built with real-time support, real-time chat ,multiple language execution, user authentication, and socket-based communication for live code sharing and interactions.

---


## 🛠️ Tech Stack

* **Frontend**: React + TailwindCSS + Zustand + TanStack Query + shadcn/ui
* **Backend**: Node.js + Express + JWT + MongoDB + Redis
* **Sockets**: Socket.IO (chat & room collaboration)
* **Execution Engine**:

  * Languages supported: C++, Java, Python
  * Runs inside Docker
  * Async execution with polling
* **Other Tools**: Redis (for job queues and result storage), BullMQ (for job processing)

---

## 📑 Features

### ✅ General

## 🔐 Secure User Authentication

Our application implements a robust and secure authentication mechanism combining JWTs and sessions for optimal protection.

### ✅ Features

- **JWT + Session-Based Authentication**  
  Combines stateless JWTs with server-side sessions to provide both scalability and control.

- **Token Rotation**  
  Refresh tokens are rotated with each request, minimizing the risk of long-lived token abuse.

- **Device-Level Validation**  
  Each token is tied to a hashed browser fingerprint to ensure it's used only on the issuing device.

- **Redis-Backed Token Storage**  
  Access and refresh tokens are stored securely as hashed entries in Redis for fast invalidation and tracking.

- **Global Logout with OTP Verification**  
  Users can securely log out from all active devices using a verified OTP flow.

---

This architecture ensures both usability and strong session security across all entry points.

* Survey system with role-based users (Admin, Business, User)

### 🖋️ Collaborative Editor

* Real-time code sync across clients
* Supports multiple languages (C++, Python, Java)
* Output & Input area below editor
* Run button executes via microservice
* Invite friends to a room
* Will support cursor sharing(in near Future)

### 🔌 Socket Features

* Chat server on `:5000`
* Room collaboration socket on `:5001`
* Cursor tracking (planned)

---

## ⚙️ Running Locally

### Prerequisites

* Docker
* Node.js
* Redis

### Setup

```bash
# Clone the repo
https://github.com/Mokshgnaism/Collab_code
cd collab-editor

#install the basic dependencies
npm i
#now build the whole project run these commands in the main project
npm run build
npm run start-all
#go to localhost:5001 and access your wenbsite make sure you changed the urls in frontend where it says the ip address...
```

---

## 🚀 Deployment

* Uses Docker containers for microservices(codeExecution)
* Socket servers are hosted on other ports
* CORS managed using wildcard + credentials
* Let's Encrypt can provide HTTPS certificates
* Deployed on a Google Cloud VM and configured Nginx as a reverse proxy for secure and efficient routing
  

---

## ✈ TODO

* [x] Input/Output sync via socket
* [x] Invite system UI revamp
* [ ] Cursor tracking between users
* [ ] Better user session sync on reload

---

## 📅 Timeline

* Started: June 2025
* Built in \~10 days
* Part of internship resume project

---

## ✨ Author

* Gorantla Mokshgna (IIT ISM Dhanbad CSE)

---

## ⚡ Example POST (Code Execution)

```json
{
  "roomId": "abc123",
  "language": "cpp",
  "code": "#include<iostream>\nint main(){std::cout<<\"Hello\";return 0;}",
  "input": ""
}
```

---

