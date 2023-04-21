function protegerRota() {
  const isRh = localStorage.getItem("@isRh");
  if (!isRh || isRh !== "true") {
    window.location.href = "../../../index.html"; // redireciona para a
  }
}

// Chama a função protegerRota() no início da página protegida
protegerRota();

document.addEventListener("DOMContentLoaded", function () {
  const estadosSelect = document.querySelector("#estados");
  const cidadesSelect = document.querySelector("#cidades");

  estadosSelect.addEventListener("change", function (e) {
    const siglaEstado = e.target.value;

    // FAZ A REQUISIÇÃO ASSÍNCRONA
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/distritos`
    )
      // AÇÃO ANTES DE ENVIAR
      .then((response) => {
        cidadesSelect.innerHTML =
          '<option value="" selected disabled>Aguarde...</option>';
        return response.json();
      })
      // SE REQUISIÇÃO FOR BEM SUCEDIDA
      .then((data) => {
        cidadesSelect.innerHTML = "";
        data.forEach(function (distrito) {
          const option = document.createElement("option");
          option.value = distrito.id;
          option.textContent = distrito.nome;
          cidadesSelect.appendChild(option);
        });
      })
      // SE HOUVE ERRO NA REQUISIÇÃO
      .catch((error) => {
        alert("Erro na requisição");
      });
  });
});

const form = document.querySelector("#meu-formulario");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const token = localStorage.getItem("@Token");

  const firstName = form.querySelector("#firstName").value;
  const lastName = form.querySelector("#lastName").value;
  const password = form.querySelector("#password").value;
  const enrollDate = form.querySelector("#enrollDate").value;
  const birthDate = form.querySelector("#birthDate").value;
  const isRh = form.querySelector("#isRh").checked;
  const cpf = form.querySelector("#cpf").value;
  const phone = form.querySelector("#phone").value;
  const state = form.querySelector("#estados").value;
  const city = form.querySelector("#cidades").value;

  const dados = {
    firstName,
    lastName,
    password,
    enrollDate,
    birthDate,
    isRh,
    cpf,
    phone,
    state,
    city,
  };
console.log(dados)
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      alert('Funcionario Cadastrado')
    })
    .catch((error) => console.error(error));
});

const backBtn = document.querySelector("#backBtn");

const backPage = () => {
  window.location.href = "../index.html";
};

backBtn.addEventListener("click", backPage);
