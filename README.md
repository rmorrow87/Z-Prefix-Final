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

## Notes/TODO

- Still need to figure out how to solve the refresh problem
- Styling is ok, but navigation is still a bit wonky
- Make better comments
- Fill out explanation section before finishing

## Explanation

-