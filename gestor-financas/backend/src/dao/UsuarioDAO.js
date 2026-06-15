const db = require('../config/database');

class UsuarioDAO {
  async criar(usuario) {
    const [result] = await db.execute(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [usuario.nome, usuario.email, usuario.senha]
    );

    return { id: result.insertId, ...usuario, senha: undefined };
  }

  async buscarPorEmail(email) {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0] || null;
  }

  async buscarPorId(id) {
    const [rows] = await db.execute(
      'SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }
}

module.exports = new UsuarioDAO();
