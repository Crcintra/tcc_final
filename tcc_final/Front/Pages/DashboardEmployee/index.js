const apiUrl = "http://localhost:3000";

const token = localStorage.getItem("@Token");

const backbutton = document.querySelector('#backBtn')
backbutton.addEventListener('click',()=>{
  window.location.href = "../../index.html"
})

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const getUserInfo = async () => {
  await fetch(`${apiUrl}/users/profile`, {
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
      return showData(data);
    })
    .catch((error) => console.error(error));
};

const showData = (user) => {
  selectedMonth.addEventListener("change", (e) => {
    const firstName = capitalizeFirstLetter(user.firstName);
    const lastName = capitalizeFirstLetter(user.lastName);

    const holeriteFiltrado = filterMonth(e.target.value, user.holerite);
    const lastHolerite = holeriteFiltrado[holeriteFiltrado.length - 1];

    console.log(holeriteFiltrado);

    // Cria a tabela
    const table = document.querySelector("table");
    table.innerHTML = "";

    if (holeriteFiltrado.length == 0) {
      return alert("Nenhum holerite registrado no mês procurado");
    }

    const liquidSalary =
      lastHolerite.bruteSalary -
      lastHolerite.inssValue -
      lastHolerite.foodValue -
      lastHolerite.healthyValue;

    const tbody = document.createElement("tbody");

    // Cria a primeira linha da tabela
    const row1 = document.createElement("tr");

    const cell1 = document.createElement("td");
    cell1.setAttribute("class", "description");
    cell1.appendChild(document.createTextNode("Nome:"));
    row1.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.setAttribute("id", "name");
    cell2.setAttribute("class", "info");
    cell2.innerText = `${firstName} ${lastName}`;
    row1.appendChild(cell2);

    tbody.appendChild(row1);

    // Cria a segunda linha da tabela
    const row2 = document.createElement("tr");

    const cell3 = document.createElement("td");
    cell3.setAttribute("class", "description");
    cell3.appendChild(document.createTextNode("Salário:"));

    row2.appendChild(cell3);

    const cell4 = document.createElement("td");
    cell4.setAttribute("id", "salary");
    cell4.setAttribute("class", "info");
    cell4.innerText = lastHolerite.bruteSalary.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    row2.appendChild(cell4);

    tbody.appendChild(row2);

    // Cria a terceira linha da tabela
    const row3 = document.createElement("tr");

    const cell5 = document.createElement("td");
    cell5.setAttribute("colspan", "2");
    cell5.setAttribute("class", "separator");
    const strong = document.createElement("strong");
    strong.appendChild(document.createTextNode("Resumo de Descontos:"));
    cell5.appendChild(strong);
    row3.appendChild(cell5);

    tbody.appendChild(row3);

    // Cria a quarta linha da tabela
    const row4 = document.createElement("tr");

    const cell6 = document.createElement("td");
    cell6.setAttribute("class", "description");
    cell6.appendChild(
      document.createTextNode("INSS (14% de acordo com a alíquota):")
    );
    row4.appendChild(cell6);

    const cell7 = document.createElement("td");
    cell7.setAttribute("id", "inss");
    cell7.setAttribute("class", "info");
    cell7.innerText = `${lastHolerite.inssValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;
    row4.appendChild(cell7);

    tbody.appendChild(row4);

    // Cria a quinta linha da tabela
    const row5 = document.createElement("tr");

    const cell8 = document.createElement("td");
    cell8.setAttribute("class", "description");
    cell8.appendChild(document.createTextNode("Alimentação na Empresa:"));
    row5.appendChild(cell8);

    const cell9 = document.createElement("td");
    cell9.setAttribute("id", "food");
    cell9.setAttribute("class", "info");
    cell9.innerText = `${lastHolerite.foodValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;
    row5.appendChild(cell9);

    tbody.appendChild(row5);

    // Cria a sexta linha da tabela
    const row6 = document.createElement("tr");

    const cell10 = document.createElement("td");
    cell10.setAttribute("class", "description");
    cell10.appendChild(document.createTextNode("Plano de Saúde:"));
    row6.appendChild(cell10);

    const cell11 = document.createElement("td");
    cell11.setAttribute("id", "healthy");
    cell11.setAttribute("class", "info");
    cell11.innerText = `${lastHolerite.healthyValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;
    row6.appendChild(cell11);

    tbody.appendChild(row6);

    // Cria a sétima linha da tabela
    const row7 = document.createElement("tr");

    const cell12 = document.createElement("td");
    cell12.setAttribute("class", "description");
    cell12.appendChild(document.createTextNode("Valor líquido:"));
    row7.appendChild(cell12);

    const cell13 = document.createElement("td");
    cell13.setAttribute("id", "total");
    cell13.setAttribute("class", "info");
    cell13.innerText = `${liquidSalary.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;
    row7.appendChild(cell13);

    tbody.appendChild(row7);

    table.appendChild(tbody);

    // Adiciona a tabela ao elemento com o ID 'container'
    document.querySelector("main").appendChild(table);
  });
};

const filterMonth = (selectedMonth, holerites) => {
  const filtredHolerite = holerites.filter((holerite) => {
    const month = holerite.currentMonth.split("/")[0];
    if (month.toLowerCase() === selectedMonth.toLowerCase()) {
      return holerite;
    }
  });
  return filtredHolerite;
};

const selectedMonth = document.querySelector(".meses");

getUserInfo();
