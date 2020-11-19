# Desafio 4 - Cubos Academy - Back-end

Esse desafio consiste na criação de uma API bem trabalhada de um banking o qual terceiriza um sistema de cobranças. Os usuários, após se cadastrarem na plataforma, podem cadastrar os clientes deles e criar uma cobrança para que os clientes paguem. Os clientes recebem um email com o link do boleto para pagar.

Além disso, nesta plataforma os usuários podem ver e buscar clientes, ver e buscar cobranças, marcar uma cobrança como paga, ver um resumo de todo o financeiro, dentre outras coisas que estarão mais detalhadas abaixo.

Esta Api utiliza uma integração com a [pagarme](https://docs.pagar.me/docs/realizando-uma-transacao-de-boleto-bancario)

## Login do usuário

**URL:** `/auth`

**Método:** POST

**Entrada:**

```json=
{
	"email": "user@email.com",
	"senha": "senhadouser"
}
```

**Saída de sucesso:**

```javascript=
{
    status: 200,
    dados: {
        mensagem: "Usuário logado com sucesso!",
        token: "token_gerado_aqui"
    }
}
```

## Cadastro do usuário

**URL:** `/usuarios`

**Método:** POST

**Entrada:**

```json=
{
	"email": "user@email.com",
	"senha": "senhadouser",
	"nome": "Nome do Usuário"
}
```

**Saída de sucesso:**

```javascript=
{
    status: 201,
    dados: {
        id: "id_do_usuario_criado"
    }
}
```

## Criar cliente

**URL:** `/clientes`

**Método:** POST

**Token exigido**

**Entrada:**

```json=
{
	"nome": "Nome do Cliente",
	"cpf": "000.000.000-21",
	"email": "cliente@email.com",
	"tel": "+5571999996688"
}
```

**Saída de sucesso:**

```javascript=
{
    status: 201,
    dados: {
        id: "id_do_cliente_criado"
    }
}
```

## Editar cliente

**URL:** `/clientes`

**Método:** PUT

**Token exigido**

**Entrada:**

```json=
{
	"id": "id_do_cliente",
	"nome": "Nome do Cliente",
	"cpf": "000.000.000-21",
	"email": "cliente@email.com",
	"tel": "+5571999996688"
}
```

**Saída de sucesso:**

```javascript=
{
    status: 200,
    dados: {
        id: "id_do_cliente_editado",
        nome: "Nome do Usuario",
        cpf: "000.000.000-21"
        email: "cliente@email.com",
    }
}
```

## Listar Clientes

**URL:** `/clientes?clientesPorPagina=:x&offset=:y`

-   X e Y são variáveis que definem quantos clientes serão exibidos numa pesquisa e o offset, respectivamente
    -   Offset é equivalente a: "começando pelo ..."

**Método:** GET

**Token exigido**

**Saída:**

```json=
{
    status: 200,
    dados: {
        clientes: [
            {
                nome: "nome do cliente",
                email: "exemplo@email.com",
                cobrancasFeitas: 120000,
                cobrancasRecebidas: 100000,
                estaInadimplente: true,
            },
            {
                nome: "nome do cliente",
                email: "exemplo@email.com",
                cobrancasFeitas: 120000,
                cobrancasRecebidas: 100000,
                estaInadimplente: true,
            },
            ...
        ]
    }
}
```

## Buscar Clientes

**URL:** `/clientes?busca=:string&clientesPorPagina=:x&offset=:y`

-   String é a busca a qual o usuário requisitou

**Método:** GET

**Token exigido**

**Saída:**

```json=
{
    status: 200,
    dados: {
        clientes: [
            {
                nome: "nome do cliente",
                email: "exemplo@email.com",
                cobrancasFeitas: 120000,
                cobrancasRecebidas: 100000,
                estaInadimplente: true,
            },
            {
                nome: "nome do cliente",
                email: "exemplo@email.com",
                cobrancasFeitas: 120000,
                cobrancasRecebidas: 100000,
                estaInadimplente: true,
            },
            ...
        ]
    }
}
```

## Criar Cobrança

**URL:** `/cobrancas`

**Método:** POST

**Token exigido**

**Entrada:**

```json=
{
	"idDoCliente": "idDoCliente",
	"descricao": "descrição da cobrança",
	"valor": 120000,
	"vencimento": "dd/mm/yyyy"
}
```

**Saída de sucesso:**

```javascript=
{
    status: 201,
    dados: {
        cobranca: {
            idDoCliente: "idDoCliente",
            descricao: "descrição da cobrança",
            valor: 120000,
            vencimento : "dd/mm/yyyy",
            linkDoBoleto: "http://link.do.boleto",
            status: aguardando | pago | vencido
        }
    }
}
```

## Listar Cobranças

**URL:** `/cobrancas?cobrancasPorPagina=:x&offset=:y`

**Método:** GET

**Token exigido**

**Saída de sucesso:**

```javascript=
{
    status: 200,
    dados: {
        cobrancas: [{
            idDoCliente: "idDoCliente",
            descricao: "descrição da cobrança",
            valor: 120000,
            vencimento : "data_de_vencimento",
            linkDoBoleto: "http://link.do.boleto",
            status: AGUARDANDO | PAGO | VENCIDO
        },
        {
            idDoCliente: "idDoCliente",
            descricao: "descrição da cobrança",
            valor: 120000,
            vencimento : "data_de_vencimento",
            linkDoBoleto: "http://link.do.boleto",
            status: AGUARDANDO | PAGO | VENCIDO
        }
        ...
        ]
    }
}
```

## Pagar Cobrança

**URL:** `/cobrancas`

**Método:** PUT

**Token exigido**

**Entrada:**

```json=
{
	"idDaCobranca": 'id_da_cobranca';
}
```

**Saída de sucesso:**

```javascript=
{
    status: 200,
    dados: {
        mensagem: "Cobrança paga com sucesso"
    }
}
```

## Obter Relatório

**URL:** `/relatorios`

**Método:** GET

**Token exigido**

**Saída de sucesso:**

```javascript=
{
    status: 200,
    dados: {
        relatorio: {
            qtdClientesAdimplentes: 10,
            qtdClientesInadimplentes: 12,
            qtdCobrancasPrevistas: 20,
            qtdCobrancasPagas: 30,
            qtdCobrancasVencidas: 40,
            saldoEmConta: 6000000

        }
    }
}
```
