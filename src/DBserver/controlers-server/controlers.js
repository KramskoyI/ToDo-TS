const db = require('../db');

class Controller {
  async get(req, res) {
    try {
      const todos = await db.query(`SELECT * FROM "todo" ORDER BY "id"`);
      return res.json(todos.rows);
    } catch (error) {
      res.json(error);
    }
  }

  async post(req, res) {
    try {
      const { text } = req.body;
      const todo = await db.query(`INSERT INTO "todo" ("text", "completed") VALUES ($1, $2) RETURNING *`, [text, false])
      const todos = await db.query(`SELECT * FROM "todo" ORDER BY "id"`);
      return res.json(todos.rows);
    } catch (error) {
      res.json(error);
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (id !== '0') {
        const todo = await db.query(`DELETE FROM "todo" WHERE "id" = $1`, [id]);
        const todos = await db.query(`SELECT * FROM "todo" ORDER BY "id"`);
        return res.json(todos.rows);
      } else {
        const todo = await db.query(`DELETE FROM "todo" WHERE "completed" = $1`, [true]);
        const todos = await db.query(`SELECT * FROM "todo" ORDER BY "id"`);
        return res.json(todos.rows);
      }
    } catch (error) {
      res.json(error);
    }
  }

  async put(req, res) {
    try {
      const { text, completed } = req.body;
      const id = req.params.id;
      const status = JSON.stringify(completed);
      if( text ){
        const todo = await db.query(
          `UPDATE "todo"
                SET "text" = $1
                WHERE "id" = $2;`,
          [text, id]);
        const todos = await db.query(`SELECT * FROM "todo" ORDER BY "id"`);
        return res.json(todos.rows);
      }
      if( status ){
        const todo = await db.query(
          `UPDATE "todo"
          SET "completed" = $1
          WHERE "id" = $2`, [completed, id]);
        const todos = await db.query(`SELECT * FROM "todo" ORDER BY "id"`);
        return res.json(todos.rows);
      }
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new Controller();
