# Chatbot Admin Panel
You can create and configure your own chatbot.

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only for first time)
npm i

# Configure .env file
VITE_SERVER_ENDPOINT=https://6997-194-87-199-27.ngrok-free.app/
VITE_CHAT_ENDPOINT=https://chat.obsolete.live

VITE_GOOGLE_OAUTH_CLIENT_ID="YOUR OWN CLIENT ID"
VITE_GOOGLE_OAUTH_CLIENT_SECRET="YOUR OWN CLIENT SECRET"

VITE_FACEBOOK_OAUTH_APP_ID="YOUR OWN APP ID"

# Serve at localhost:5173
npm run dev

# Build for production in the dist/ directory
npm run build
```