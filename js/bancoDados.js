
// verficcar se o array de objetos está vazio
if (!localStorage.getItem("Clientes")){
    localStorage.setItem("Clientes", "[]");
}
window.onload=inserirNaTabela; // carregar a tabela com os usuários ao carregar a página

// função para cadastrar novos usuarios
function cadastrarNovoUsuario(){
    let cadastros= JSON.parse(localStorage.getItem("Clientes"));
    let dados={};

    dados.nome=document.getElementById("nome").value;
    dados.sobrenome=document.getElementById("sobrenome").value;
    dados.email=document.getElementById("email").value;
    dados.telefone=document.getElementById("tel").value;
    dados.endereco=document.getElementById("endereco").value;
    dados.idade=Number(document.getElementById("idade").value);
    dados.senha=document.getElementById("senha").value;

    // verficar se os campos estão devidamente preenchidos

    if(dados.nome!="" && dados.sobrenome!=""&& dados.endereco!="" && dados.idade!="" && dados.telefone!=""){
        if(verificaLogin(dados.email)==true && forcaSenha(dados.senha)==true ){

            // insere os dados do usuário no array
            cadastros.push(dados);

            // inserir ID de usuário automaticamente

            for(let i=0;i<cadastros.length;i++){
                cadastros[i].id=i+1;
            }
            // verifica os nomes digitados e capitaliza a primeira letra de cada nome
            for (let i = 0; i < cadastros.length; i++) {
                let first = cadastros[i].nome;
                let last = cadastros[i].sobrenome;
                cadastros[i].nome = first.slice(0,1).toUpperCase() + first.slice(1).toLowerCase();
                cadastros[i].sobrenome = last.slice(0,1).toUpperCase() +last.slice(1).toLowerCase();
            }


            let myJSON= JSON.stringify(cadastros);
            localStorage.setItem("Clientes", myJSON);
            console.log(cadastros);
            inserirNaTabela();
        }
        else{
            alert("Senha , email ou telefone inválidos!!");
        }
    }
    else{
        alert("Não é possível deixar campos em branco!!")
    }


}
let usuarios=[];
function inserirNaTabela() {
    usuarios=localStorage.getItem("Clientes");
    usuarios=JSON.parse(usuarios);

    // imprimir os dados do usuario na tabela
    let mensagem = "";
    for (let i = 0; i < usuarios.length; i++) {
        mensagem += "<tr>";
        mensagem += "<td>" + usuarios[i].nome + "</td>" +
            "<td>" + usuarios[i].sobrenome +
            "</td>" +"<td>" + usuarios[i].telefone + "</td>"+
            "</td>" +"<td>" + usuarios[i].email + "</td>"+
            "</td>" +"<td>" + usuarios[i].endereco + "</td>"+
            "</td>" +"<td>" + usuarios[i].idade + "</td>"+
            "</td>" +"<td>" + usuarios[i].id + "</td>";

        mensagem += "</tr>";
    }
    document.getElementById("código").innerHTML =
        "<tr><th><a href='#' onclick='organizaNome()'>Nome</a></th>" +
        "<th><a href='#' onclick='organizaSobrenome()'>Sobrenome</a></th>" +
        "<th><a href='#' onclick='organizaTelefone()'>Telefone</th>" +
        "<th><a href='#' onclick='organizaEmail()'>Email</a></th>" +
        "<th><a href='#' onclick='organizaEndereco()'>Endereço</a></th>" +
        "<th><a href='#' onclick='organizaIdade()'>Idade</a></th>" +
        "<th><a href='#' onclick='organizaID()'>ID</a></th></tr>" + mensagem;

}

function verificaLogin(email) { // string do email é dividida em antes do @ e após @
    let usuario=email.substring(0,email.indexOf("@")); // antes do @ a.k.a usuário
    let dominio=email.substring(email.indexOf("@")+1,email.length); // após o @ ; dominio

    if((usuario.length>=1) &&  // pelo menos um caracter antes do @
        (dominio.length>=3) &&  // pelo menos 3 cararcteres após o @
        (usuario.search("@")==-1) &&  //verificar se não há @  na parte do usuário
        (usuario.search(" ")==-1) && //verifica se não há espaços em branco no usuário
        (dominio.search(" ")==-1) &&  //verifica se não há espaços em branco no dominio
        (dominio.search(".")!=-1) &&  //dominio tem que possuir ponto
        (dominio.indexOf(".")>=1) && // a posição do primeiro ponto tem que ser >=1 ,a posição 0 deve ser ocupada por algum outro caracter após o @
        (dominio.lastIndexOf(".")<dominio.length-1)){ //a posição do ultimo ponto tem que ser menor que a do ultimo carcacter, o domínio deve ser finalizado por um caracter
        return true;
    }
    else{
        return false
    }
}

// verfica a senha , tem que ter pelo menos 1 numero, 1 letra minuscula ,1 letra maiuscula e 1 simbolo especial ,
// além de oito caracteres no minimo

