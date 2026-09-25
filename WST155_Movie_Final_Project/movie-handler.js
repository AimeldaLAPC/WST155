const { initDb } = require('./db');

async function movieHandler(req, res) {
  try {
    const sql = await initDb();
    const idValue = req.query?.id;
    const id = Number(idValue);
    if (idValue !== undefined && (!Number.isSafeInteger(id) || id <= 0)) {
      return res.status(400).json({ message: 'Invalid movie ID.' });
    }

    if (req.method === 'GET' && idValue === undefined) {
      return res.json(await sql`SELECT id, title, genre, year FROM movies ORDER BY id DESC`);
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      if ((req.method === 'POST' && idValue !== undefined) || (req.method === 'PUT' && idValue === undefined)) {
        return res.status(405).json({ message: 'Method not allowed.' });
      }
      const { title, genre, year } = req.body || {};
      if (typeof title !== 'string' || !title.trim() || typeof genre !== 'string' || !genre.trim() ||
          !Number.isInteger(year) || year < 1888 || year > 2100) {
        return res.status(400).json({ message: 'Title, genre, and a valid year are required.' });
      }
      if (req.method === 'POST') {
        const rows = await sql`INSERT INTO movies (title, genre, year) VALUES (${title.trim()}, ${genre.trim()}, ${year}) RETURNING id, title, genre, year`;
        return res.status(201).json(rows[0]);
      }
      const rows = await sql`UPDATE movies SET title = ${title.trim()}, genre = ${genre.trim()}, year = ${year} WHERE id = ${id} RETURNING id, title, genre, year`;
      return rows.length ? res.json(rows[0]) : res.status(404).json({ message: 'Movie not found.' });
    }
    if (req.method === 'DELETE' && idValue !== undefined) {
      const rows = await sql`DELETE FROM movies WHERE id = ${id} RETURNING id`;
      return rows.length ? res.json({ message: 'Movie deleted successfully.' }) : res.status(404).json({ message: 'Movie not found.' });
    }
    res.status(405).json({ message: 'Method not allowed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error. Check DATABASE_URL and try again.' });
  }
}

module.exports = movieHandler;
