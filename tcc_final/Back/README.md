# api-tcc

API para cadastro de usuários pelo RH e criação de holerites para funcionários.

## Tecnologias

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- Typescript
- ExpressJS
- Sqlite3
- Prisma

## Endpoints da API

#### Users

`POST /users`
Endpoint para criar um novo usuário.

`Parâmetros:`

- `firstName`: Primeiro nome do usuário. (string, obrigatório)
- `lastName`: Sobrenome do usuário. (string, obrigatório)
- `password`: Senha do usuário. (string, obrigatório)
- `enrollDate`: Data de admissão do usuário. (string, formato: YYYY-MM-DD, obrigatório)
- `birthDate`: Data de nascimento do usuário. (string, formato: YYYY-MM-DD, obrigatório)
- `isRh`: Indica se o usuário é do RH. (boolean, obrigatório)
- `cpf`: Número do CPF do usuário. (string, obrigatório)
- `phone`: Número de telefone do usuário. (string, opcional)
- `state`: Estado onde o usuário reside. (string, opcional)
- `city`: Cidade onde o usuário reside. (string, opcional)

`GET /users`
Endpoint para listar todos os usuários.

`Parâmetros:`

Nenhum.

`GET /users/profile`

Endpoint para listar o perfil do usuário atual.

`Parâmetros:`

Nenhum.

`GET /users/:id`

Endpoint para listar os detalhes de um usuário.

Parâmetros:

- `id`: ID do usuário. (string, obrigatório)

`PATCH /users/newPassword`

Endpoint para atualizar a senha do usuário.

`Parâmetros:`

- `oldPassword`: Senha atual do usuário. (string, obrigatório)
- `newPassword`: Nova senha do usuário. (string, obrigatório)

### Login

`POST /login`

Endpoint para fazer login na API.

`Parâmetros:`

- `nome`: nome do usuário. (string, obrigatório)
- `password`: Senha do usuário. (string, obrigatório)

### Holerites

`POST /holerites`

Endpoint para criar um novo holerite.

`Parâmetros:`

- `currentMonth`: Mês corrente do holerite. (string, obrigatório)
- `bruteSalary`: Salário bruto do funcionário. (number, obrigatório)
- `inssValue`: Valor de INSS descontado no holerite. (number, obrigatório)
- `foodValue`: Valor de vale-alimentação do holerite. (number, opcional)
- `healthyValue`: Valor de vale-saúde do holerite. (number, opcional)
- `userId`: ID do usuário vinculado ao holerite. (number, obrigatório)

#### Formatos de resposta

A API responde em JSON.

#### Exemplos de uso

Criar um novo usuário:

```json
POST /users

{
  "firstName": "João",
  "lastName": "Silva",
  "password": "minhasenha",
  "enrollDate": "2022-01-01",
  "birthDate": "1990-01-01",
  "isRh": false,
  "cpf": "12345678900",
  "phone": "999999999",
  "state": "São Paulo",
  "city": "São Paulo"
}
```

#### Listar todos os usuários:

```json
GET /users
```

#### Listar o perfil do usuário atual:

```
GET /users/profile
```

#### Listar os detalhes de um usuário:

```
GET /users/123456
```

## Como rodar a API localmente

Para rodar a API localmente, você precisa seguir os seguintes passos:

1. Instalar as dependências do projeto com o comando yarn.

2. Executar as migrações do banco de dados com o comando yarn prisma migrate dev, e inserir o nome da migração quando solicitado pelo prompt.

3. Iniciar o servidor de desenvolvimento com o comando yarn dev.

Com esses passos concluídos, a API estará disponível na porta especificada no arquivo de configuração.
