# Sussurros na Mansão — versão com Firebase

Jogo de dedução paranormal (estilo *Deception*) com modo multijogador online, modo solo e o jogo Imagina.
Esta versão usa **Firebase** (login anônimo + Cloud Firestore) e pode ser publicada no **GitHub Pages**.

## Estrutura

```
index.html              arquivo principal (raiz)
css/style.css
js/solo.js              modo solo, efeitos e sons
js/imagina-e-abas.js    jogo Imagina e troca de abas
js/firebase-config.js   CONFIGURAÇÃO DO SEU PROJETO (preencher)
js/backend-firebase.js  ponte entre o jogo e o Firebase
js/multijogador.js      lobby, papéis, noite, dicas e palpites
firestore.rules         regras de segurança do banco
```

## 1. Criar o projeto no Firebase (plano gratuito Spark)

1. Acesse https://console.firebase.google.com e crie um projeto (o Google Analytics pode ficar desativado).
2. **Authentication > Método de login**: ative **Anônimo**.
3. **Firestore Database > Criar banco de dados**: escolha o modo **produção** e a região
   `southamerica-east1 (São Paulo)`, para manter os dados no Brasil.
4. **Firestore Database > Regras**: apague o conteúdo, cole o arquivo `firestore.rules` e clique em **Publicar**.
5. **Configurações do projeto > Seus apps > Web (</>)**: registre um app e copie o objeto `firebaseConfig`.

## 2. Configurar o jogo

Abra `js/firebase-config.js` e substitua cada `COLE_AQUI` pelos valores copiados.

Esses valores identificam o projeto e ficam visíveis no navegador por design do Firebase.
A segurança vem das regras do Firestore. Mesmo assim:
- não coloque nesse arquivo chaves de conta de serviço, senhas ou tokens;
- no Google Cloud Console (APIs e serviços > Credenciais), restrinja a chave de API ao domínio do site
  (`https://SEU_USUARIO.github.io/*`).

## 3. Publicar no GitHub Pages

1. Crie um repositório e envie o conteúdo desta pasta, com o `index.html` na raiz.
2. **Settings > Pages**: em *Source*, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.
3. O endereço será `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/`.
4. No Firebase, **Authentication > Configurações > Domínios autorizados**: adicione `SEU_USUARIO.github.io`.

Para testar no computador, sirva a pasta por HTTP (o navegador bloqueia módulos abertos direto do arquivo):

```
python -m http.server 8000
```

e acesse http://localhost:8000 (o domínio `localhost` já vem autorizado no Firebase).

## Observações

- Cada navegador recebe um id anônimo; não é pedido e-mail nem senha.
- O único dado pessoal gravado é o **apelido** digitado pelo jogador. Para uso em ambiente corporativo,
  valide com as áreas de TI, Segurança da Informação e Privacidade (LGPD) antes de publicar.
- As regras impedem que um jogador grave no lugar de outro (escolha do assassino, dicas do mestre, palpites).
  Porém, como o resultado é calculado no navegador, quem inspecionar o tráfego conseguiria ver a escolha
  do assassino. Para um jogo entre amigos isso é aceitável; para eliminar essa possibilidade seria preciso
  validar os palpites no servidor (Cloud Functions, que exige o plano pago Blaze).
- Salas antigas ficam no banco. Se quiser limpeza automática, configure uma política de TTL no Firestore
  usando o campo `created` das salas.
