# PokeAPI Playwright Testing
Automated API testing for PokéAPI using Playwright and JavaScript.

🎯 This is a personal practice project created to reinforce and deepen my knowledge in API testing.

It simulates real-world scenarios while keeping the code clean, modular, and maintainable.

## 📦 Features
- ✅ API testing with Playwright Test and APIRequestContext

- 🌐 Multi-environment setup with .env files (dev, qa, prod)

- 📁 Organized structure to support scalability and ease of maintenance

- 🔄 Cross-platform compatibility using cross-env and dotenv

## 🚀 Requirements
- Node.js v16+

- npm or yarn

- cross-env (for Windows/Linux env file loading)

- dotenv (for environment variable support)

## 🛠️ Installation

Create the required .env files:

```
# .env.dev, .env.qa, .env.prod
BASE_URL=https://pokeapi.co/api/v2
```

## 🧪 Running Tests
Run tests using one of the following scripts, which target a specific environment and only execute the api project:

### For development
```
npm run test_api:dev
```

### For QA
```
npm run test_api:qa
```

### For production
```
npm run test_api:prod
```
Each script dynamically loads the correct BASE_URL before tests start.

## 📁 Project Structure
poke-api-playwright-testing/
├── tests/                   # API test specs
│   ├── berries.spec.js
│   └── pokemon.spec.js
├── .env.dev                 # Environment config (development)
├── .env.qa                  # Environment config (QA)
├── .env.prod                # Environment config (production)
├── playwright.config.js     # Loads BASE_URL dynamically
├── package.json             # Scripts and dependencies
└── README.md

## 🎥 Demo Video
A short demo walkthrough of the tests in action will be added here soon. Stay tuned!

👉 [Demo Video Link – Coming Soon]

## 🔁 Run it in Postman
Want to try the same test scenarios in Postman?

👉 Click here to open the Postman Collection [POKE-API Postman Practise Workspace](https://www.postman.com/cferreira89/test-pokeapi/overview)