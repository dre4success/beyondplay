These consists of 2 projects, the backend and the frontend.

### Running the backend 
- Install the packages 
```
npm install
```
- There's a `.env.example` file, simply convert it to a `.env` file and add your `JWT_SECRET` there.
- Run the backend
```
npm run dev
```
- The app is available here
```
http://localhost:4000
```

The backend has stitched together 2 graphql apis,
the starwars graphql api `https://swapi-graphql.netlify.app/.netlify/functions/index`, and countries graphql api. `https://countries.trevorblades.com/`

An sqlite is used as temporary datastore.

### Running the frontend.
- Check out into the `frontend` directory and install the packages.
```
npm install
```
- run the frontend app
```
npm start
```
- The app is available here
```
http://localhost:3000
```
Once opened, you can view the `continents` and the `countries` under them.
You can also view starwars film details but you'd need to login or register. 

