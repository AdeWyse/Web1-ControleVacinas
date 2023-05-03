const logadoJSON = localStorage.getItem("usuarioLogado");
const logado = JSON.parse(logadoJSON);
if(!logadoJSON){
    window.location.href = "entrar.html";
}

const inputElement = document.getElementById("comprovante");
const imageElement = document.getElementById("selectedImage");

let reader;
//Pega imagem
inputElement.addEventListener("change", (event) => {
const file = event.target.files[0];
reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
    imageElement.src = reader.result;
    imageElement.className = 'comprovanteImagem';
};
});


function cadastrarVacina(){
    const dataVacinacao = document.getElementById("dataVac").value;
    const vacinaNome = document.getElementById("vacinaNome").value;
    const doses = document.getElementsByName("dose");
    var dose = '';
    var i = 0;
    for(i = 0; i < doses.length; i++){
        if(doses[i].checked){
            dose = doses[i].value;
            break;
        }
    };
    //Ta salvando um caminho estático, dps vai salvar o caminho do firebase
    const comprovante = '/img/comprovanteVacina.jpg';
    const dataProx = document.getElementById("dataProx").value;
    var prox = dataProx;
    if(dose == 'Dose única' || dose == 'Reforço'){
        prox = 'Não há próxima dose'
    }
    const novaVacina = {
        dataVacinacao: dataVacinacao,
        vacinaNome: vacinaNome,
        dose: dose,
        comprovante: comprovante,
        dataProx: prox,
        usuario: logado[0].email
    };
    const vacinasJSON = localStorage.getItem("vacinas");
    const vacinas = vacinasJSON ? JSON.parse(vacinasJSON) : [];

    vacinas.push(novaVacina);
    localStorage.setItem("vacinas", JSON.stringify(vacinas));
}