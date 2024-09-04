# mirage

downloader de mídias sociais feito em javascript.

## o que é o mirage?

o mirage se trata de um downloader de mídia social, que é elegante, fácil de usar e não incomoda você com anúncios ou pop-ups de acordos de invasão de privacidade.

a aplicação não remuxa nenhum vídeo, então os vídeos que você obtém têm a qualidade máxima disponível (a menos que você altere isso nas configurações).

## suporte para

- twitter
- youtube / youtube music
- bilibili.com
- reddit
- vk

## todo

- [ ] mudança de qualidade para bilibili e Twitter
- [ ] limpeza na bagunça que a localização está agora
    - [ ] classificar o conteúdo dos arquivos .json
    - [ ] renomear cada chave de entrada para ficar menos vinculada a um serviço específico (entradas como youtubebroke são horríveis, sinto muito)
- [ ] adição do suporte para mais idiomas quando a limpeza da localização for concluída
- [ ] css limpo
- [ ] utilização do esmbuild para reduzir css e js de frontend
- [ ] tornar os botões de troca nas configurações selecionáveis ​​com o teclado
- [ ] fazer algo sobre o changelog porque o jeito que está agora não é muito bom
- [ ] refazer o módulo de renderização de página para ser mais versátil
- [ ] limpeza do código para ser mais consistente entre os módulos
- [ ] correspondência pode ser refeita
- [ ] suporte para o facebook e instagram
- [ ] suporte para o tiktok (?)
- [ ] suporte para o bilibili.tv (?)

## isenção de responsabilidade

o cronograma de atualização depende da minha motivação. não espere nenhuma consistência nisso.

### requisitos

- node.js v14.16 ou mais recente
- git

### módulos npm

- express
- got
- url-pattern
- xml-js
- dotenv
- express-rate-limit
- ffmpeg-static
- node-cache
- ytdl-core

configure as instalações do script e de todas as dependências **npm** necessárias.

1. clone o repositório: `git clone https://github.com/cvssn/mirage`
2. rode o script de configuração e siga as instruções: `npm run setup`
3. rode o mirage por meio do `npm start` ou `node mirage`
4. feito

## licença

licenciado por meio da [gpl-3.0 license](https://github.com/cvssn/mirage/LICENSE).
