// VS Code Portfolio - JavaScript

// Retro 90s Computer Boot Sound using Web Audio API
function playRetroBootSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;

    // Function to create a beep
    function beep(frequency, startTime, duration, type = 'square') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, startTime);

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }

    // Classic 90s boot sequence sounds
    beep(800, now, 0.1);           // Initial beep
    beep(600, now + 0.15, 0.08);   // Second beep
    beep(900, now + 0.3, 0.12);    // Third beep
    beep(400, now + 0.5, 0.15, 'sine'); // Lower tone
    beep(1200, now + 0.7, 0.2);    // Success beep
}

// Super Mario Bros Theme using Web Audio API
let marioMusicContext = null;
let marioIsPlaying = false;

function playMarioTheme() {
    if (marioIsPlaying) {
        stopMarioTheme();
        return;
    }

    marioMusicContext = new (window.AudioContext || window.webkitAudioContext)();
    marioIsPlaying = true;
    const ctx = marioMusicContext;
    const now = ctx.currentTime;

    // Note frequencies
    const E5 = 659.25, C5 = 523.25, G5 = 783.99, G4 = 392.00;
    const E4 = 329.63, A4 = 440.00, B4 = 493.88, As4 = 466.16, D5 = 587.33;

    function note(freq, start, dur) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.12, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, start + dur);
        osc.start(start);
        osc.stop(start + dur);
    }

    // Mario theme melody
    const n = 0.15;
    note(E5, now, n);
    note(E5, now + n * 1.5, n);
    note(E5, now + n * 3, n);
    note(C5, now + n * 4, n);
    note(E5, now + n * 5, n);
    note(G5, now + n * 7, n * 2);
    note(G4, now + n * 11, n * 2);
    note(C5, now + n * 15, n);
    note(G4, now + n * 17, n);
    note(E4, now + n * 19, n);
    note(A4, now + n * 21, n);
    note(B4, now + n * 23, n);
    note(As4, now + n * 24, n);
    note(A4, now + n * 25, n);

    setTimeout(() => {
        marioIsPlaying = false;
        document.getElementById('musicBtn')?.classList.remove('playing');
    }, 5000);
}

function stopMarioTheme() {
    if (marioMusicContext) {
        marioMusicContext.close();
        marioMusicContext = null;
        marioIsPlaying = false;
    }
}

