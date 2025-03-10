# Real-World Developer Test: Chat Application with Wallet Integration

## 📌 Overview

This test is designed to evaluate a candidate's ability to build a **cross-platform chat application** using **React Native**, with **wallet integration via Privy** for token transactions. The application should work on **iOS, Android, and Web**, and allow users to **interact with an AI bot** that returns financial charts. Users should also be able to swap tokens directly within the chat interface.

### 👥 Team Collaboration

Candidates may form a team of **1 to 3 people** to complete this task.
Candidates may use the provided **boilerplate code** or create a new project from scratch.

## 🎯 Core Requirements

### 1️⃣ Chat Interface

- The chat UI should **follow the provided design**: [Link](https://www.figma.com/design/UYVcVj6XtbyE4Qf4LAE0y3/Chat-Application).
- The chat should be **similar to ChatGPT** (bubble messages, avatars, typing indicators, etc.).
- Support for **text messages, images, and emojis**.
- Users should be able to **interact with an AI bot** (explained below).

### 2️⃣ AI Bot & Interactive Charts

- Users can chat with a bot to **request financial data** (token prices, trading volume, etc.).
- The bot should respond with **dynamic charts** (candlestick, line charts, etc.).
- **Users should be able to interact** with the charts (hover to view details, change time frames, etc.).
- **Suggested APIs:** TradingView, Chart.js, Recharts, or D3.js.

### 3️⃣ Wallet Integration (Privy)

- Support **login via Privy** (Google, Email, WalletConnect, MetaMask, etc.).
- Users can **check token balances** in their wallet.
- Allow users to **buy, sell, and swap tokens** directly in the chat.
- Display **transaction history**.
- **Backend should also integrate with the wallet** to process token swaps.

### 4️⃣ Cross-Platform Deployment

- The application should be **buildable for Web, iOS, and Android**.
- **Candidates must provide installable builds** for iOS & Android for demo testing.

### 5️⃣ Architecture & Performance

- Code should be **clean, maintainable, and scalable**.
- **State Management:** Zustand / Context API.
- Compatible with **React Native Web** for browser deployment.

### 6️⃣ Advanced Task: Docker Support

- Candidates should provide a **Dockerfile** to ensure the project is easy to set up and run.
- The Docker configuration should include:
  - **Frontend container** for the React Native Web app.
  - **Backend container** (if applicable) for API services.
  - **Database container** (if using a database, e.g., PostgreSQL, MongoDB).
- **Docker Compose** is recommended for managing multiple services.

---

## 📌 Technical Requirements

### **🛠️ Tech Stack**

| **Component**          | **Technology**                          |
| ---------------------- | --------------------------------------- |
| **Frontend**           | React Native + React Native Web         |
| **State Management**   | Redux / Zustand / Context API           |
| **Auth & Wallet**      | Privy SDK                               |
| **Charting**           | TradingView API / Recharts / Chart.js   |
| **Backend** (optional) | Node.js + Express / Firebase / Supabase |
| **Blockchain API**     | Uniswap, 1inch, or PancakeSwap          |
| **Deployment**         | Expo (mobile), Vercel/Netlify (web)     |
| **Containerization**   | Docker, Docker Compose                  |

### **📡 APIs & Integrations**

1. **Privy SDK**: [https://www.privy.io/](https://www.privy.io/)
2. **Swap API**: Uniswap / 1inch / PancakeSwap
3. **Charting API**: TradingView, Recharts, D3.js
4. **File Upload:** Firebase Storage or AWS S3

---

## 📌 Evaluation Criteria

| **Aspect**                    | **Score** | **Description**                                          |
| ----------------------------- | --------- | -------------------------------------------------------- |
| **UI & UX**                   | 30        | Matches design, smooth, and responsive.                  |
| **Privy Integration**         | 20        | Login, balance check, swap token.                        |
| **AI Bot Integration**        | 20        | Bot responds with financial data and interactive charts. |
| **Chart Interaction**         | 20        | Users can interact with financial charts.                |
| **Code Quality**              | 20        | Clean, scalable, and modular code.                       |
| **Cross-Platform Deployment** | 10        | Runs smoothly on iOS, Android, and Web.                  |
| **System Architecture**       | 20        | Scalable and maintainable.                               |
| **Docker Implementation**     | 10        | Proper Docker setup for easy deployment and scaling.     |

**Total: 150 points**  
Candidates must score **at least 125 points** to pass.

---

## 📌 Deliverables

Candidates must submit:

1. **GitHub/GitLab repository** with the source code.
2. **Live web demo** (deployed on Vercel/Netlify).
3. **iOS & Android builds** (`.apk` file or TestFlight link).
4. **Installation & usage guide** (README.md).
5. **Dockerfile and Docker Compose configuration**.

---

## 📌 Suggested Implementation Plan

1. **Design the UI** → Use React Native UI libraries (RN Paper, Tailwind, etc.).
2. **Integrate Privy SDK** → Login, check balance, swap tokens.
3. **Build the AI bot** → Use OpenAI API or simple backend responses.
4. **Implement interactive charts** → Use TradingView API or Recharts.
5. **Containerize the application** → Create Dockerfile and Docker Compose setup.
6. **Build & deploy** → Expo (mobile), Vercel/Netlify (web).

---

### **📌 Need More Details?**

Feel free to ask if you need clarifications! 🚀
