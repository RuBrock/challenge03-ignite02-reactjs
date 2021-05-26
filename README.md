## Ignite02 Challenge 1 - TODO Application - ReactJS
Desafio direcionado pela Rocketseat no Ignite, criar uma aplicação de um e-commerce, onde possam ser adicionados produtos ao carrinho, removidos, aumentar e diminuir a quantidade, utilizando ReactJS.

---

### Requisitos

* components/Header/index.tsx
- [X] Deve ser possível apresentar a quantidade de produtos adicionados ao carrinho

* pages/Home/index.tsx
- [X] Deve ser possível apresentar a quantidade de cada produto no carrinho
- [X] Deve ser possível adicionar um produto ao carrinho

* pages/Cart/index.tsx
- [X] Deve ser possível aumentar/diminuir a quantidade de cada produto no carrinho
- [X] Deve ser possível remover um produto do carrinho

* hooks/useCart.tsx
- [X] Deve ser possível inicializar o valor do carrinho com os dados guardados no localStorage
- [X] Deve ser possível adicionar um produto ao carrinho
- [X] Deve ser possível aumentar a quantidade de um produto já existente no carrinho ao adicionar o mesmo
- [X] Deve ser possível remover um produto do carrinho
- [X] Deve ser possível atualizar a quantidade de um produto no carrinho

### Regra de Negócio

* pages/Cart/index.tsx
- [X] Não deve ser possível diminuir a quantidade de um produto quando a quantidade for 1 ou menor

* hooks/useCart.tsx
- [X] Não deve ser possível adicionar um produto inexistente ao carrinho
- [X] Não deve ser possível adicionar mais produtos em que a quantidade adicionada não esteja disponível em estoque
- [X] Não deve ser possível remover um produto inexistente no carrinho
- [X] Não deve ser possível atualizar um produto inexistente no carrinho
- [X] Não deve ser possível atualizar a quantidade de um produto em que a quantidade desejada não esteja disponível em estoque
- [X] Não deve ser possível diminuir a quantidade de um produto quando a quantidade for menor que 1

---

### Instalação

Utilize o gerenciador de pacotes de sua escolha (npm, yarn, etc.) e instale as dependências.

```bash
npm install
```

```bash
yarn install
```

### Uso
Execute o seguinte comando para lançar o projeto

```bash
npm run dev
```

```bash
yarn dev
```