//  Theme System
function setTheme(themeName) {
    console.log('[THEME] Mudando para:', themeName);
    document.body.className = themeName;
    localStorage.setItem('portfolio-theme', themeName);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'theme-retro';
    console.log('[THEME] Carregando tema salvo:', savedTheme);
    document.body.className = savedTheme;
    const selector = document.getElementById('themeSelector');
    if (selector) {
        selector.value = savedTheme;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('[BOOT] Portfolio iniciando...');

    // Load saved theme immediately
    loadTheme();

    let soundPlayed = false;

    // Sound button click handler
    const soundBtn = document.getElementById('soundBtn');
    console.log('[SOUND] Botão encontrado:', !!soundBtn);

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            console.log('[SOUND] Botão clicado!');
            if (!soundPlayed) {
                try {
                    console.log('[SOUND] Tentando tocar som...');
                    playRetroBootSound();
                    soundPlayed = true;
                    soundBtn.style.opacity = '0.3';
                    soundBtn.style.cursor = 'default';
                    soundBtn.querySelector('span').textContent = '♪ Som Ativado!';
                    console.log('[SOUND] ✅ Som tocou!');
                } catch (e) {
                    console.error('[SOUND] ❌ Erro:', e);
                }
            }
        });
    }

    // Theme selector
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        themeSelector.addEventListener('change', (e) => {
            setTheme(e.target.value);
        });
    }

    // Music button
    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!marioIsPlaying) {
                playMarioTheme();
                musicBtn.classList.add('playing');
                musicBtn.textContent = '⏸️ Pausar';
            } else {
                stopMarioTheme();
                musicBtn.classList.remove('playing');
                musicBtn.textContent = '🎵 Música';
            }
        });
    }

    // Hide loader
    setTimeout(() => {
        console.log('[BOOT] Ocultando loader...');
        document.querySelector('.loader-wrapper').classList.add('hidden');
    }, 3000);

    // Tab and File switching
    const tabs = document.querySelectorAll('.tab');
    const files = document.querySelectorAll('.file-tree .file');
    const fileContents = document.querySelectorAll('.file-content');
    const statusFileType = document.querySelector('.file-type');

    // File type mapping
    const fileTypes = {
        'index': 'JavaScript',
        'about': 'Markdown',
        'experience': 'JSON',
        'projects': 'JSX',
        'skills': 'TypeScript',
        'contact': 'Shell Script'
    };

    function switchToFile(fileName) {
        // Update tabs
        tabs.forEach(tab => {
            if (tab.dataset.file === fileName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update sidebar files
        files.forEach(file => {
            if (file.dataset.file === fileName) {
                file.classList.add('active');
            } else {
                file.classList.remove('active');
            }
        });

        // Update file content
        fileContents.forEach(content => {
            if (content.id === `${fileName}-content`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Update status bar
        if (statusFileType && fileTypes[fileName]) {
            statusFileType.textContent = fileTypes[fileName];
        }

        // Update URL hash
        window.location.hash = fileName;

        // Fill content if needed
        const contentDiv = document.querySelector(`#${fileName}-content`);
        if (contentDiv && !contentDiv.dataset.filled) {
            fillContent(fileName, contentDiv);
            contentDiv.dataset.filled = 'true';
        }
    }

    // Event listeners for tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Prevent close button from switching tabs
            if (e.target.classList.contains('tab-close')) {
                return;
            }
            const fileName = tab.dataset.file;
            switchToFile(fileName);
        });
    });

    // Event listeners for sidebar files (with mobile overlay)
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    files.forEach(file => {
        file.addEventListener('click', () => {
            const fileName = file.dataset.file;
            switchToFile(fileName);

            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('show');
                overlay.classList.remove('show');
            }
        });
    });

    // Activity bar and sidebar toggle
    const activityIcons = document.querySelectorAll('.activity-icon');

    activityIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            activityIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');

            // Toggle sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('show');
                overlay.classList.toggle('show');
            }
        });
    });

    // Close sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
        });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
        }
    });

    // Handle hash
    if (window.location.hash) {
        const fileName = window.location.hash.substring(1);
        switchToFile(fileName);
    } else {
        fillContent('index', document.querySelector('#index-content'));
        document.querySelector('#index-content').dataset.filled = 'true';
    }
});

