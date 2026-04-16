# PRD: Corrigir Service Worker do GitHub Pages raiz interferindo em projetos

## Contexto

O domínio `https://baltazarparra.github.io/` hospeda múltiplos projetos via GitHub Pages, incluindo:

- `https://baltazarparra.github.io/`
- `https://baltazarparra.github.io/ai-native-engineering/`
- outros projetos publicados em subpaths do mesmo domínio

Ao acessar `https://baltazarparra.github.io/ai-native-engineering/`, o navegador às vezes carrega o conteúdo do site raiz `https://baltazarparra.github.io/`. O mesmo comportamento aparece em outros projetos publicados no mesmo domínio.

Foi identificado que existe um Service Worker em:

```txt
https://baltazarparra.github.io/sw.js
```

Esse Service Worker está registrado no escopo raiz (`/`) e usa Workbox com fallback de navegação amplo para `index.html`. Como Service Workers operam por origin e escopo, um Service Worker registrado em `/` pode interceptar navegações para qualquer subpath do mesmo domínio, incluindo `/ai-native-engineering/`.

## Problema

O Service Worker do site raiz está interceptando navegações de projetos hospedados em subdiretórios do GitHub Pages e respondendo com o `index.html` do site raiz.

Isso causa:

- carregamento incorreto de projetos em subpaths;
- comportamento inconsistente entre navegador normal e aba anônima;
- confusão durante deploys, parecendo cache do GitHub Pages quando, na prática, é cache/controlador local do Service Worker;
- risco de afetar todos os projetos em `baltazarparra.github.io/<project-name>/`.

## Objetivo

Garantir que o site raiz `baltazarparra.github.io` não intercepte, cacheie ou faça fallback de navegação para projetos publicados em subpaths.

O acesso a:

```txt
https://baltazarparra.github.io/ai-native-engineering/
```

deve carregar exclusivamente o projeto `ai-native-engineering`, sem receber HTML, assets ou fallback do site raiz.

## Não Objetivos

- Não alterar o projeto `ai-native-engineering`.
- Não alterar configuração de GitHub Pages dos projetos em subpaths.
- Não criar domínio customizado nesta etapa.
- Não reescrever a arquitetura inteira do site raiz, exceto se for necessário para remover ou limitar o Service Worker.

## Hipótese Técnica

O repo alvo é o projeto publicado em:

```txt
https://baltazarparra.github.io/
```

Esse repo provavelmente usa alguma configuração PWA ou Workbox que gera `sw.js`. O fallback de navegação atual aceita todas as rotas, algo equivalente a:

```js
allowlist: [/./]
```

ou uma configuração de `navigateFallback` sem `denylist`.

## Requisitos Funcionais

### RF1: Remover ou restringir o Service Worker do site raiz

Escolher uma das abordagens:

1. Preferencial: remover o Service Worker/PWA do site raiz, caso funcionalidade offline não seja necessária.
2. Alternativa: manter o Service Worker, mas impedir que ele controle rotas de projetos em subpaths.

### RF2: Impedir fallback de navegação para projetos externos ao site raiz

Se o Service Worker for mantido, ele deve negar explicitamente rotas como:

```txt
/ai-native-engineering/
/ai-native-engineering/*
```

e quaisquer outros projetos hospedados sob `baltazarparra.github.io/<project-name>/`.

Exemplo conceitual para Workbox:

```js
navigateFallbackDenylist: [
  /^\/ai-native-engineering(\/|$)/,
  /^\/outro-projeto(\/|$)/,
]
```

O nome exato da opção pode variar conforme a ferramenta usada no repo alvo.

### RF3: Limpar clientes antigos

A correção deve considerar usuários que já têm o Service Worker antigo instalado.

O projeto deve incluir uma estratégia para desregistrar ou substituir o Service Worker antigo. Possíveis opções:

- remover o registro de `navigator.serviceWorker.register(...)`;
- publicar um `sw.js` temporário que execute `self.registration.unregister()`;
- orientar limpeza manual para validação local.

Exemplo de `sw.js` temporário de desativação:

```js
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => self.clients.matchAll())
      .then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      })
  );
});
```

Usar essa abordagem apenas se fizer sentido para o stack do repo alvo.

### RF4: Não afetar assets normais do site raiz

Se o Service Worker for mantido, ele ainda pode cachear assets do site raiz, mas não deve responder HTML de fallback para rotas de outros projetos.

