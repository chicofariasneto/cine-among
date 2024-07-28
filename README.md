# cine-among

Discord app to create polls of random movies by Genre and collected from TMDB Api.

- The app has two functions that work by schedule:
  - First of all is to collect the movies by Genre and create a Poll on a specific Chat;
  - And finally, when the poll finish (12 hours), the bot will check the winner and save on db, after this, the bot clear the chat;

### How to run
TODO explain

### env
```dotenv
DB_HOST=localhost
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
TMDB_URL=https://api.themoviedb.org/3
TMDB_TOKEN=tmdb_token
DS_TOKEN=discord_token
DS_CHANNEL_ID=discord_channel_id
```

### Refactor options?
- It's necessary to rewrite the methods and review the responsibilities of the ClientDiscord.ts 