// Fill content dynamically
function fillContent(fileName, contentDiv) {
    let html = '';

    switch (fileName) {
        case 'experience':
            html = `
                <div class="breadcrumb">portfolio > experience.json</div>
                <div class="visual-content">
                    <h2 class="section-title">📊 Experiência Profissional</h2>
                    <div class="timeline">
                        <div class="experience-card">
                            <div class="timeline-marker"></div>
                            <h3>Especialista Front-End</h3>
                            <div class="company">Linx</div>
                            <div class="period">Jul/2024 - Atual</div>
                            <p>Evolução e sustentação de sistemas front-end com foco em qualidade e manutenibilidade. Definição e disseminação de padrões (componentização, organização e revisão de PR). Migração de legado para Angular 19+ (standalone, build e boas práticas). Integração/manutenção de CI/CD com GitHub Actions e ajustes de Nginx para entrega eficiente de assets.</p>
                            <div class="tags">
                                <span class="tag">Angular 19</span>
                                <span class="tag">CI/CD</span>
                                <span class="tag">GitHub Actions</span>
                                <span class="tag">Nginx</span>
                                <span class="tag">Arquitetura</span>
                            </div>
                        </div>
                        
                        <div class="experience-card">
                            <div class="timeline-marker"></div>
                            <h3>Desenvolvedor Front-End Sênior</h3>
                            <div class="company">Cadmus Soluções em TI</div>
                            <div class="period">Ago/2022 - Jul/2024</div>
                            <p>Sustentação e evolução de sistema legado em AngularJS com estabilidade/performance. Melhorias de UI/UX e responsividade. Desenvolvimento mobile em React Native e integrações com serviços internos. Suporte em API/integrações com microsserviços, Keycloak e práticas de qualidade (TDD/testes).</p>
                            <div class="tags">
                                <span class="tag">React Native</span>
                                <span class="tag">AngularJS</span>
                                <span class="tag">Keycloak</span>
                                <span class="tag">TDD</span>
                            </div>
                        </div>

                        <div class="experience-card">
                            <div class="timeline-marker"></div>
                            <h3>Desenvolvedor Front-End Pleno</h3>
                            <div class="company">Capgemini</div>
                            <div class="period">Abr/2021 - Ago/2022</div>
                            <p>Evolução de sistema para cliente bancário. Implementação de testes unitários e TDD (aumento significativo de cobertura).</p>
                            <div class="tags">
                                <span class="tag">Angular</span>
                                <span class="tag">TDD</span>
                                <span class="tag">Testes Unitários</span>
                            </div>
                        </div>

                        <div class="experience-card">
                            <div class="timeline-marker"></div>
                            <h3>GeneXus/Angular Developer</h3>
                            <div class="company">Univali</div>
                            <div class="period">Set/2019 - Abr/2021</div>
                            <p>Evolução de sistemas acadêmicos (GeneXus) e módulos front-end com Angular. Integrações com APIs e banco de dados (Oracle/SQL).</p>
                            <div class="tags">
                                <span class="tag">Angular</span>
                                <span class="tag">GeneXus</span>
                                <span class="tag">Oracle</span>
                            </div>
                        </div>

                        <div class="experience-card">
                            <div class="timeline-marker"></div>
                            <h3>Frontend Developer</h3>
                            <div class="company">QUAY Sistemas e Portais</div>
                            <div class="period">Out/2018 - Set/2019</div>
                            <p>Interfaces responsivas para aplicação white-label, portais e sistemas internos. Foco em performance e experiência do usuário com integrações via APIs.</p>
                            <div class="tags">
                                <span class="tag">JavaScript</span>
                                <span class="tag">Responsivo</span>
                                <span class="tag">Performance</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'projects':
            html = `
                <div class="breadcrumb">portfolio > projects.jsx</div>
                <div class="visual-content">
                    <h2 class="section-title">🚀 Projetos</h2>
                    <div class="projects-grid">
                        <div class="project-card">
                            <div class="year">2025-2026</div>
                            <h3>Instore (OMS • Refatoração / Modernização)</h3>
                            <div class="company">Linx</div>
                            <p>Refatoração completa do OMS Instore, migrando de AngularJS → Angular 19. Reestruturação visando manutenibilidade, escalabilidade e consistência técnica, modernizando a base seguindo melhores práticas do ecossistema Angular.</p>
                            <div class="tags">
                                <span class="tag">Angular 19</span>
                                <span class="tag">Arquitetura</span>
                                <span class="tag">Componentização</span>
                            </div>
                        </div>

                        <div class="project-card">
                            <div class="year">2024</div>
                            <h3>Instore Responsivo (OMS)</h3>
                            <div class="company">Linx</div>
                            <p>Revitalização do OMS Instore com foco em responsividade e modernização da experiência. Implementação de funcionalidades voltadas a UX, incluindo uso de câmera, notificações e melhorias gerais de usabilidade e fluxo.</p>
                            <div class="tags">
                                <span class="tag">Responsivo</span>
                                <span class="tag">UX</span>
                                <span class="tag">Device Features</span>
                            </div>
                        </div>

                        <div class="project-card">
                            <div class="year">2023</div>
                            <h3>Instore Mobile (OMS)</h3>
                            <div class="company">Linx</div>
                            <p>Desenvolvimento de uma versão mobile do OMS Instore baseada no sistema legado. Criação e manutenção do BFF, suportando a comunicação entre o app e serviços internos. Evolução contínua do app com foco em estabilidade e entregas incrementais.</p>
                            <div class="tags">
                                <span class="tag">React Native</span>
                                <span class="tag">BFF</span>
                                <span class="tag">Mobile</span>
                            </div>
                        </div>

                        <div class="project-card">
                            <div class="year">2022-2023</div>
                            <h3>Instore (OMS • Legado)</h3>
                            <div class="company">Linx</div>
                            <p>Manutenção e evolução do OMS Instore (projeto legado em AngularJS). Correções, melhorias incrementais e sustentação contínua do sistema. Implementação de novas features e ajustes de comportamento conforme demandas do produto.</p>
                            <div class="tags">
                                <span class="tag">AngularJS</span>
                                <span class="tag">Manutenção</span>
                            </div>
                        </div>

                        <div class="project-card">
                            <div class="year">2021-2022</div>
                            <h3>Sistema WorkFlow</h3>
                            <div class="company">Banco do Brasil</div>
                            <p>Manutenção e evolução de sistema interno de workflow. Implementação de melhorias e suporte às rotinas do negócio.</p>
                            <div class="tags">
                                <span class="tag">Workflow</span>
                                <span class="tag">Enterprise</span>
                            </div>
                        </div>

                        <div class="project-card">
                            <div class="year">2019-2021</div>
                            <h3>SIP — Sistema Interno de Patrimônios</h3>
                            <div class="company">Univali</div>
                            <p>Desenvolvimento e manutenção de sistema para controle de patrimônios. Evolução de features e suporte contínuo do sistema.</p>
                            <div class="tags">
                                <span class="tag">Gestão</span>
                                <span class="tag">Patrimônio</span>
                            </div>
                        </div>

                        <div class="project-card">
                            <div class="year">2019-2021</div>
                            <h3>Sistema Acadêmico</h3>
                            <div class="company">Univali</div>
                            <p>Manutenção e criação de novas funcionalidades para o sistema acadêmico. Evolução contínua conforme necessidades de alunos e professores.</p>
                            <div class="tags">
                                <span class="tag">Educação</span>
                                <span class="tag">Academia</span>
                            </div>
                        </div>

                        <div class="project-card">
                            <div class="year">2017-2019</div>
                            <h3>Sistema Orçamentário</h3>
                            <div class="company">Quay</div>
                            <p>Criação e manutenção de sistema de planejamento orçamentário. Atuação em contexto de empresas do setor de energia.</p>
                            <div class="tags">
                                <span class="tag">Financeiro</span>
                                <span class="tag">Planejamento</span>
                                <span class="tag">Energia</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'skills':
            html = `
                <div class="breadcrumb">portfolio > skills.ts</div>
                <div class="visual-content">
                    <h2 class="section-title">💻 Stack Principal & Ferramentas</h2>
                    
                    <div class="skills-category">
                        <h3>Frontend</h3>
                        <div class="skills-grid">
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" height="40" alt="Angular" />
                                <div class="skill-name">Angular</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="React" />
                                <div class="skill-name">React</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="TypeScript" />
                                <div class="skill-name">TypeScript</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="JavaScript" />
                                <div class="skill-name">JavaScript</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="HTML5" />
                                <div class="skill-name">HTML5</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="CSS3" />
                                <div class="skill-name">CSS3</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" height="40" alt="Sass" />
                                <div class="skill-name">Sass</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" height="40" alt="Tailwind" />
                                <div class="skill-name">Tailwind</div>
                            </div>
                        </div>
                    </div>

                    <div class="skills-category">
                        <h3>Backend & Infra</h3>
                        <div class="skills-grid">
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="Node.js" />
                                <div class="skill-name">Node.js</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" height="40" alt="NestJS" />
                                <div class="skill-name">NestJS</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height="40" alt="Docker" />
                                <div class="skill-name">Docker</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" height="40" alt="Nginx" />
                                <div class="skill-name">Nginx</div>
                            </div>
                        </div>
                    </div>

                    <div class="skills-category">
                        <h3>Ferramentas & Banco de Dados</h3>
                        <div class="skills-grid">
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" alt="Git" />
                                <div class="skill-name">Git</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="40" alt="PostgreSQL" />
                                <div class="skill-name">PostgreSQL</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40" alt="MongoDB" />
                                <div class="skill-name">MongoDB</div>
                            </div>
                            <div class="skill-card">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" height="40" alt="Oracle" />
                                <div class="skill-name">Oracle</div>
                            </div>
                        </div>
                    </div>

                    <div class="skills-category">
                        <h3>🎓 Formação Acadêmica</h3>
                        <div class="education-cards">
                            <div class="education-card">
                                <h4>🎓 Mestrado em Ciências da Computação</h4>
                                <div class="institution">Universidade do Vale do Itajaí (Univali)</div>
                                <div class="focus">Foco: Machine Learning / Inteligência Artificial</div>
                            </div>
                            <div class="education-card">
                                <h4>📊 Especialização em Big Data</h4>
                                <div class="institution">Universidade do Vale do Itajaí (Univali)</div>
                                <div class="focus">Foco: Big Data / Data Science</div>
                            </div>
                            <div class="education-card highlight">
                                <h4>💻 Bacharelado em Ciência da Computação</h4>
                                <div class="institution">Universidade do Vale do Itajaí (Univali)</div>
                                <div class="focus"><strong>TCC:</strong> Simulador de Estrelas de Quarks (MIT Bag Model)</div>
                                <p>Trabalho focado em astrofísica computacional, desenvolvendo simulações de estruturas estelares exóticas.</p>
                            </div>
                        </div>
                    </div>

                    <div class="github-stats">
                        <h3>📊 GitHub Stats</h3>
                        <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; margin-top: 2rem;">
                            <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=mlesouza&layout=compact&title_color=569cd6&icon_color=c586c0&text_color=d4d4d4&bg_color=1e1e1e&border_color=3e3e42" alt="Top Languages" />
                            <img src="https://github-readme-stats.vercel.app/api?username=mlesouza&show_icons=true&title_color=569cd6&icon_color=c586c0&text_color=d4d4d4&bg_color=1e1e1e&border_color=3e3e42" alt="GitHub Stats" />
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'contact':
            html = `
                <div class="breadcrumb">portfolio > contact.sh</div>
                <div class="visual-content">
                    <h2 class="section-title">📬 Contato</h2>
                    <div class="contact-section">
                        <div class="contact-centered">
                            <p style="font-size: 1.1rem; margin-bottom: 2rem; color: var(--vscode-text-dim);">
                                Interessado em trabalhar juntos? Entre em contato!
                            </p>
                            <div class="contact-cards">
                                <a href="mailto:mlesouza95@gmail.com" class="contact-card">
                                    <div class="contact-icon">📧</div>
                                    <div class="contact-label">Email</div>
                                    <div class="contact-value">mlesouza95@gmail.com</div>
                                </a>
                                <a href="https://github.com/mlesouza" target="_blank" class="contact-card">
                                    <div class="contact-icon">🐙</div>
                                    <div class="contact-label">GitHub</div>
                                    <div class="contact-value">@mlesouza</div>
                                </a>
                                <a href="https://www.linkedin.com/in/mlesouza95" target="_blank" class="contact-card">
                                    <div class="contact-icon">💼</div>
                                    <div class="contact-label">LinkedIn</div>
                                    <div class="contact-value">/in/mlesouza95</div>
                                </a>
                            </div>
                            
                            <div class="availability">
                                <h3>🚀 Disponibilidade</h3>
                                <p>Aberto para:</p>
                                <ul>
                                    <li>✓ Projetos freelance</li>
                                    <li>✓ Consultorias técnicas</li>
                                    <li>✓ Oportunidades full-time</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
    }

    if (html) {
        contentDiv.innerHTML = html;
    }
}
