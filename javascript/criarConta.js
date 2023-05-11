import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


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

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("usuarioLogado", user);
            window.location.href = "index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
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