## Requisitos Não Funcionais

- A solução deve ser simples de entender e manter.
- A correção deve evitar uma allowlist global genérica para navegações.
- A solução deve funcionar em Chrome, Edge, Firefox e Safari modernos.
- O comportamento deve ser previsível após deploy no GitHub Pages.

## Plano de Implementação

### Etapa 1: Localizar origem do Service Worker

No repo raiz, procurar por:

```bash
rg -n "serviceWorker|sw\\.js|workbox|PWA|registerRoute|navigateFallback|generateSW|injectManifest|vite-plugin-pwa|next-pwa|gatsby-plugin-offline"
```

Identificar:

- onde `sw.js` é gerado;
- onde o Service Worker é registrado no navegador;
- qual biblioteca/plugin gera a configuração Workbox.

### Etapa 2: Decidir abordagem

Se o site raiz não precisa funcionar offline:

- remover plugin PWA/Workbox;
- remover registro de Service Worker no client;
- garantir que `sw.js` antigo não continue sendo publicado, ou publicar temporariamente um `sw.js` de unregister.

Se o site raiz precisa manter PWA/offline:

- configurar denylist de navegação para projetos em subpaths;
- restringir fallback para somente rotas pertencentes ao site raiz;
- evitar `allowlist: [/./]` para navegação global.

### Etapa 3: Implementar correção

Aplicar a menor mudança possível:

- remover configuração PWA, ou
- ajustar Workbox para negar `/ai-native-engineering`, ou
- substituir `sw.js` por um unregister temporário.

### Etapa 4: Build e deploy

Executar comandos do repo alvo, por exemplo:

```bash
npm run build
```

Depois publicar no GitHub Pages conforme o fluxo existente do repo raiz.

### Etapa 5: Validar

Executar validações com `curl`:

```bash
curl -I https://baltazarparra.github.io/
curl -I https://baltazarparra.github.io/sw.js
curl -I https://baltazarparra.github.io/ai-native-engineering/
```

Validar no navegador:

1. Abrir DevTools.
2. Ir em Application > Service Workers.
3. Confirmar que não há Service Worker raiz interceptando `/ai-native-engineering/`, ou que o novo Service Worker não controla esse path.
4. Abrir `https://baltazarparra.github.io/ai-native-engineering/`.
5. Confirmar que o conteúdo carregado é do projeto `ai-native-engineering`.

Para simular usuário com cache antigo:

```js
const registrations = await navigator.serviceWorker.getRegistrations();
await Promise.all(registrations.map((registration) => registration.unregister()));

const cacheNames = await caches.keys();
await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));

location.reload();
```

## Critérios de Aceite

- `https://baltazarparra.github.io/` continua carregando corretamente.
- `https://baltazarparra.github.io/ai-native-engineering/` carrega o projeto correto.
- Recarregar a página não troca o conteúdo pelo site raiz.
- Abrir em aba normal e anônima apresenta o mesmo projeto correto.
- DevTools não mostra o Service Worker raiz respondendo navegações para `/ai-native-engineering/`.
- Outros projetos em subpaths também deixam de ser interceptados.
- O HTML recebido por `curl https://baltazarparra.github.io/ai-native-engineering/` contém metadados do projeto `AI-Native Engineering`, não do site raiz.

## Riscos

- Usuários que já instalaram o Service Worker antigo podem continuar com comportamento incorreto até o navegador atualizar ou remover o SW.
- Se o site raiz depende de PWA/offline, remover completamente o Service Worker pode eliminar essa funcionalidade.
- GitHub Pages adiciona cache HTTP de curta duração, então mudanças podem levar alguns minutos para aparecer, mesmo depois do deploy.

## Rollback

Se a alteração quebrar o site raiz:

1. Reverter o commit da mudança no repo raiz.
2. Fazer novo deploy.
3. Limpar Service Worker/cache local para validar.

Se o problema voltar após rollback, considerar manter o Service Worker removido até haver uma configuração segura por subpath.

## Definição de Pronto

A tarefa está pronta quando:

- o site raiz não intercepta navegações de projetos em subpaths;
- o projeto `ai-native-engineering` abre corretamente em navegador normal após limpar ou atualizar Service Worker antigo;
- existe registro claro no PR explicando que a causa era um Service Worker de escopo raiz com fallback de navegação amplo;
- os passos de validação foram executados e documentados no PR.

