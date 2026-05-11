# Memory Game - Premium Web Edition (IPC 24-25)

Este projeto consiste numa aplicação web de **Jogo da Memória** de alta performance, desenvolvida no âmbito da unidade curricular de **Interação Pessoa-Computador (IPC)** na UTAD.

## 📜 Histórico e Evolução

O projeto teve a sua génese no ano letivo anterior, sendo originalmente desenvolvido como uma aplicação **Desktop** utilizando **Python e Kivy**. 

Este ano, o projeto foi totalmente **reformulado e migrado para a Web**. Esta transição permitiu:
- **Maior Portabilidade**: O jogo agora é acessível em qualquer browser moderno sem necessidade de instalação.
- **Modernização da Stack**: Transição para React e Framer Motion, permitindo animações mais complexas e um sistema de estados mais robusto.
- **Aprimoramento da Acessibilidade**: Implementação de funcionalidades web nativas como a *Web Speech API* para um Áudio Assistido mais fluido.

## 🧠 Fundamento do Projeto

O desenvolvimento deste jogo focou-se nos pilares fundamentais de **IPC (Human-Computer Interaction)**, com o objetivo de criar uma experiência que fosse simultaneamente esteticamente premium e radicalmente inclusiva.

### 1. Acessibilidade de 360º (Privacy & Inclusion by Design)
A aplicação foi desenhada para ser jogável por todos, independentemente das suas capacidades:
- **Acessibilidade Visual**: Modo Daltónico (Alto Contraste P&B) e escalonamento de interface.
- **Áudio Assistido**: Sistema de Text-to-Speech (TTS) que narra as cartas e o estado do jogo para utilizadores com deficiência visual.
- **Navegação Alternativa**: Suporte total para teclado, permitindo jogar sem a necessidade de um rato ou ecrã tátil.

### 2. Performance Extrema (Smooth UX)
Para garantir uma experiência fluida de 60 FPS:
- **CSS Containment**: Otimização de Layout e Paint para reduzir o custo computacional no browser.
- **Hardware Acceleration**: Uso de GPU para transições e animações de cartas.
- **Memoização em React**: Minimização de re-renderizações desnecessárias durante o jogo.

### 3. Design Estético "Glassmorphism"
O projeto utiliza um design moderno baseado no estilo *Glassmorphism*, com transparências, desfoque de fundo e tipografia futurista, proporcionando um aspeto profissional e imersivo.

---

## 📸 Galeria do Projeto

### Interface Principal e Navegação
![Menu Inicial](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173102.png)
![Painel de Opções](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173107.png)

### Regras e Ajuda ao Jogador
![Guia de Jogo](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173119.png)
![Estrutura e Design](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173125.png)
![Acessibilidade Explicada](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173129.png)

### Configuração de Partida
![Seleção de Tema](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173137.png)
![Seleção de Dificuldade](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173145.png)

### Experiência de Jogo (Gameplay)
![Grelha de Jogo](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173153.png)
![Interação com Cartas](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173204.png)
![Menu de Pausa](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173210.png)

### Inclusão e Vitória
![Painel de Acessibilidade](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173115.png)
![Ecrã de Vitória](assets/screenshots/Captura%20de%20ecrã%202026-05-09%20173309.png)

---

## 🛠️ Tecnologias Utilizadas

- **Core**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Estilo**: Vanilla CSS com Variáveis Dinâmicas e Containment
- **Som**: Web Audio API & Web Speech API (TTS)

---

## 📂 Estrutura do Repositório

- `memory-game-web/`: Projeto principal desenvolvido em React + Vite.
- `assets/screenshots/`: Capturas de ecrã da aplicação.
- `docs/`: Documentação técnica e histórico de melhorias.
- `legacy/`: Versões anteriores do projeto (Kivy Desktop e Web Vanilla).

## 👨‍💻 Autor

**Pedro Sousa**
- Universidade de Trás-os-Montes e Alto Douro (**UTAD**)
- Unidade Curricular: **IPC** (Interação Pessoa-Computador)
- GitHub: [PedroSousa-dev13](https://github.com/PedroSousa-dev13)
