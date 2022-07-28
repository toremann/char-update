# char-update

Track and upload PVP ratings for all your characters to mongoDB

# requirements

mongodb
server to run node app

# howto

add .env file with mongodb uri in project folder

example:

`MONGO_URI=mongodb+srv://username:password@some.url.mongodb.net/?retryWrites=true&w=majority`

update variables in app.js

`const player = "Playername"`
`const server = "Server"`
`const apiURL = "https://check-pvp.fr/api/characters/eu/"`