function forcaSenha(senha) {
    let criteriosSatisfeitos=0;
    let numeros=0;
    let maiusculas=0;
    let minusculas=0;
    let simbolos=0;

    if(senha.length>=8){
        criteriosSatisfeitos++;
    }
    for(let i=0;i<senha.length;i++){    // verificando conteudo da senha
        let codigo=senha.charCodeAt(i);

        if(codigo>=48 && codigo<=57){
            numeros++;
        }
        else if(codigo>=65 && codigo<=90){
            maiusculas++;
        }
        else if(codigo>=97 && codigo<=122){
            minusculas++;
        }
        else simbolos++;
    }
    if(maiusculas>0){
        criteriosSatisfeitos++;
    }
    if(minusculas>0){
        criteriosSatisfeitos++;
    }
    if(numeros>0){
        criteriosSatisfeitos++;
    }
    if(simbolos>0){
        criteriosSatisfeitos++;
    }

    if(criteriosSatisfeitos>4){
        return true;
    }
    else{
        return false;
    }


}

function fazLogin(){
    let lista=[];
    lista = localStorage.getItem("Clientes");
    lista=JSON.parse(lista);
    let email = document.getElementById("emailLogin").value;
    let senha = document.getElementById("senhaLogin").value;
    let acheiConta = false;
    let c = 0;
    for(let i=0;i<lista.length;i++){
        console.log("Entrei no looping");
        if( (email.localeCompare(lista[i].email) == 0) &&
            (senha.localeCompare(lista[i].senha) == 0) ){
            console.log("Entrei no if");
            acheiConta = true;
            console.log(lista[i].email);
            break;
        }
        c = i;
    }
    console.log(c);
    if(acheiConta == true){
        document.getElementById("perfil").innerHTML="<p> Olá " + lista[c].nome + "</p>";
    }
    else{
        alert("EMAIL OU SENHA INCORRETO");
    }
}

// abaixo estão as funções usadas para ordenar a tabela

function organizaTelefone() {
    usuarios=localStorage.getItem("Clientes");
    usuarios=JSON.parse(usuarios);
    usuarios.sort(function(a, b) {
        if (a.telefone > b.telefone) return 1;
        if (b.telefone > a.telefone) return -1;
        return 0;

    });
    let myJSON= JSON.stringify(usuarios);
    localStorage.setItem("Clientes", myJSON);
    console.log(usuarios);
    inserirNaTabela();

}

function organizaEndereco() {
    usuarios=localStorage.getItem("Clientes");
    usuarios=JSON.parse(usuarios);
    usuarios.sort(function(a, b) {
        if (a.endereco > b.endereco) return 1;
        if (b.endereco > a.endereco) return -1;
        return 0;

    });
    let myJSON= JSON.stringify(usuarios);
    localStorage.setItem("Clientes", myJSON);
    console.log(usuarios);
    inserirNaTabela();

}

function organizaSobrenome() {
    usuarios=localStorage.getItem("Clientes");
    usuarios=JSON.parse(usuarios);
    usuarios.sort(function(a, b) {
        if (a.sobrenome > b.sobrenome) return 1;
        if (b.sobrenome > a.sobrenome) return -1;
        return 0;

    });
    let myJSON= JSON.stringify(usuarios);
    localStorage.setItem("Clientes", myJSON);
    console.log(usuarios);
    inserirNaTabela();

}

function organizaIdade() {
    usuarios=localStorage.getItem("Clientes");
    usuarios=JSON.parse(usuarios);
    usuarios.sort(function(a, b) {
        if (a.idade > b.idade) return 1;
        if (b.idade > a.idade) return -1;
        return 0;

    });
    let myJSON= JSON.stringify(usuarios);
    localStorage.setItem("Clientes", myJSON);
    console.log(usuarios);
    inserirNaTabela();

}

function organizaID() {
    usuarios=localStorage.getItem("Clientes");
    usuarios=JSON.parse(usuarios);
    usuarios.sort(function(a, b) {
        if (a.id > b.id) return 1;
        if (b.id  > a.id) return -1;
        return 0;

    });
    let myJSON= JSON.stringify(usuarios);
    localStorage.setItem("Clientes", myJSON);
    console.log(usuarios);
    inserirNaTabela();

}

function organizaEmail() {
    usuarios=localStorage.getItem("Clientes");
    usuarios=JSON.parse(usuarios);
    usuarios.sort(function(a, b) {
        if (a.email > b.email) return 1;
        if (b.email > a.email) return -1;
        return 0;

    });
    let myJSON= JSON.stringify(usuarios);
    localStorage.setItem("Clientes", myJSON);
    console.log(usuarios);
    inserirNaTabela();

}

function organizaNome() {
    usuarios=localStorage.getItem("Clientes");
    usuarios=JSON.parse(usuarios);
     usuarios.sort(function(a, b) {
        if (a.nome > b.nome) return 1;
        if (b.nome > a.nome) return -1;
        return 0;

    });
    let myJSON= JSON.stringify(usuarios);
    localStorage.setItem("Clientes", myJSON);
     console.log(usuarios);
    inserirNaTabela();
}

