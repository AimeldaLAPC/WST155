# Movie Collection — WST155 Final Project

This is the Assignment 2 movie CRUD app adapted from SQLite to Neon PostgreSQL and Vercel. The original `public` UI remains; the frontend now calls `/api/movies`.

## Local setup

1. Create a Neon project and copy its **connection string**.
2. Copy `.env.example` to `.env`, replace `DATABASE_URL` with your real connection string, and keep `.env` private.
3. Run `npm install` and `npm start` from this directory.
4. Open http://localhost:3000 and add, edit, delete, and reload a movie. The database table is created automatically.

## GitHub and Vercel

Create a GitHub repository, upload the project contents, and confirm `.env` and `node_modules` were not uploaded. In Vercel import this repository, choose **Other** framework and root directory `/`, then add `DATABASE_URL` in Environment Variables with the Neon connection string as its value. Deploy and check all CRUD operations at the deployed site. If you add or change the variable after deployment, redeploy.

Submit the GitHub repository URL and the Vercel working site URL.

## Endpoints

- `GET /api/movies`
- `POST /api/movies` with JSON `{ "title": "Example", "genre": "Drama", "year": 2020 }`
- `PUT /api/movies/:id` with the same JSON fields
- `DELETE /api/movies/:id`

The uploaded SQLite `movies.db` is excluded. Existing movie rows do not transfer automatically; re-enter them or migrate them separately.
