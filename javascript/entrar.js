const logadoJSON = localStorage.getItem("usuarioLogado");
if(logadoJSON){
    window.location.href = "home.html";
}


function entrar(){
    const senhaForm = document.getElementById("senha").value;
    const emailForm = document.getElementById("email").value;

    const usuariosJSON = localStorage.getItem("usuarios");
    if(usuariosJSON){
        const usuarios = JSON.parse(usuariosJSON);
        usuarios.forEach(usuario => {
            if(usuario.email === emailForm && usuario.senha === senhaForm){
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarios));
                window.location.href = "home.html";
            }else{
                const erroSenha = document.getElementById("erro");
                erroSenha.className = 'erro';
            }
        });
    }
}