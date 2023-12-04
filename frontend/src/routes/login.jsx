export function LoginPage() {
  return (
    <section className="container">
      <div className="divisao">
        <p>Login</p>
        <div className="linha"></div>
      </div>

      <article className="form">
        <div id="box_email">
          <p>Email</p>
          <input type="text" id="email_input" />
        </div>

        <div id="box_senha">
          <p>Senha</p>
          <input type="password" id="senha_input" />
        </div>

        <div id="box_lembrar">
          <input type="checkbox" id="lembrarsenha" />
          <label htmlFor="lembrarsenha">Lembrar Senha</label>
        </div>

        <div id="box_login">
          <button id="botao_logar" type="submit">
            Login
          </button>
          <a href="#">Esqueceu a senha ?</a>
          <a href="cadastro.html">Ainda Não tem cadastro , Clique aqui !</a>
        </div>
      </article>
    </section>
  );
}
