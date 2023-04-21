const loginButton = document.querySelector("#loginButton");

const login = async () => {
  const loginValue = document.querySelector("#login").value;
  const passwordValue = document.querySelector("#senha").value;

  const loginData = {
    firstName: loginValue,
    password: passwordValue,
  };

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();

    if (response.ok) {
      // Login bem-sucedido, redirecionar para a página principal

      localStorage.setItem("@Token", result.token);
      localStorage.setItem("@isRh", result.isRh);
      localStorage.setItem("@userId", result.id);
      if (result.isRh) {
        return (window.location.href = "./Pages/DashboardRH/index.html");
      } else {
        return (window.location.href =
          "./Pages/DashboardEmployee/holerite.html");
      }
    } else {
      // Login falhou, exibir mensagem de erro
      const error = result.error || "Erro desconhecido";
      alert(`Erro ao fazer login: Nome ou Senha Incorretos`);
    }
  } catch (error) {
    // Erro de rede, exibir mensagem de erro genérica
    alert("Erro de rede, tente novamente mais tarde");
  }
};

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});
