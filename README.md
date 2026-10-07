# Doce Gelado — Correção de bugs

> **Observação ao professor:** Esta atividade está sendo realizada durante a recuperação. Como meus colegas já haviam concluído a tarefa, utilizarei minha segunda conta, `marianesflores`, como colaboradora e revisora para praticar o fluxo de colaboração e revisão de código no GitHub. As duas contas pertencem a mim. O convite de colaboração e as revisões serão realizados após a abertura dos pull requests.

Projeto acadêmico de **Mariane Silva Flores**, desenvolvido com apoio de IA, usando HTML, CSS e JavaScript. Baseado no [atividade-branchs](https://github.com/marianesilvaflores/atividade-branchs), preservando os problemas existentes para demonstrar as correções em branches separadas.

## Executar

Abra `index.html` no navegador. Para os testes de regressão, use Node.js e execute `node --test tests/*.test.cjs` na branch da correção.

## Correções propostas

| Branch | Problema | Resultado esperado |
| --- | --- | --- |
| `bugfix/busca-milkshake` | Buscar milkshake sem hífen não encontra Milk-shake | Encontrar com ou sem hífen, espaço e acentos |
| `bugfix/contraste-tema-escuro` | Atalho Pular para o cardápio fica com texto branco sobre fundo quase branco no tema escuro | Atalho com contraste de texto de pelo menos 4,5:1 |
| `bugfix/foco-favoritos` | Remover favorito da lista filtrada oculta o botão que tem foco | Mover foco para o próximo favorito visível ou para Só favoritos |

Cada correção está apresentada em um pull request para `main`. Os PRs permanecerão abertos até a revisão da autora pela segunda conta. As alterações não foram aprovadas por um colega.

## Revisão pendente

1. Adicionar `marianesflores` em Settings → Collaborators e aceitar o convite nessa conta.
2. Solicitar `marianesflores` como revisora em cada PR.
3. Conferir alterações e testes e enviar a revisão pela segunda conta.
4. Depois da revisão, integrar os PRs em `main`.

As imagens foram geradas com IA da OpenAI para o projeto original. Fontes DM Sans e Fraunces via Google Fonts. Produtos e preços ilustrativos; nenhum pedido ou pagamento é enviado.


## Pull requests para revisar

- [PR #1 — Busca](https://github.com/marianesilvaflores/atividade-bugfix/pull/1)
- [PR #2 — Contraste do atalho](https://github.com/marianesilvaflores/atividade-bugfix/pull/2)
- [PR #3 — Foco nos favoritos](https://github.com/marianesilvaflores/atividade-bugfix/pull/3)

Os testes usam um DOM simulado para busca e foco e cálculo de contraste das cores declaradas no CSS. Em ambientes que bloqueiam subprocessos, Node.js 24 permite executar com --test-isolation=none.

