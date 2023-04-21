export const apiUrl = "http://localhost:3000";

function protegerRota() {
  const isRh = localStorage.getItem("@isRh");
  if (!isRh || isRh !== "true") {
    window.location.href = "../../../index.html"; // redireciona para a
  }
}

// Chama a função protegerRota() no início da página protegida
protegerRota();

// Função auxiliar para tornar a primeira letra de uma string maiúscula
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const getEmployees = async () => {
  const token = localStorage.getItem("@Token");

  await fetch(`${apiUrl}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro na requisição GET");
      }
    })
    .then((data) => showEmployees(data))
    .catch((error) => console.error(error));
};

const showEmployees = (users) => {
  const select = document.querySelector("#select_employee");
  const defaultOption = document.createElement("option");

  defaultOption.innerText = "Selecione o funcionario";

  select.appendChild(defaultOption);

  users.forEach((user) => {
    const option = document.createElement("option");

    const firstName = capitalizeFirstLetter(user.firstName);
    const lastName = capitalizeFirstLetter(user.lastName);

    option.innerText = `${firstName} ${lastName}`;
    option.value = user.id;

    select.appendChild(option);
  });
};

const select = document.querySelector("#select_employee");
select.addEventListener("change", async (event) => {
  const token = localStorage.getItem("@Token");

  const selectedOptionValue = event.target.value;

  await fetch(`${apiUrl}/users/${selectedOptionValue}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro na requisição GET");
      }
    })
    .then((data) => {
      return showHoleriteForm(data);
    })
    .catch((error) => console.error(error));
});

const showHoleriteForm = (user) => {
  const container = document.querySelector(".container");
  // Cria o elemento principal
  const main = document.querySelector("main");
  main.innerHTML = "";

  // Cria o título h2
  const h2 = document.createElement("h2");

  const firstName = capitalizeFirstLetter(user.firstName);
  const lastName = capitalizeFirstLetter(user.lastName);

  h2.textContent = `${firstName} ${lastName}`;
  main.appendChild(h2);

  // Cria o formulário
  const form = document.createElement("form");

  // Primeira linha
  const row1 = document.createElement("div");
  row1.classList.add("row");

  const col1 = document.createElement("div");
  col1.classList.add("col-md-6", "mb-3");
  const label1 = document.createElement("label");
  label1.setAttribute("for", "currentMonth");
  label1.textContent = "Mês de referência/Ano de Referencia";
  col1.appendChild(label1);

  const input1 = document.createElement("input");
  input1.type = "text";
  input1.classList.add("form-control");
  input1.id = "currentMonth";
  input1.placeholder = "Ex: Março/2022";
  input1.required = true;
  col1.appendChild(input1);
  row1.appendChild(col1);
  form.appendChild(row1);

  // Segunda linha
  const row2 = document.createElement("div");
  row2.classList.add("row");
  // Coluna 1 da segunda linha
  const col2_1 = document.createElement("div");
  col2_1.classList.add("col-md-6", "mb-3");
  const label2_1 = document.createElement("label");
  label2_1.setAttribute("for", "bruteSalary");
  label2_1.textContent = "Salário bruto";

  col2_1.appendChild(label2_1);

  const input2_1 = document.createElement("input");
  input2_1.type = "number";
  input2_1.classList.add("form-control");
  input2_1.id = "bruteSalary";
  input2_1.placeholder = "Digite o salário bruto";
  input2_1.required = true;

  input2_1.addEventListener("input", calculateDiscounts);

  col2_1.appendChild(input2_1);
  row2.appendChild(col2_1);

  // Coluna 2 da segunda linha
  const col2_2 = document.createElement("div");
  col2_2.classList.add("col-md-6", "mb-3");
  const label2_2 = document.createElement("label");
  label2_2.setAttribute("for", "inssValue");
  label2_2.textContent = "Valor do INSS";
  col2_2.appendChild(label2_2);

  const input2_2 = document.createElement("input");
  input2_2.type = "number";
  input2_2.classList.add("form-control");
  input2_2.id = "inssValue";
  input2_2.placeholder = "Digite o valor do INSS";
  input2_2.required = true;
  col2_2.appendChild(input2_2);
  row2.appendChild(col2_2);
  form.appendChild(row2);

  // Terceira linha
  const row3 = document.createElement("div");
  row3.classList.add("row");
  // Coluna 1 da terceira linha
  const col3_1 = document.createElement("div");
  col3_1.classList.add("col-md-6", "mb-3");
  const label3_1 = document.createElement("label");
  label3_1.setAttribute("for", "foodValue");
  label3_1.textContent = "Vale alimentação";
  col3_1.appendChild(label3_1);

  const input3_1 = document.createElement("input");
  input3_1.type = "number";
  input3_1.classList.add("form-control");
  input3_1.id = "foodValue";
  input3_1.placeholder = "Digite o valor do vale alimentação";
  input3_1.required = true;
  col3_1.appendChild(input3_1);
  row3.appendChild(col3_1);

  // Coluna 2 da terceira linha
  const col3_2 = document.createElement("div");
  col3_2.classList.add("col-md-6", "mb-3");
  const label3_2 = document.createElement("label");
  label3_2.setAttribute("for", "healthyValue");
  label3_2.textContent = "Plano de saúde";
  col3_2.appendChild(label3_2);

  const input3_2 = document.createElement("input");
  input3_2.type = "number";
  input3_2.classList.add("form-control");
  input3_2.id = "healthyValue";
  input3_2.placeholder = "Digite o valor do plano de saúde";
  input3_2.required = true;
  col3_2.appendChild(input3_2);
  row3.appendChild(col3_2);
  form.appendChild(row3);

  // Botão de envio
  const button = document.createElement("button");
  button.classList.add("btn", "btn-primary");
  button.type = "submit";
  button.textContent = "Enviar";

  button.addEventListener("click", (event) => {
    event.preventDefault(); // Evite o comportamento padrão de envio do formulário
    sendHolerite();
  });
  form.appendChild(button);

  // Adiciona o formulário ao elemento principal
  main.appendChild(form);
  container.appendChild(main);
};

