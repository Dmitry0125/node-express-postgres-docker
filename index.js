const express = require('express')
const { Pool } = require('pg')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const pool = new Pool({
    user: 'postgres',
    host: 'postgres_db',
    database: 'node_api',
    password: 'postgres', // указать пароль как в pgadmin или терминале
    port: 5432 // как в pgadmin
});

pool.connect()
    .then(() => console.log('PostgreSQL connected successfully'))
    .catch(err => console.error('Error: ', err));

app.get('/', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY id DESC')
        res.json(result.rows)
    } catch(err) {
        console.error(err); // Чтобы видеть ошибку в логах Docker
        res.status(500).send('Error in data')
    }
})

app.post('/posts/add', async(req, res) => {
    const {title, anons, full_text} = req.body
    try {
        await pool.query('INSERT INTO posts (title, anons, full_text) VALUES($1, $2, $3)', [title, anons, full_text])
        res.send('Post added successfully')
    } catch(err) {
        console.error(err);
        res.status(500).send('Error adding post')
    }
})

app.delete('/posts/:id', async(req, res) => {
    const { id } = req.params
    try {
        await pool.query('DELETE FROM posts WHERE id = $1', [id])
        res.send('Post deleted successfully')
    } catch(err) {
        console.error(err);
        res.status(500).send('Error deleting post')
    }
})

app.listen(3000, () => {
    console.log('Server has started: http://localhost:3000')
})
