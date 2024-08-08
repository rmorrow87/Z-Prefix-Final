# Inventory Management System

This app is a simple inventory management system built using the PERN stack (PostgreSQL, Express, React, Node.js) and entirely in VS code.

## Description

This tool provides users with the ability to:
- Register new accounts
- Log in to existing accounts
- Add, view, edit, and delete items from their account's inventory
- View all items in from all users in the overall inventory
- See which user added each item
- View individual item pages for those items with longer descriptions

## Features

- User authentication (register, login, logout)
- Full CRUD operations for the inventory management
- Different views, navigation, and functionality for registered users and for visitors
- On-page and in-place item modification (name, quantity, and description)

## Technologies Used

- Frontend: React, CSS, HTML
- Backend: express.js, knex.js, Docker
- Database: PostgreSQL

## Setup and Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
  - /server/: npm install
  - /client/: npm install
4. Set up the database using Docker
  - [parent directory]/: docker-compose up -d
5. Perform database migrations:
  - /server/: npx knex migrate:latest
6. Start the server:
  - /server/: npm start
7. In a separate terminal, start the client:
  - /client/: npm start
8. Using a Google Chrome browser, navigate to `http://localhost:3000`

## Usage

- Register a new account or log in with an existing one
- View, edit, or delete your items
- Add new items to your inventory
- Toggle between viewing all items and just your own items
- Logout of your account

## Notes

There is still a bug with the logout function that I could not quite solve. I can't tell if it's a logal storage issue, or if I needed to add a separate route, or if it was something that had to do with the browser, or something I hadn't considered. While I did struggle for a while with styling, I did have some time after finally getting everything to be a button and laid out in a grid, etc. Nevertheless, it was not enough to stomp that particular bug.

The bug, specifically, is that a user will still be able to access their inventory after logging out. They cannot edit those items but they can still swap between all items and their items despite being not logged in. Of note, if the view one of the items either in their inventory or the overall inventory, when they click the 'Back to List' button, they will be properly returned to the homepage displaying all items added by all users and will not have access to their inventory any longer.