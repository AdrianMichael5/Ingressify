# Ingressify - Plataforma de Revenda de Ingressos

Plataforma moderna de revenda de ingressos para eventos como shows, esportes, teatro e festivais.

[![Funcionalides](https://img.shields.io/badge/Funcionalidades-2684fc?style=for-the-badge&logo=Jira&logoColor=white)](https://docs.google.com/document/d/10E0lmg1TXhXTNImnfr_dHNWsdPgd-4pHhoDSmXSdvS4/edit?usp=sharing)
[![Prototipo](https://img.shields.io/badge/Prot%C3%B3tipo-ff3737?style=for-the-badge&logo=Figma&logoColor=white)](https://www.figma.com/make/6M11GfcfgtoXXrJDbjQwrR/Ingressify---Prot%C3%B3tipo?fullscreen=1&t=fh1JpeWl6hDvAwFn-1)
[![Documentacao](https://img.shields.io/badge/Documenta%C3%A7%C3%A3o-2684fc?style=for-the-badge&logo=GoogleDocs&logoColor=white)](https://drive.google.com/drive/folders/1KSKbBCBgsfLiwjxWK-w6NgDC-e9ORPXl?usp=sharing)

---

## Stack Tecnologica

### Backend
- Java 17 + Spring Boot 3.2
- Spring Security + JWT (jjwt)
- Spring Data JPA + PostgreSQL
- Flyway (migrations)
- Spring Validation

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- React Router DOM
- React Hook Form + Zod
- TanStack React Query
- Axios + Lucide React

---

## Pre-requisitos

- **Java 17+** (JDK)
- **Maven 3.8+**
- **Node.js 18+** e **npm 9+**
- **PostgreSQL 14+**

---

## Configuracao do Banco de Dados

1. Instale e inicie o PostgreSQL
2. Crie o banco de dados:

```sql
CREATE DATABASE ingressify;
```

3. As credenciais padrao no `application.yml` sao:
   - URL: `jdbc:postgresql://localhost:5432/ingressify`
   - Usuario: `postgres`
   - Senha: `postgres`

> Altere em `backend/src/main/resources/application.yml` se necessario.

---

## Como Rodar

### Backend

```bash
cd backend
mvn spring-boot:run
```

O servidor inicia em `http://localhost:8080`.

As migrations do Flyway criam as tabelas e inserem dados de eventos automaticamente.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend inicia em `http://localhost:5173`.

---

## Endpoints da API

| Metodo | Endpoint             | Descricao                  | Auth |
|--------|----------------------|----------------------------|------|
| POST   | `/api/auth/register` | Cadastro de novo usuario   | Nao  |
| POST   | `/api/auth/login`    | Login (retorna JWT)        | Nao  |
| GET    | `/api/events`        | Lista todos os eventos     | Nao  |

### Exemplo - Cadastro

```json
POST /api/auth/register
{
  "name": "Joao Silva",
  "email": "joao@email.com",
  "password": "12345678",
  "confirmPassword": "12345678"
}
```

### Exemplo - Login

```json
POST /api/auth/login
{
  "email": "joao@email.com",
  "password": "12345678"
}
```

### Resposta de autenticacao

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "name": "Joao Silva",
  "email": "joao@email.com"
}
```

---

## Estrutura do Projeto

```
backend/
├── src/main/java/com/tickethub/
│   ├── TicketHubApplication.java
│   ├── config/          # SecurityConfig, JWT, CORS
│   ├── controller/      # AuthController, EventController
│   ├── dto/             # Request/Response DTOs
│   ├── entity/          # User, Event (JPA)
│   ├── exception/       # GlobalExceptionHandler
│   ├── repository/      # JPA Repositories
│   └── service/         # AuthService, EventService
├── src/main/resources/
│   ├── application.yml
│   └── db/migration/    # Flyway SQL migrations
└── pom.xml

frontend/
├── src/
│   ├── components/ui/   # shadcn/ui components
│   ├── hooks/           # useAuth (AuthContext)
│   ├── pages/           # Home, Login, Register
│   ├── routes/          # PrivateRoute
│   ├── services/        # api.ts (Axios)
│   ├── types/           # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── package.json
```

---

## Funcionalidades (Fase 1)

- [x] Home publica com eventos em destaque e categorias
- [x] Cadastro com validacao completa (frontend + backend)
- [x] Login com JWT
- [x] Redirecionamento para login ao tentar comprar sem autenticacao
- [x] Tema dark moderno com gradiente roxo/azul
- [x] Layout responsivo (mobile + desktop)
- [x] Dados de eventos mockados via Flyway migration

## Proximas Fases

- **Fase 2:** Compra de ingressos, pagamento, perfil do usuario
- **Fase 3:** Painel admin, gestao de eventos, dashboard
