function criarConta(){
    const senha = document.getElementById("senha").value;
    const senhaRep = document.getElementById("senhaRep").value;


    if(checarSenha(senha, senhaRep)){
        const nome = document.getElementById("nome").value;
        const genero = document.getElementById("generos").value;
        const dataNascimento = document.getElementById("dataNasc").value;
        const email = document.getElementById("email").value;

        const usuario = {
            nome: nome,
            genero: genero,
            email: email,
            senha: senha
        };

        const usuariosJSON = localStorage.getItem("usuarios");
        const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}


function checarSenha(senha, senhaRep){
    const erroSenha = document.getElementById("erroSenha");

    if(senha === senhaRep){
        erroSenha.className = 'escondido';
        return true
    }else{
        erroSenha.className = 'erro';
        return false;
    }
}