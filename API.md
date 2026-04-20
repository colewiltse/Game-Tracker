# API Documentation

The purpose of this document is to clearly identify and document all api endpoints that are a part of my backend.

Please note that the api uses token authentication. Whenever making an authenticated api request, make sure to include your access token in your request. In Postman, this should be in authorization section where `Bearer token` should be selected. Furthermore, all requests require you to be logged in except for `POST /user` and `/api` to allow new users to create accounts and log in. (Also, consoles/ and genres/ allow unauthorized requests as they simply fetch the lists of consoles and genres respectively)

## Accounts

### /user

**POST** - Requires `email` and `password`. Creates an account with the specified fields in the body.

### /user/info

**GET** - Returns the `id`, `email`, and hashed `password` fields of the currently logged in user.

**PUT/PATCH** - Updates the `email` and/or `password` fields for the currently logged in user, as specified in the body of the request.

**DELETE** - Removes the currently logged in user from the database. (Currently unavailable in deployed project.)

### /super/users

**GET** - Returns the user info for all users stored on the database. Note that this is only accessible to superusers and in unavailable in the deployed code as super users can only be added manualy in the terminal.

## Games

### /games

**GET** - Returns all of the games associated with the currently logged in user. This endpoint allows users to filter and modify the results of the returned games with the following query parameters as follows:

console - can select a console from the list of console codes in the backend found in `backend/gametracker/games/models.py`

genre - can select a genre from the list of console codes in the backend found in `backend/gametracker/games/models.py`

search - can search for a specific keyword among the title and description of games

ordering - can reorder the returned games in the specified ordering. Such fields that can be used to specify the ordering are `'title', 'console', 'created', 'release_year'`

**POST** - Given the specified fields, create a video game associated with the currently loggend in user. Below are all of the different fields used in the body (Note that `created` and `owner` are automatically added so they should not be included in the request. Also, `release_year` and `box_art` are optional.):

`created = DateTimeField(auto_now_add=True)`

`title = CharField(max_length=50)`

`console = CharField(max_length=30, choices=CONSOLES)`

`release_year = PositiveIntegerField(`
    `validators=[`
        `MinValueValidator(1950),`
        `MaxValueValidator(datetime.date.today().year)`
    `],`
    `blank=True,`
    `null=True`
`)`

`genre = CharField(max_length=30, choices=GAME_GENRES)`

`description = CharField(max_length=200)`

`owner = ForeignKey('accounts.GameTrackerUser', on_delete=models.CASCADE)`

`box_art = ImageField(upload_to='game_pics/', blank=True, null=True)`


### games/`<int:pk>`/

**GET** - Return the information about the game with the specified id, only if the game is associated with the logged in user

**PUT/PATCH** - Updates the attributes of the game as specified by the fields in the body.

**DELETE** - Deletes the current game, only if associated with the currently logged in user.

### consoles/

**GET** - Returns all of the consoles as listend in `backend/gametracker/games/models.py`

### genres/

**GET** - Returns all of the genres as listend in `backend/gametracker/games/models.py`
