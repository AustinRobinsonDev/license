# License Manager with Redux

## About this app
* Uses redux with react-redux and react-thunk to manage state
* Uses a node express server and express-validator for validation and handling api calls
* Uses axios to make api calls 
* All the user and license data is saved to mongoDB atlas
* Page routing is handled with react-router-dom v6 
* Uses JWT authentication and bcrypt for password hashing
* PrivateRoute for auth routes and config for global variables

## Scripts
* In main directory run "npm run dev" to run client on port:3000 and server on port:5000

### Todo
* Make "are you sure?" modal before license delete
* Set up private route "profile" page
* Set up private route "license details" page
* Add document upload functionality with FilePond
* Increase amount of data in each license 
* Add tests
* Fix "Has documents" field not populating on edit click

