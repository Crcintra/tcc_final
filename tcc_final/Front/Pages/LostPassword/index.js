const newPassword = document.querySelector("#newPassword");
const confirNewPassword = document.querySelector("#confirmNewPassword");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");

const resetButton = document.querySelector(".reset-button");

resetButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (newPassword.value !== confirNewPassword.value) {
    return alert("Senhas diferentes");
  }

  //criando o objeto
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    newPassword: newPassword.value,
  };

  const apiUrl = "http://localhost:3000";

  try {
    const response = await fetch(`${apiUrl}/users/newPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Verifique se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Processar a resposta da API, se necessário

    alert("Senha atualizada com sucesso.");
  } catch (error) {
    console.error("Error sending data:", error);
  }
});