// Função para calcular os descontos
function calculateDiscounts() {
  // Defina as taxas de desconto como constantes
  const INSS_RATE = 0.14; // 14% de desconto para INSS
  const FOOD_RATE = 0.12; // 12% de desconto para vale-alimentação
  const HEALTH_RATE = 0.08; // 8% de desconto para plano de saúde

  // Capture o valor do salário bruto do campo de entrada
  const salaryBrute = parseFloat(document.getElementById("bruteSalary").value);

  // Verifique se o valor do salário bruto é um número válido
  if (isNaN(salaryBrute)) {
    document.getElementById("inssValue").value = "";
    document.getElementById("foodValue").value = "";
    document.getElementById("healthyValue").value = "";
    return;
  }

  // Calcule os descontos
  const inssDiscount = salaryBrute * INSS_RATE;
  const foodDiscount = salaryBrute * FOOD_RATE;
  const healthDiscount = salaryBrute * HEALTH_RATE;

  // Preencha os campos de entrada com os valores calculados
  document.getElementById("inssValue").value = inssDiscount.toFixed(2);
  document.getElementById("foodValue").value = foodDiscount.toFixed(2);
  document.getElementById("healthyValue").value = healthDiscount.toFixed(2);
}

// Adicione um ouvinte de evento ao campo de entrada do salário bruto

const sendHolerite = async () => {
  // Capture os valores dos campos de entrada
  const currentMonth = document.getElementById("currentMonth").value;
  const salaryBrute = parseFloat(document.getElementById("bruteSalary").value);
  const inssValue = parseFloat(document.getElementById("inssValue").value);
  const foodValue = parseFloat(document.getElementById("foodValue").value);
  const healthyValue = parseFloat(
    document.getElementById("healthyValue").value
  );
  const userId = +document.querySelector("#select_employee").value;

  // Verifique se todos os valores são válidos
  if (
    !currentMonth ||
    isNaN(salaryBrute) ||
    isNaN(inssValue) ||
    isNaN(foodValue) ||
    isNaN(healthyValue)
  ) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  // Crie um objeto com os dados do formulário
  const data = {
    currentMonth,
    bruteSalary: salaryBrute,
    inssValue,
    foodValue,
    healthyValue,
    userId,
  };

  // Defina seu Bearer token aqui
  const bearerToken = localStorage.getItem("@Token");

  // Faça uma requisição POST utilizando o fetch e o Bearer token
  try {
    const response = await fetch(`${apiUrl}/holerites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(data),
    });

    // Verifique se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Processar a resposta da API, se necessário
    const responseData = await response.json();

    alert("Holerite criado com sucesso.");
  } catch (error) {
    console.error("Error sending data:", error);
  }
};

//Chamadas de função
getEmployees();
