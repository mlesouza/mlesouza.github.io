# Guia de Deploy - GitHub Pages

Este guia explica como colocar seu site online gratuitamente usando o GitHub e GitHub Pages.

## Passo 1: Criar Repositório no GitHub

1.  Acesse [github.com](https://github.com) e faça login.
2.  Clique no botão **(+)** no canto superior direito e selecione **New repository**.
3.  Nomeie o repositório (ex: `portfolio` ou `mlesouza.github.io` para ser seu site principal).
4.  Certifique-se de que está como **Public**.
5.  Clique em **Create repository**.

## Passo 2: Enviar o Código

Como já inicializamos o Git localmente, abra o terminal na pasta do projeto e execute os comandos que o GitHub mostra na tela "…or push an existing repository from the command line":

```bash
git remote add origin https://github.com/mlesouza/[NOME-DO-REPO].git
git branch -M main
git push -u origin main
```
*(Substitua `[NOME-DO-REPO]` pelo nome que você criou).*

## Passo 3: Ativar o GitHub Pages

1.  No seu repositório no GitHub, clique na aba **Settings**.
2.  No menu lateral esquerdo, clique em **Pages**.
3.  Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
4.  Em **Branch**, selecione **main** e a pasta **/ (root)**.
5.  Clique em **Save**.

🎉 **Pronto!** Em alguns minutos, seu site estará disponível em:
`https://mlesouza.github.io/[NOME-DO-REPO]/`

## Dica Extra: Domínio Personalizado
Se você tiver um domínio (ex: `marcelosouza.com`), você pode configurá-lo na mesma página de configurações do GitHub Pages em "Custom domain".
