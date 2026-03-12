# 🚀 Sistema de Revenda de Ingressos

![Java](https://img.shields.io/badge/Java-17-red)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Plataforma web para **compra, venda e revenda segura de ingressos para eventos**.

[![Documentação](https://img.shields.io/badge/Documentação-2684fc?style=for-the-badge&logo=GoogleDocs&logoColor=white)](https://drive.google.com/drive/folders/1KSKbBCBgsfLiwjxWK-w6NgDC-e9ORPXl?usp=sharing)
[![Protótipo](https://img.shields.io/badge/Protótipo-ff3737?style=for-the-badge&logo=Figma&logoColor=white)](https://drive.google.com/drive/folders/1KSKbBCBgsfLiwjxWK-w6NgDC-e9ORPXl?usp=sharing)
[![Linguagem Onipresente](https://img.shields.io/badge/Linguagem.Onipresente-008000?style=for-the-badge&logo=GoogleDrive&logoColor=white)](https://drive.google.com/drive/folders/16HWPGl0VJcjobyMcTBmbaDAGwWmjTv1L?usp=sharing)


---

# 📚 Sumário

- [📌 Sobre o Projeto](#-sobre-o-projeto)
- [🛠 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [⚙️ Funcionalidades do Sistema](#-funcionalidades-do-sistema)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)

---

# 📦 ENTREGA 1

- [📖 Descrição do Domínio](#-descrição-do-domínio)
- [🧠 Linguagem Onipresente](#-linguagem-onipresente)
- [🗺 Mapa de Histórias do Usuário](#-mapa-de-histórias-do-usuário)
- [🎨 Protótipos](#-protótipos)
- [🧩 Modelagem com Context Mapper](#-modelagem-com-context-mapper)
- [🧪 Cenários BDD](#-cenários-bdd)
- [🤖 Automação com Cucumber](#-automação-com-cucumber)

---

# 📦 ENTREGA 2

- [🏗 Domain Driven Design](#-domain-driven-design)
- [🧼 Arquitetura Limpa](#-arquitetura-limpa)
- [🧩 Padrões de Projeto](#-padrões-de-projeto)
- [🗄 Persistência com ORM](#-persistência-com-orm)
- [🌐 Camada Web](#-camada-web)

---

# 📌 Sobre o Projeto

Este projeto consiste no desenvolvimento de uma **plataforma de marketplace para revenda de ingressos de eventos**.

O sistema permite que usuários:

- comprem ingressos
- revendam ingressos
- verifiquem autenticidade
- acompanhem eventos disponíveis
- gerenciem suas compras

O objetivo principal é **reduzir fraudes e garantir segurança na revenda de ingressos**.

---

# 🛠 Tecnologias Utilizadas

## Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven

## Banco de Dados

- PostgreSQL

## Frontend

- React
- HTML
- CSS
- JavaScript

## Testes

- Cucumber
- JUnit

## Ferramentas

- GitHub
- IntelliJ IDEA
- Context Mapper
- Figma
- Excalidraw

---

# ⚙️ Funcionalidades do Sistema

| Nº | Funcionalidade | Descrição |
|---|---|---|
| 1 | Cadastro de usuários | Usuários podem criar contas |
| 2 | Login e autenticação | Sistema de login seguro |
| 3 | Cadastro de eventos | Administradores cadastram eventos |
| 4 | Compra de ingressos | Usuários compram ingressos |
| 5 | Revenda de ingressos | Usuários revendem ingressos |
| 6 | Validação de ingressos | Sistema verifica autenticidade |
| 7 | Histórico de compras | Registro das compras |
| 8 | Sistema de notificações | Aviso de novos ingressos |
| 9 | Avaliação de vendedores | Usuários avaliam vendedores |
| 10 | Cancelamento de venda | Usuário pode cancelar revenda |
| 11 | Gerenciamento de eventos | Admin gerencia eventos |
| 12 | Moderação de anúncios | Admin pode remover anúncios |
| 13 | Relatórios administrativos | Dados para análise |
| 14 | Controle de disponibilidade | Controle de ingressos disponíveis |

---

# 📂 Estrutura do Projeto


project-root
│
├── docs
│ ├── prototipos
│ ├── diagramas
│ ├── context-mapper
│
├── backend
│ ├── domain
│ ├── application
│ ├── infrastructure
│
├── frontend
│
├── tests
│ ├── bdd
│
└── README.md


---

## 📦 ENTREGA 1
      
## 📦 ENTREGA 2

## 🏗 Domain Driven Design 

Aplicação dos níveis:

Preliminar

Estratégico

Tático

Operacional

## 🧼 Arquitetura Limpa

### Camadas:
```

presentation
application
domain
infrastructure
```

## 🧩 Padrões de Projeto
| Padrão | Aplicação |
|---|---|
| Strategy |	Cálculo de preço |
| Observer | Notificações |
| Decorator	| Extensão de funcionalidades |
| Proxy |	Controle de acesso |
| Iterator | Percorrer coleções |
| Template Method |	Fluxo de compra |

## 🗄 Persistência com ORM

Tecnologias:

Spring Data JPA

Hibernate

PostgreSQL

## 🌐 Camada Web

Frontend desenvolvido com:

React

HTML

CSS

JavaScript

## 🚀 Como Executar
### Backend
```
mvn spring-boot:run
```
### Frontend
```
npm install
npm run dev
````
