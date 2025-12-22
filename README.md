# To-Do List

## Description

!! Work in Progress !!

This project demonstrates my understanding of core and more advanced React concepts, as well as serves as a practice to strengthen my skills.
It is a to-do list application where you can add and remove tasks, mark them as done or in progress, search for tasks by name, and filter them by status (done / in progress / all).

Although it may look simple, it includes many important React patterns and general web development practices.

## Tech Stack

- React.js (with use of react-query, axios, react-router-dom)
- HTML
- SCSS
- JavaScript

## Implemented

- CRUD operations
- Routing
- Uniform layout
- Clean structure
- Moduled styling
- Authorization (simulated)
- Private routes
- State managment (redux)

## Features

- Add , edit and delete tasks
- Mark tasks as done / in progress
- Search tasks by name
- Filter tasks by status
- Persistent backend (JSON-server)
- Module-based SCSS styling

## To be done

- About page
- Input validation
- UI imporvements
- Pagination for large lists

## API endpoints

- GET /to-do's fetch all tasks
- POST /to-do's create new task
- PATCH /to-do's/:id update the task
- DELETE /to-do's/:id delete the task

## Installation

1. Clone the repository `git clone https://github.com/Kozak8909/React-To-Do-List.git`
2. Run `npm i` to install the necessary dependencies

## Usage

To run the list you have to:

1. Run `json-server ./src/api/db.json --port 3030` to start the server
2. Run `npm start` to start the project

After that it is pretty intuitive. Good luck playing around!
