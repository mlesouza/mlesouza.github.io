# 💻 VS Code Portfolio

Um portfolio interativo simulando a interface do Visual Studio Code, construído com HTML, CSS e JavaScript puro (Vanilla).

## ✨ Funcionalidades

### 🎨 Sistema de Temas (8 Opções)
Suporte total a temas com troca instantânea e persistência via `localStorage`:
1. **GitHub Dark** (Padrão) 🐙
2. **Retrô 90s** (Neon) 🎮
3. **VS Code Dark+** (Clássico) 🌙
4. **Monokai** 🟣
5. **Dracula** 🧛
6. **Solarized Dark** ☀️
7. **Nord** ❄️
8. **One Dark** ⚫

> O loader inicial se adapta automaticamente às cores do tema selecionado!

### 🎵 Música & Áudio
- **Música:** Tema do Super Mario Bros (versão extendida) gerada via Web Audio API.
- **Loop:** Reprodução contínua e suave.
- **Visual Feedback:** Botão com animação "pulse" quando a música está tocando.
- **Som Retro:** Efeitos sonoros ao interagir (requer ativação manual no loader).

### 🖥️ Interface VS Code
- **Layout:** Top bar, activity bar, sidebar (explorer), editor area, tabs e status bar.
- **Responsivo:** Adaptação para mobile (menu hambúrguer, layout flexível).
- **Abas Funcionais:** Troca de conteúdo ao clicar nas abas (`index.js`, `about.md`, `projects.jsx`, etc).

## 🚀 Como Rodar

Basta abrir o arquivo `index.html` em qualquer navegador moderno. Não requer build steps ou servidores complexos.

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/portfolio-vscode.git

# Abra no navegador
open index.html
```

## 🛠️ Estrutura de Arquivos

- **index.html:** Estrutura DOM principal.
- **vscode-style.css:** Estilos, variáveis de tema e animações.
- **vscode-script.js:** Lógica de interface, áudio e temas.
- **script.js:** (Legado/Não usado) Arquivo de versão anterior.

## ⚙️ Customização

### Adicionar Novo Tema
Abra `vscode-style.css` e adicione um novo bloco seguindo o padrão:

```css
body.theme-nome {
    /* Cores principais */
    --vscode-bg: #...;
    --vscode-text: #...;
    
    /* Cores do Loader (RGB para transparência) */
    --loader-primary: #...;
    --loader-primary-rgb: R, G, B; 
}
```

E adicione a opção no `<select>` em `index.html`.

---
Feito com ❤️ e ☕ por Marcelo Souza.
