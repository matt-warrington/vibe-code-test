# vibe-code-test

A simple Node.js and React demo project.

## Getting Started

Install server dependencies:

```
npm install
```

Install client dependencies:

```
npm install --prefix client
```

Build the React app:

```
npm run build --prefix client
```

Start the server:

```
npm start
```

The Express server runs on port `3001` and serves the built React application.

## Chat Feature

A basic chat is available on the right side of the page. Messages are stored in memory on the server.
To try it out in development:

1. Start the server as described above.
2. Open the app in your browser and use the input on the right to send messages.
