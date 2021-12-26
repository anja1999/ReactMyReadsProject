# MyReads Project

MyRead app is an application for managing books that I'm interested in. 
Home page is representedby 3 shelvs :
* Currently reading
* Want to read
* Read

While every book has a menu with an option to move book from one shelf to another.

Search page allows user to search books from backend and an abilty to assign the book to desired shelf.
## 

To run the project:
* Clone the repository 
* install all project dependencies with `npm install`
* start the development server with `npm start`


## Backend Server

 Methods:
* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
