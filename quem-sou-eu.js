const TEMAS=[["🎭 Personagens e famosos","Personagens da Disney",["Mickey Mouse","Minnie","Pateta","Pato Donald","Simba","Timão","Pumba","Ariel","Bela","Fera","Aladdin","Gênio da lâmpada","Elsa","Olaf","Mulan","Stitch","Woody","Buzz Lightyear","Maui","Branca de Neve"]],["🎭 Personagens e famosos","Super-heróis",["Super-Homem","Batman","Mulher-Maravilha","Homem-Aranha","Homem de Ferro","Capitão América","Thor","Hulk","Viúva Negra","Pantera Negra","Flash","Aquaman","Lanterna Verde","Wolverine","Deadpool","Doutor Estranho","Homem-Formiga","Capitã Marvel","Tempestade","Groot"]],["🎭 Personagens e famosos","Vilões de filmes",["Darth Vader","Coringa","Voldemort","Thanos","Scar","Malévola","Cruella","Hannibal Lecter","Freddy Krueger","Jason Voorhees","Michael Myers","Chucky","Lord Farquaad","Hades","Úrsula","Gaston","Capitão Gancho","Rainha de Copas","Sauron","Ghostface"]],["🎭 Personagens e famosos","Personagens de anime",["Goku","Naruto","Luffy","Sasuke","Vegeta","Sailor Moon","Pikachu","Ash Ketchum","Eren Yeager","Levi Ackerman","Tanjiro","Nezuko","Saitama","Light Yagami","Edward Elric","Ichigo","Totoro","Deku","Killua","Seiya de Pégaso"]],["🎭 Personagens e famosos","Personagens de desenhos antigos",["Pernalonga","Patolino","Piu-Piu","Frajola","Papa-Léguas","Tom","Jerry","Zé Colmeia","Scooby-Doo","Salsicha","Fred Flintstone","Barney Rubble","George Jetson","He-Man","Esqueleto","Pantera Cor-de-Rosa","Popeye","Pica-Pau","Manda-Chuva","Dick Vigarista"]],["🎭 Personagens e famosos","Personagens de Harry Potter",["Harry Potter","Rony Weasley","Hermione Granger","Dumbledore","Snape","Hagrid","Voldemort","Draco Malfoy","Sirius Black","Remo Lupin","Luna Lovegood","Neville Longbottom","Gina Weasley","Fred e Jorge Weasley","Minerva McGonagall","Bellatrix Lestrange","Dobby","Argo Filch","Dolores Umbridge","Olho-Tonto Moody"]],["🎭 Personagens e famosos","Personagens de Stranger Things",["Eleven","Mike Wheeler","Dustin Henderson","Lucas Sinclair","Will Byers","Max Mayfield","Steve Harrington","Nancy Wheeler","Jonathan Byers","Joyce Byers","Jim Hopper","Robin Buckley","Eddie Munson","Billy Hargrove","Demogorgon","Vecna","Devorador de Mentes","Murray Bauman","Erica Sinclair","Dr. Brenner (Papa)"]],["🎭 Personagens e famosos","Celebridades brasileiras",["Xuxa","Silvio Santos","Faustão","Ivete Sangalo","Anitta","Neymar","Gisele Bündchen","Fernanda Montenegro","Fátima Bernardes","Ratinho","Luciano Huck","Ana Maria Braga","Tiago Leifert","Wagner Moura","Rodrigo Hilbert","Paolla Oliveira","Marcos Mion","Whindersson Nunes","Juliette","Pelé"]],["🎭 Personagens e famosos","Cantores famosos",["Roberto Carlos","Michael Jackson","Beyoncé","Madonna","Elvis Presley","Freddie Mercury","Caetano Veloso","Marília Mendonça","Gusttavo Lima","Rihanna","Taylor Swift","Bruno Mars","Elis Regina","Cazuza","Raul Seixas","Ed Sheeran","Lady Gaga","Shakira","Frank Sinatra","Whitney Houston"]],["🎭 Personagens e famosos","Políticos",["Getúlio Vargas","Juscelino Kubitschek","Dom Pedro II","Tancredo Neves","Ulysses Guimarães","Itamar Franco","Fernando Henrique Cardoso","Lula","Dilma Rousseff","Jair Bolsonaro","Michel Temer","Marina Silva","Ciro Gomes","Geraldo Alckmin","José Sarney","Fernando Collor","Jânio Quadros","Barack Obama","Abraham Lincoln","Winston Churchill"]],["🎭 Personagens e famosos","Personagens de novelas",["Odete Roitman","Nazaré Tedesco","Carminha","Tufão","Maria de Fátima","Maria do Bairro","Cirilo (Carrossel)","Maria Joaquina","Viúva Porcina","Sinhozinho Malta","Tieta","Jade (O Clone)","Tereza Cristina","Bia Falcão","Perpétua","Max (Avenida Brasil)","Nina (Avenida Brasil)","Olenka","Dona Redonda","Jorginho"]],["🎭 Personagens e famosos","Personagens de jogos",["Mario","Luigi","Sonic","Link","Princesa Zelda","Pac-Man","Donkey Kong","Kirby","Lara Croft","Master Chief","Kratos","Steve (Minecraft)","Creeper","Crash Bandicoot","Ryu","Sub-Zero","Scorpion","Samus Aran","Bowser","Geralt de Rívia"]],["🐾 Animais e natureza","Animais selvagens",["Leão","Tigre","Elefante","Girafa","Zebra","Hipopótamo","Rinoceronte","Lobo","Urso-pardo","Gorila","Chimpanzé","Onça-pintada","Lobo-guará","Canguru","Panda","Guepardo","Hiena","Jacaré","Camelo","Tamanduá-bandeira"]],["🐾 Animais e natureza","Animais domésticos",["Cachorro","Gato","Coelho","Hamster","Porquinho-da-índia","Periquito","Calopsita","Cavalo","Vaca","Porco","Galinha","Ovelha","Cabra","Pato","Peixe-beta","Tartaruga","Furão","Burro","Canário","Chinchila"]],["🐾 Animais e natureza","Animais marinhos",["Baleia-azul","Golfinho","Tubarão-branco","Polvo","Lula","Água-viva","Estrela-do-mar","Cavalo-marinho","Tartaruga-marinha","Arraia","Orca","Foca","Leão-marinho","Caranguejo","Lagosta","Peixe-palhaço","Baiacu","Moreia","Peixe-boi","Narval"]],["🐾 Animais e natureza","Dinossauros",["Tiranossauro Rex","Velociraptor","Triceratops","Estegossauro","Brontossauro","Braquiossauro","Espinossauro","Anquilossauro","Diplodoco","Pterodáctilo","Alossauro","Carnotauro","Giganotossauro","Parassaurolofo","Iguanodonte","Compsognato","Dilofossauro","Paquicefalossauro","Barionix","Oviraptor"]],["🐾 Animais e natureza","Insetos",["Abelha","Formiga","Borboleta","Mosquito","Mosca","Barata","Besouro","Joaninha","Libélula","Gafanhoto","Grilo","Cigarra","Vespa","Cupim","Pernilongo","Louva-a-deus","Vaga-lume","Pulga","Percevejo","Bicho-pau"]],["🐾 Animais e natureza","Aves",["Águia","Coruja","Arara-azul","Tucano","Beija-flor","Pinguim","Avestruz","Pavão","Flamingo","Falcão","Urubu","Pelicano","Sabiá","Bem-te-vi","Pardal","Gavião","Cisne","Pombo","João-de-barro","Emu"]],["🐾 Animais e natureza","Animais extintos",["Mamute","Dodô","Tigre-dente-de-sabre","Tigre-da-tasmânia","Megalodonte","Pombo-passageiro","Mastodonte","Preguiça-gigante","Auroque","Alca-gigante","Quagga","Moa","Rinoceronte-lanoso","Urso-das-cavernas","Vaca-marinha-de-Steller","Gliptodonte","Lobo-terrível","Leão-americano","Alce-irlandês","Pássaro-elefante"]],["🐾 Animais e natureza","Criaturas mitológicas",["Dragão","Fênix","Unicórnio","Sereia","Centauro","Minotauro","Medusa","Hidra","Grifo","Pégaso","Cérbero","Esfinge","Kraken","Ciclope","Curupira","Saci-Pererê","Iara","Boitatá","Mula sem cabeça","Boto-cor-de-rosa"]],["🍕 Coisas do cotidiano","Comidas brasileiras",["Feijoada","Coxinha","Pão de queijo","Brigadeiro","Acarajé","Moqueca","Farofa","Pastel","Tapioca","Açaí","Churrasco","Baião de dois","Vatapá","Pamonha","Paçoca","Quindim","Cuscuz","Tacacá","Escondidinho","Pudim"]],["🍕 Coisas do cotidiano","Frutas",["Banana","Maçã","Laranja","Uva","Melancia","Abacaxi","Manga","Morango","Mamão","Limão","Maracujá","Goiaba","Caju","Jabuticaba","Pitanga","Acerola","Kiwi","Pera","Melão","Cupuaçu"]],["🍕 Coisas do cotidiano","Bebidas",["Café","Guaraná","Coca-Cola","Suco de laranja","Caipirinha","Cerveja","Vinho","Chá","Leite","Água de coco","Chimarrão","Cachaça","Limonada","Energético","Água com gás","Milkshake","Chocolate quente","Caldo de cana","Vitamina de banana","Refrigerante"]],["🍕 Coisas do cotidiano","Objetos de cozinha",["Panela","Frigideira","Colher","Garfo","Faca","Concha","Escumadeira","Ralador","Peneira","Espátula","Tábua de corte","Abridor de latas","Saca-rolhas","Panela de pressão","Chaleira","Rolo de massa","Batedor de ovos","Pegador de macarrão","Forma de bolo","Coador de café"]],["🍕 Coisas do cotidiano","Eletrodomésticos",["Geladeira","Fogão","Micro-ondas","Máquina de lavar","Liquidificador","Ventilador","Ar-condicionado","Batedeira","Aspirador de pó","Ferro de passar","Televisão","Air fryer","Cafeteira","Torradeira","Secador de cabelo","Chuveiro elétrico","Processador de alimentos","Lava-louças","Sanduicheira","Robô aspirador"]],["🍕 Coisas do cotidiano","Marcas famosas",["Coca-Cola","Nike","Apple","Samsung","McDonald's","Nestlé","Havaianas","Adidas","Google","Netflix","Disney","Toyota","Magazine Luiza","Natura","Itaú","Casas Bahia","Bob's","Mercado Livre","Ferrari","Lego"]],["🍕 Coisas do cotidiano","Profissões",["Médico","Professor","Bombeiro","Policial","Engenheiro","Advogado","Padeiro","Dentista","Motorista","Cozinheiro","Eletricista","Piloto","Jornalista","Enfermeiro","Pedreiro","Cabeleireiro","Programador","Veterinário","Garçom","Astronauta"]],["🍕 Coisas do cotidiano","Meios de transporte",["Carro","Ônibus","Metrô","Trem","Avião","Navio","Bicicleta","Moto","Caminhão","Helicóptero","Barco","Patinete","Skate","Balão de ar quente","Foguete","Táxi","Carroça","Teleférico","Submarino","Jangada"]],["🍕 Coisas do cotidiano","Objetos escolares",["Lápis","Caneta","Borracha","Apontador","Caderno","Mochila","Régua","Cola","Tesoura","Lousa","Giz","Estojo","Livro","Compasso","Transferidor","Calculadora","Marca-texto","Agenda","Corretivo","Lápis de cor"]],["🎮 Cultura pop e entretenimento","Jogos de videogame",["Minecraft","Fortnite","GTA","EA FC (FIFA)","Free Fire","Roblox","The Last of Us","God of War","The Legend of Zelda","Super Mario Bros.","Pokémon","Call of Duty","League of Legends","Counter-Strike","Among Us","Tetris","The Sims","Mortal Kombat","Street Fighter","Resident Evil"]],["🎮 Cultura pop e entretenimento","Memes brasileiros",["Nazaré confusa","\"Cala a boca, Galvão\"","\"Errou!\" do Faustão","\"Receba!\" do Luva de Pedreiro","Pavê ou pacofi?","\"Foi sem querer querendo\"","\"Não contavam com a minha astúcia\"","Tiozão do Zap (bom dia com café)","\"Mãe, tô na Globo\"","Conga, conga, conga","Sextou!","\"Que isso, meu filho, calma!\"","Cachorro caramelo","7 a 1","\"Quem quer dinheiro?\"","\"É pegadinha do Mallandro!\"","Rindo de nervoso","\"Quem nunca?\"","Vai que cola","Gaúcho: \"Bah, tchê!\""]],["🎮 Cultura pop e entretenimento","Youtubers e streamers",["Felipe Neto","Luccas Neto","Whindersson Nunes","Casimiro","Gaules","Alanzoka","Cellbit","Kéfera","Rezendeevil","Authentic Games","Manual do Mundo","Canal Nostalgia","Julia Minegirl","Jazzghost","MrBeast","PewDiePie","Ninja","Markiplier","Pokimane","Mark Rober"]],["🎮 Cultura pop e entretenimento","Filmes de terror",["O Exorcista","Invocação do Mal","It: A Coisa","O Iluminado","Psicose","Sexta-Feira 13","A Hora do Pesadelo","Halloween","Pânico","Atividade Paranormal","O Chamado","Jogos Mortais","Um Lugar Silencioso","Hereditário","Corra!","Sobrenatural","Annabelle","A Freira","Cemitério Maldito","O Massacre da Serra Elétrica"]],["🎮 Cultura pop e entretenimento","Filmes de animação",["Toy Story","O Rei Leão","Procurando Nemo","Shrek","Frozen","Divertida Mente","Moana","Up: Altas Aventuras","Carros","Os Incríveis","Ratatouille","WALL-E","Meu Malvado Favorito","Madagascar","A Era do Gelo","Kung Fu Panda","Como Treinar o Seu Dragão","Encanto","Zootopia","A Viagem de Chihiro"]],["🎮 Cultura pop e entretenimento","Séries famosas",["Friends","Breaking Bad","Game of Thrones","La Casa de Papel","Round 6","The Office","Peaky Blinders","Grey's Anatomy","The Big Bang Theory","How I Met Your Mother","Lost","Dark","The Walking Dead","Black Mirror","Wandinha","The Last of Us","The Crown","Supernatural","Prison Break","Os Simpsons"]],["🎮 Cultura pop e entretenimento","Músicas",["\"Evidências\"","\"Asa Branca\"","\"Garota de Ipanema\"","\"Bohemian Rhapsody\"","\"Billie Jean\"","\"Imagine\"","\"Aquarela\"","\"Ai Se Eu Te Pego\"","\"Despacito\"","\"Shake It Off\"","\"Baby Shark\"","\"Macarena\"","\"Gangnam Style\"","\"Smells Like Teen Spirit\"","\"Hotel California\"","\"Thriller\"","\"Wannabe\"","\"Shallow\"","\"Mas Que Nada\"","\"Parabéns pra Você\""]],["🎮 Cultura pop e entretenimento","Bandas",["Legião Urbana","Titãs","Paralamas do Sucesso","Barão Vermelho","Skank","Charlie Brown Jr.","Capital Inicial","Engenheiros do Hawaii","Raimundos","Sepultura","The Beatles","Queen","Rolling Stones","Led Zeppelin","Pink Floyd","AC/DC","Nirvana","Metallica","Coldplay","BTS"]],["🎮 Cultura pop e entretenimento","Personagens de RPG",["Gandalf","Aragorn","Legolas","Gimli","Drizzt Do'Urden","Elminster","Strahd von Zarovich","Tiamat","Vecna","Minsc e Boo","Geralt de Rívia","Yennefer","Mago","Guerreiro","Ladino","Clérigo","Bárbaro","Bardo","Paladino","Druida"]],["🧠 Temas mais difíceis e engraçados","Coisas que dão medo",["Escuro","Aranha","Barata","Altura","Palhaço","Fantasma","Cobra","Agulha","Dentista","Trovão","Tubarão","Boneca assustadora","Cemitério","Casa abandonada","Elevador parado","Lobisomem","Zumbi","Rato","Espelho à noite","Segunda-feira"]],["🧠 Temas mais difíceis e engraçados","Coisas que existem no espaço",["Sol","Lua","Terra","Marte","Júpiter","Saturno","Vênus","Mercúrio","Urano","Netuno","Plutão","Cometa","Asteroide","Buraco negro","Via Láctea","Estrela cadente","Satélite","Nebulosa","Supernova","Estação Espacial Internacional"]],["🧠 Temas mais difíceis e engraçados","Pessoas históricas",["Dom Pedro I","Tiradentes","Cleópatra","Napoleão Bonaparte","Albert Einstein","Leonardo da Vinci","Santos Dumont","Galileu Galilei","Isaac Newton","Cristóvão Colombo","Pedro Álvares Cabral","Joana d'Arc","Júlio César","Alexandre, o Grande","Marie Curie","Mahatma Gandhi","Martin Luther King","Nelson Mandela","Zumbi dos Palmares","Machado de Assis"]],["🧠 Temas mais difíceis e engraçados","Deuses da mitologia",["Zeus","Hera","Poseidon","Hades","Atena","Apolo","Ártemis","Afrodite","Ares","Hermes","Dionísio","Hefesto","Odin","Thor","Loki","Freya","Rá","Anúbis","Osíris","Tupã"]],["🧠 Temas mais difíceis e engraçados","Monstros e criaturas sobrenaturais",["Vampiro","Lobisomem","Zumbi","Fantasma","Bruxa","Múmia","Frankenstein","Drácula","Bicho-papão","Chupa-cabra","Slender Man","Pé-Grande","Yeti","Monstro do Lago Ness","Banshee","Gárgula","Loira do Banheiro","Cuca","Homem do Saco","Boneco assassino"]],["🧠 Temas mais difíceis e engraçados","Coisas que começam com uma letra específica (exemplo: letra B)",["Banana","Bola","Bruxa","Batman","Bolo","Barata","Banheira","Bicicleta","Baleia","Bumbo","Bombeiro","Borboleta","Bússola","Bigode","Balão","Biscoito","Bode","Bandeira","Batata","Buzina"]],["🧠 Temas mais difíceis e engraçados","Coisas que você encontra em um banheiro",["Vaso sanitário","Pia","Chuveiro","Espelho","Sabonete","Shampoo","Condicionador","Toalha","Escova de dentes","Pasta de dente","Papel higiênico","Tapete de banheiro","Desodorante","Fio dental","Box","Ralo","Cesto de lixo","Secador de cabelo","Banheira","Esponja de banho"]],["🧠 Temas mais difíceis e engraçados","Coisas que ninguém gostaria de ser",["Barata","Mosquito","Meia furada","Pneu furado","Chiclete no chão","Fila do banco","Segunda-feira","Despertador","Conta de luz","Boleto vencido","Alarme de incêndio","Pilha fraca","Chinelo sem par","Panetone no fim de janeiro","Controle sem pilha","Wi-Fi caído","Bateria em 1%","Coador de café usado","Lixeira cheia","Guarda-chuva virado do avesso"]],["🧠 Temas mais difíceis e engraçados","Objetos inúteis",["Controle remoto sem pilha","Caneta sem tinta","Guarda-chuva quebrado","Calendário vencido","Pilha descarregada","Relógio parado","Disquete","Fax","Pen drive de 128 MB","Cabo de carregador quebrado","Chaveiro de brinde","Ímã de geladeira","Sapato de um pé só","Cabide torto","Pote de sorvete cheio de feijão","Manual de instruções","Garrafa térmica furada","Máquina de escrever","Fita cassete sem toca-fitas","Bússola quebrada"]],["🧠 Temas mais difíceis e engraçados","Coisas absurdas",["Elefante de patins","Peixe que anda de bicicleta","Tartaruga astronauta","Cachorro de terno","Geladeira que fala","Nuvem de algodão-doce","Pinguim no deserto","Casa de macarrão","Girafa no elevador","Rio de chocolate","Gato que lê jornal","Unicórnio de chinelo","Dinossauro no ônibus","Vaca voadora","Sofá na Lua","Banana de pijama","Sol de óculos escuros","Ônibus que voa","Pato de salto alto","Pizza de brigadeiro"]],["🍻 Temas para deixar a brincadeira caótica","Memes absurdos",["Doge","Grumpy Cat","Nyan Cat","Rick Astley (rickroll)","Trollface","Homem-Aranha apontando","Namorado distraído","Cachorro na casa pegando fogo","Pikachu surpreso","Baby Yoda","Cheems","Hide the Pain Harold","Bad Luck Brian","Gato digitando","Capivara \"Ok, I pull up\"","Skibidi Toilet","Nazaré confusa","Michael Jordan chorando","Salt Bae","Gato girando"]],["🍻 Temas para deixar a brincadeira caótica","Personagens que passam vergonha",["Mr. Bean","Michael Scott","Chaves","Quico","Bob Esponja","Patrick Estrela","Pateta","Homer Simpson","Ross Geller","Joey Tribbiani","Bridget Jones","Rony Weasley","Shrek","Burro (Shrek)","Lula Molusco","Minion Bob","Dory","Tom (Tom e Jerry)","Sid (A Era do Gelo)","Zé Carioca"]],["🍻 Temas para deixar a brincadeira caótica","Coisas que parecem uma pessoa",["Espantalho","Manequim","Boneco de posto","Boneco de neve","Estátua","Sombra no corredor","Casaco no cabide","Árvore no escuro","Boneco de ventríloquo","Ventilador de pé","Estátua viva","Boneco de Olinda","Mascote de loja","Robô humanoide","Tomada com carinha","Nuvem em forma de rosto","Fantoche","Sósia","Boneco de teste de colisão","Poste de luz"]],["🍻 Temas para deixar a brincadeira caótica","Celebridades em situações estranhas",["Faustão em uma aula de balé","Anitta lavando louça","Neymar jogando xadrez","Ratinho como motorista de aplicativo","Cristiano Ronaldo no karaokê","Gisele Bündchen na fila do banco","Xuxa em um churrasco de domingo","Ivete Sangalo em um retiro de silêncio","Ronaldo Fenômeno cuidando de uma horta","Elon Musk vendendo coxinha","Taylor Swift no pagode do quintal","Roberto Carlos jogando videogame","Ana Maria Braga em uma montanha-russa","Luciano Huck no plantão da emergência","Rodrigo Hilbert consertando o Wi-Fi","Beyoncé na reunião de condomínio","Whindersson Nunes em um debate sério","Casimiro narrando uma partida de xadrez","Gusttavo Lima na feira","Wagner Moura apresentando o Show do Milhão"]],["🍻 Temas para deixar a brincadeira caótica","Animais com profissões",["Gato barista","Cachorro policial","Coruja professora","Macaco programador","Porco chef de cozinha","Pinguim garçom","Elefante bombeiro","Girafa eletricista","Tartaruga entregadora","Coelho atleta","Raposa advogada","Urso padeiro","Leão dentista","Papagaio locutor de rádio","Preguiça atendente de SAC","Abelha empresária","Camaleão designer","Polvo digitador","Peixe médico","Vaca cantora sertaneja"]],["🍻 Temas para deixar a brincadeira caótica","Objetos que poderiam falar",["Despertador","Geladeira","Controle remoto","Sofá","Chinelo","Celular","Cafeteira","Panela","Espelho","Vaso sanitário","Escova de dentes","Mochila","Travesseiro","Guarda-roupa","Notebook","Impressora","Carteira","Chaves de casa","Relógio","Cadeira de escritório"]],["🍻 Temas para deixar a brincadeira caótica","Personagens que seriam péssimos colegas de trabalho",["Coringa","Darth Vader","Odete Roitman","Hulk","Pateta","Pica-Pau","Gollum","Tio Patinhas","Rainha de Copas","Thanos","Gaston","Homer Simpson","Sheldon Cooper","Michael Scott","Dwight Schrute","Cruella","Loki","Chaves","Scar","Capitão Gancho"]],["🍻 Temas para deixar a brincadeira caótica","Coisas que você não gostaria de encontrar às 3 da manhã",["Barata voadora","Vulto no corredor","Aranha na parede","Palhaço na janela","Boneca sorrindo","Barulho na cozinha","Alarme de incêndio","Geladeira abrindo sozinha","Cobrador batendo na porta","Chefe ligando","Ex mandando mensagem","Lobisomem","Gato encarando você","Luz piscando","Passos no teto","Gambá","Morcego dentro de casa","Rato no fogão","Notificação do banco","Vizinho tocando bateria"]]];
(function(){
"use strict";
/* Quem Sou Eu — multijogador (Firebase). Temas vindos do Banco de Temas enviado pelo usuário. */
const MIN=2, MAX=8, DUR_MIN=30, DUR_MAX=300, DUR_STEP=30;
const root=document.getElementById("qse");
if(!root) return;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\(.*?\)/g," ").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=a=>a[Math.floor(Math.random()*a.length)];
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}}};
const fmt=ms=>{const t=Math.max(0,Math.ceil(ms/1000));return Math.floor(t/60)+":"+String(t%60).padStart(2,"0");};
const CATS=[...new Set(TEMAS.map(t=>t[0]))];
const COLORS=["#e0192a","#9d3cff","#2fb8a6","#f5b942","#3f8cff","#ff6fb5","#7fc49d","#ff8a3d"];

const S={state:"loading",db:null,me:null,name:ls.get("sm-nome")||"",code:null,game:null,players:{},assign:{},questions:{},answers:{},done:{},
  subs:[],loaded:{},busy:false,msg:"",theme:"",item:"rand",lastToast:"",advancedFor:null,phaseFor:null};

/* ---------- derivações ---------- */
const G=()=>S.game, M=()=>(G()&&G().match)||0;
const order=()=>(G()&&G().order)||[];
const nameOf=id=>(S.players[id]&&S.players[id].name)||(G()&&G().names&&G().names[id])||"Jogador";
const assignFor=id=>S.assign["m"+M()+"_"+id];
const doneList=()=>Object.values(S.done).filter(d=>d.match===M()).sort((a,b)=>a.at-b.at);
const isDone=id=>doneList().some(d=>d.by===id);
const isHost=()=>G()&&G().host===S.me;
const cur=()=>order()[(G()&&G().turn)||0];
const turnNo=()=>(G()&&G().turnNo)||0;
const curQ=()=>S.questions["m"+M()+"_t"+turnNo()];
const curAnswers=()=>Object.values(S.answers).filter(a=>a.match===M()&&a.turnNo===turnNo());
const over=()=>G()&&G().phase==="jogo"&&order().length>=2&&doneList().length>=order().length-1;
const timeLeft=()=>G()&&G().turnStart?G().turnStart+(G().dur||60)*1000-Date.now():0;
const sortedPlayers=()=>Object.entries(S.players).sort((a,b)=>(a[1].joined||0)-(b[1].joined||0));
const targetOf=id=>G()&&G().pairs?G().pairs[id]:null;

/* ---------- conexão ---------- */
function getBackend(){return new Promise(res=>{
  if(window.mpBackend) return res(window.mpBackend);
  const t=setTimeout(()=>res(null),10000);
  window.addEventListener("mp-backend",()=>{clearTimeout(t);res(window.mpBackend);},{once:true});
});}
async function init(){
  render();
  let be=null; try{be=await getBackend();}catch(e){}
  if(!be){S.state="off";return render();}
  S.db=be.db; S.me=await be.user.id(); S.state="ready";
  const saved=ls.get("qse-sala"); if(saved) subscribe(saved); else render();
}
function unsubscribe(){S.subs.forEach(u=>{try{u()}catch(e){}});S.subs=[];}
function subscribe(code){
  unsubscribe();
  Object.assign(S,{code,game:null,players:{},assign:{},questions:{},answers:{},done:{},loaded:{},msg:""});
  ls.set("qse-sala",code);
  const base="qse/"+code, db=S.db;
  const fail=e=>{S.msg="A conexão com a sala caiu ("+(e&&e.code||"erro")+"). Saia e entre de novo.";render();};
  const coll=(p,key)=>db.collection(base+"/"+p).onSnapshot(q=>{const o={};q.docs.forEach(d=>o[d.id]=d.data());S[key]=o;S.loaded[key]=true;render();},fail);
  S.subs.push(db.doc(base).onSnapshot(s=>{S.game=s.exists?s.data():null;S.loaded.game=true;render();},fail));
  S.subs.push(coll("players","players"),coll("assign","assign"),coll("questions","questions"),coll("answers","answers"),coll("done","done"));
  render();
}
function leaveLocal(){unsubscribe();S.code=null;S.game=null;ls.set("qse-sala",null);render();}

/* ---------- ações ---------- */
async function run(fn){
  if(S.busy) return; S.busy=true; S.msg=""; render();
  try{await fn();}catch(e){S.msg=(e&&e.code==="permission-denied")?"O servidor recusou a ação (regras do Firestore). Confira se as regras novas foram publicadas.":"Algo deu errado. Tente de novo.";}
  S.busy=false; render();
}
function readName(){const v=(document.getElementById("qseName")||{}).value;const n=String(v||S.name).trim().slice(0,20);if(n.length<2){S.msg="Digite um nome com pelo menos 2 letras.";render();return null;}S.name=n;ls.set("sm-nome",n);return n;}
const L="ABCDEFGHJKLMNPQRSTUVWXYZ";
const newCode=()=>Array.from({length:4},()=>L[Math.floor(Math.random()*L.length)]).join("");
function nextTurnFrom(idx,extraDone){
  const o=order(), n=o.length;
  for(let k=1;k<=n;k++){const j=(idx+k)%n; const id=o[j]; if(!isDone(id)&&id!==extraDone) return j;}
  return idx;
}
function advance(extraDone){
  if(!G()||G().phase!=="jogo") return Promise.resolve();
  const t=turnNo(); S.advancedFor=t;
  return S.db.doc("qse/"+S.code).update({turn:nextTurnFrom(G().turn||0,extraDone),turnNo:t+1,turnStart:Date.now()});
}
function similar(a,b){
  a=norm(a);b=norm(b); if(!a||!b) return false; if(a===b) return true;
  const strip=x=>x.replace(/\b(o|a|os|as|de|da|do|dos|das|e|the)\b/g," ").replace(/\s+/g," ").trim();
  a=strip(a);b=strip(b); if(a===b) return true;
  const m=a.length,n=b.length; if(Math.abs(m-n)>3) return false;
  const d=Array.from({length:m+1},(_,i)=>[i]); for(let j=1;j<=n;j++)d[0][j]=j;
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  return d[m][n]<=Math.max(1,Math.floor(Math.max(m,n)*0.2));
}
const A={
  create:()=>{const n=readName();if(!n)return;run(async()=>{
    let code; for(let t=0;t<6;t++){code=newCode();const s=await S.db.doc("qse/"+code).get();if(!s.exists)break;}
    await S.db.doc("qse/"+code).set({host:S.me,phase:"lobby",match:0,dur:60,created:Date.now()});
    await S.db.doc("qse/"+code+"/players/"+S.me).set({name:n,joined:Date.now()});
    subscribe(code);});},
  join:()=>{const n=readName();if(!n)return;const code=String((document.getElementById("qseCode")||{}).value||"").trim().toUpperCase();
    if(!/^[A-Z]{4}$/.test(code)){S.msg="O código da sala tem 4 letras.";return render();}
    run(async()=>{
      const g=await S.db.doc("qse/"+code).get(); if(!g.exists){S.msg="Sala "+code+" não encontrada.";return;}
      const ps=await S.db.collection("qse/"+code+"/players").get();
      const mine=ps.docs.find(d=>d.id===S.me);
      if(!mine&&ps.size>=MAX){S.msg="Sala cheia (máximo "+MAX+").";return;}
      await S.db.doc("qse/"+code+"/players/"+S.me).set({name:n,joined:mine?(mine.data().joined||Date.now()):Date.now()});
      subscribe(code);});},
  leave:()=>run(async()=>{await S.db.doc("qse/"+S.code+"/players/"+S.me).delete();leaveLocal();}),
  forget:()=>leaveLocal(),
  kick:id=>run(()=>S.db.doc("qse/"+S.code+"/players/"+id).delete()),
  claim:()=>run(()=>S.db.doc("qse/"+S.code).update({host:S.me})),
  dur:d=>{const v=Math.min(DUR_MAX,Math.max(DUR_MIN,((G()&&G().dur)||60)+d));run(()=>S.db.doc("qse/"+S.code).update({dur:v}));},
  start:()=>run(async()=>{
    const ids=sortedPlayers().map(([id])=>id);
    if(ids.length<MIN||ids.length>MAX){S.msg="São precisos de "+MIN+" a "+MAX+" jogadores.";return;}
    const o=shuffle(ids), pairs={}, names={};
    o.forEach((id,i)=>{pairs[id]=o[(i+1)%o.length];names[id]=nameOf(id);});
    await S.db.doc("qse/"+S.code).update({phase:"escolha",match:M()+1,order:o,pairs,names,turn:0,turnNo:0,turnStart:0});
    S.theme="";S.item="rand";
  }),
  lobby:()=>run(()=>S.db.doc("qse/"+S.code).update({phase:"lobby"})),
  theme:v=>{S.theme=v;S.item="rand";render();},
  item:v=>{S.item=v;},
  assign:()=>{
    const target=targetOf(S.me); if(!target) return;
    let theme, item, mixed=false;
    if(S.theme==="livre"){
      item=String((document.getElementById("qseFree")||{}).value||"").trim().slice(0,60);
      if(item.length<2){S.msg="Escreva quem a pessoa vai ser.";return render();}
      theme="Tema livre";
    } else if(S.theme==="mix"||S.theme===""){
      const t=pick(TEMAS); theme=t[1]; item=pick(t[2]); mixed=true;
    } else {
      const t=TEMAS[+S.theme]; theme=t[1];
      item=S.item==="rand"?pick(t[2]):t[2][+S.item];
    }
    run(()=>S.db.doc("qse/"+S.code+"/assign/m"+M()+"_"+target).set({match:M(),by:S.me,target,theme,item,mixed}));
  },
  ask:()=>{const el=document.getElementById("qseQ");const q=String(el&&el.value||"").trim().slice(0,140);if(!q)return;
    run(async()=>{await S.db.doc("qse/"+S.code+"/questions/m"+M()+"_t"+turnNo()).set({match:M(),turnNo:turnNo(),by:S.me,q,at:Date.now()});const e=document.getElementById("qseQ");if(e)e.value="";});},
  answer:v=>run(()=>S.db.doc("qse/"+S.code+"/answers/m"+M()+"_t"+turnNo()+"_"+S.me).set({match:M(),turnNo:turnNo(),by:S.me,v})),
  guess:()=>{const el=document.getElementById("qseGuess");const g=String(el&&el.value||"").trim().slice(0,60);if(!g)return;
    const a=assignFor(S.me); if(!a) return; const ok=similar(g,a.item);
    const prev=curQ()||{};
    run(async()=>{
      await S.db.doc("qse/"+S.code+"/questions/m"+M()+"_t"+turnNo()).set(Object.assign({match:M(),turnNo:turnNo(),by:S.me,at:Date.now()},prev.q?{q:prev.q}:{}, {guess:g,ok}));
      if(ok) await S.db.doc("qse/"+S.code+"/done/m"+M()+"_"+S.me).set({match:M(),by:S.me,at:Date.now(),turnNo:turnNo()});
      await new Promise(r=>setTimeout(r,ok?2500:2000));
      await advance(ok?S.me:null);
    });},
  pass:()=>run(()=>advance(null))
};

/* ---------- desenho ---------- */
const btn=(act,label,cls,dis,extra)=>`<button data-act="${act}" ${extra||""} class="${cls||""}" ${dis||S.busy?"disabled":""}>${label}</button>`;
const msg=()=>S.msg?`<p class="mp-msg" role="alert">${esc(S.msg)}</p>`:"";
function boneco(color,active){
  return `<svg viewBox="0 0 120 110" class="qse-boneco" aria-hidden="true">
    <rect x="22" y="38" width="76" height="64" rx="16" fill="#2a1c33"/>
    <rect x="34" y="56" width="52" height="48" rx="18" fill="${color}"/>
    <circle cx="60" cy="42" r="18" fill="#f1d3b8"/>
    <circle cx="53" cy="41" r="2.4" fill="#2a1c33"/><circle cx="67" cy="41" r="2.4" fill="#2a1c33"/>
    <path d="M53 49 Q60 ${active?55:52} 67 49" stroke="#2a1c33" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M42 28 Q60 12 78 28 Q70 22 60 23 Q50 22 42 28Z" fill="#3a2418"/>
    <rect x="26" y="92" width="22" height="10" rx="5" fill="#f1d3b8"/><rect x="72" y="92" width="22" height="10" rx="5" fill="#f1d3b8"/>
  </svg>`;
}
function seatHTML(id,i,n,myIdx){
  const k=(order().indexOf(id)-myIdx+n)%n;
  const ang=(90+360*k/n)*Math.PI/180;
  const x=50+44*Math.cos(ang), y=50+40*Math.sin(ang);
  const a=assignFor(id), me=id===S.me, done=isDone(id), active=cur()===id&&!over();
  let card;
  if(!a) card=`<div class="postit empty">…</div>`;
  else if(me&&!done) card=`<div class="postit me"><b>?</b><small>${a.mixed?"Tema misturado":esc(a.theme)}</small></div>`;
  else card=`<div class="postit${done?" ok":""}"><b>${esc(a.item)}</b><small>${esc(a.theme)}</small>${done?"<i>✔ descobriu</i>":""}</div>`;
  return `<div class="seat${active?" active":""}${me?" mine":""}" style="left:${x}%;top:${y}%">
    ${card}${boneco(COLORS[order().indexOf(id)%COLORS.length],active)}
    <span class="seat-name">${active?"🎤 ":""}${esc(nameOf(id))}${me?" (você)":""}</span></div>`;
}
function vOff(){return `<div class="mp-card"><h2>Quem Sou Eu indisponível</h2><p>Não foi possível conectar ao Firebase.</p><p class="mp-note">Confira o <code>firebase-config.js</code>, o login anônimo e se a página está aberta pelo endereço do site.</p></div>`;}
function vHome(){return `<div class="mp-card">
  <h2>Quem Sou Eu</h2>
  <p class="mp-note">De ${MIN} a ${MAX} jogadores, cada um no seu aparelho. Cada um escolhe quem o colega da vez vai ser; você vê todo mundo, menos você mesmo.</p>
  <label class="mp-label" for="qseName">Seu nome</label>
  <div class="mp-row"><input type="text" id="qseName" maxlength="20" value="${esc(S.name)}" placeholder="Como os outros vão te ver"></div>
  <div class="mp-row">${btn("create","Criar sala","primary")}</div>
  <label class="mp-label" for="qseCode">Ou entre com um código</label>
  <div class="mp-row"><input type="text" id="qseCode" maxlength="4" placeholder="ABCD" style="text-transform:uppercase;max-width:9rem">${btn("join","Entrar")}</div>
  ${msg()}
  <details class="mp-rules"><summary>Como funciona</summary><ol>
    <li>O anfitrião escolhe o tempo de cada vez (começa em 1 minuto).</li>
    <li>Cada jogador escolhe o tema e o personagem de um colega — ou mistura os temas no sorteio.</li>
    <li>Na mesa, você vê o papel na testa de todos, menos no seu.</li>
    <li>Na sua vez, faça <b>uma</b> pergunta de sim ou não; os outros respondem. Depois, chute ou passe a vez.</li>
    <li>Quem descobrir primeiro vence. O último a descobrir perde.</li></ol></details></div>`;}
function vLobby(){
  const ps=sortedPlayers(), n=ps.length, hostHere=G()&&S.players[G().host], d=(G()&&G().dur)||60;
  return `<div class="mp-card">
  <p class="mp-note">Código da sala — passe para os colegas</p>
  <div class="mp-code">${esc(S.code)}</div>
  <h3 class="mp-h">Na mesa (${n}/${MAX})</h3>
  <ul class="mp-players">${ps.map(([id,p])=>`<li><span>${esc(p.name)}${id===S.me?" <em>(você)</em>":""}${G()&&G().host===id?" 👑":""}</span>${isHost()&&id!==S.me?btn("kick","Remover","",false,`data-id="${esc(id)}"`):""}</li>`).join("")}</ul>
  <div class="mp-row"><span>⏱️ Tempo por vez: <b>${fmt(d*1000)}</b></span>${isHost()?btn("dur","−30s","",d<=DUR_MIN,'data-d="-30"')+btn("dur","+30s","",d>=DUR_MAX,'data-d="30"'):""}</div>
  ${n<MIN?`<p class="mp-note">Falta ${MIN-n} jogador para começar.</p>`:""}
  <div class="mp-row">
    ${isHost()?btn("start","Começar","primary",n<MIN||n>MAX):`<span class="mp-note">${hostHere?"Aguardando o anfitrião começar…":"O anfitrião saiu."}</span>`}
    ${!hostHere&&!isHost()?btn("claim","Assumir como anfitrião"):""}
    ${btn("leave","Sair da sala")}
  </div>${msg()}</div>`;
}
function vChoose(){
  const target=targetOf(S.me), mine=target&&assignFor(target);
  const total=order().length, ready=order().filter(id=>assignFor(id)).length;
  let box;
  if(!target) box=`<p>Você está só assistindo esta rodada.</p>`;
  else if(mine) box=`<p>Você escolheu <b>${esc(mine.item)}</b> (${esc(mine.theme)}) para <b>${esc(nameOf(target))}</b>.</p><p class="mp-note">Aguardando os outros… (${ready}/${total})</p>`;
  else{
    const opts=CATS.map(c=>`<optgroup label="${esc(c)}">${TEMAS.map((t,i)=>t[0]===c?`<option value="${i}" ${S.theme===String(i)?"selected":""}>${esc(t[1])}</option>`:"").join("")}</optgroup>`).join("");
    const t=S.theme!==""&&S.theme!=="mix"&&S.theme!=="livre"?TEMAS[+S.theme]:null;
    box=`<p>Escolha quem <b>${esc(nameOf(target))}</b> vai ser:</p>
    <label class="mp-label" for="qseTheme">Tema</label>
    <select id="qseTheme" class="qse-sel"><option value="mix" ${S.theme===""||S.theme==="mix"?"selected":""}>🎲 Misturar temas (sorteia tema e personagem)</option><option value="livre" ${S.theme==="livre"?"selected":""}>✏️ Escrever livremente</option>${opts}</select>
    ${t?`<label class="mp-label" for="qseItem">Personagem / item</label><select id="qseItem" class="qse-sel"><option value="rand">🎲 Sortear um deste tema</option>${t[2].map((x,i)=>`<option value="${i}" ${S.item===String(i)?"selected":""}>${esc(x)}</option>`).join("")}</select>`:""}
    ${S.theme==="livre"?`<label class="mp-label" for="qseFree">Quem vai ser</label><div class="mp-row"><input type="text" id="qseFree" maxlength="60" placeholder="Ex.: a tia do pavê"></div>`:""}
    <div class="mp-row">${btn("assign","Confirmar","primary")}</div>`;
  }
  return `<div class="mp-card wide"><h2>Escolha dos papéis</h2>${box}
    <ul class="mp-players">${order().map(id=>`<li><span>${esc(nameOf(id))} escolhe para ${esc(nameOf(targetOf(id)))}</span><span>${assignFor(targetOf(id))?"✔":"…"}</span></li>`).join("")}</ul>
    <div class="mp-row">${isHost()?btn("lobby","Voltar ao lobby"):""}${btn("leave","Sair da sala")}</div>${msg()}</div>`;
}
function vGame(){
  const o=order(), n=o.length, myIdx=Math.max(0,o.indexOf(S.me)), q=curQ(), c=cur(), ans=curAnswers(), fim=over();
  const seats=o.map((id,i)=>seatHTML(id,i,n,myIdx)).join("");
  const tl=timeLeft();
  const center=fim?`<div class="qse-center"><h3>Fim de jogo!</h3></div>`:`<div class="qse-center">
    <div class="qse-turn">Vez de <b>${esc(nameOf(c))}</b></div>
    <div class="qse-timer${tl<=10000?" low":""}" id="qseTimer">${fmt(tl)}</div>
    ${q&&q.q?`<div class="qse-bubble">“${esc(q.q)}”</div>`:`<div class="qse-bubble dim">Aguardando a pergunta…</div>`}
    ${q&&q.q?`<div class="qse-votes">Sim ${ans.filter(a=>a.v==="sim").length} · Não ${ans.filter(a=>a.v==="nao").length} · Não sei ${ans.filter(a=>a.v==="talvez").length}</div>`:""}
    ${q&&q.guess?`<div class="qse-guess ${q.ok?"ok":"bad"}">${esc(nameOf(q.by))} chutou “${esc(q.guess)}” — ${q.ok?"acertou! 🎉":"errou!"}</div>`:""}
  </div>`;
  let panel="";
  if(fim){
    const dl=doneList(), last=o.find(id=>!isDone(id));
    panel=`<div class="panel"><h3>Resultado</h3><ol class="qse-rank">${dl.map(d=>`<li><b>${esc(nameOf(d.by))}</b> — era <b>${esc((assignFor(d.by)||{}).item)}</b></li>`).join("")}
      ${last?`<li class="lost"><b>${esc(nameOf(last))}</b> não descobriu: era <b>${esc((assignFor(last)||{}).item)}</b></li>`:""}</ol>
      <div class="mp-row">${isHost()?btn("start","Nova partida","primary")+btn("lobby","Voltar ao lobby"):`<span class="mp-note">O anfitrião pode começar outra partida.</span>`}${btn("leave","Sair da sala")}</div></div>`;
  } else if(c===S.me){
    const asked=q&&q.q, guessed=q&&q.guess;
    panel=`<div class="panel turn-me"><h3>Sua vez!</h3>
      ${asked?`<p>Você perguntou: <b>“${esc(q.q)}”</b>. Veja as respostas na mesa.</p>`:`<p>Faça <b>uma</b> pergunta que se responde com sim ou não.</p>
      <div class="mp-row"><input type="text" id="qseQ" maxlength="140" placeholder="Ex.: Eu sou uma pessoa de verdade?">${btn("ask","Perguntar","primary")}</div>`}
      ${guessed?"":`<label class="mp-label" for="qseGuess">Já sabe quem você é?</label>
      <div class="mp-row"><input type="text" id="qseGuess" maxlength="60" placeholder="Seu chute">${btn("guess","Chutar","danger")}</div>`}
      <div class="mp-row">${btn("pass","Passar a vez")}</div>${msg()}</div>`;
  } else if(isDone(S.me)||o.includes(S.me)){
    const my=ans.find(a=>a.by===S.me);
    panel=`<div class="panel"><h3>Vez de ${esc(nameOf(c))}</h3>
      ${q&&q.q?(my?`<p>Você respondeu: <b>${my.v==="sim"?"Sim":my.v==="nao"?"Não":"Não sei"}</b>.</p>`:`<p>Responda olhando o papel na testa de ${esc(nameOf(c))}:</p>
        <div class="mp-row">${btn("answer","👍 Sim","primary",false,'data-v="sim"')}${btn("answer","👎 Não","danger",false,'data-v="nao"')}${btn("answer","🤷 Não sei","",false,'data-v="talvez"')}</div>`)
        :`<p class="mp-note">Aguardando a pergunta de ${esc(nameOf(c))}…</p>`}
      ${msg()}</div>`;
  }
  return `<div class="mp-top"><span class="role">Quem Sou Eu</span><span class="mp-row" style="margin:0"><span class="pill">Sala <b>${esc(S.code)}</b></span><span class="pill">⏱️ ${fmt(((G().dur)||60)*1000)} por vez</span>${btn("leave","Sair da sala")}</span></div>
    <div class="qse-table-wrap"><div class="qse-table"></div>${center}${seats}</div>${panel}`;
}
function view(){
  if(S.state==="loading") return `<div class="mp-card"><p>Arrumando a mesa…</p></div>`;
  if(S.state==="off") return vOff();
  if(!S.code) return vHome();
  if(!S.loaded.game||!S.loaded.players) return `<div class="mp-card"><p>Entrando na sala…</p>${btn("forget","Voltar")}</div>`;
  if(!G()) return `<div class="mp-card"><p>Esta sala não existe mais.</p>${btn("forget","Voltar")}</div>`;
  if(!S.players[S.me]) return `<div class="mp-card"><p>Você não está mais nesta sala.</p>${btn("forget","Voltar")}</div>`;
  if(G().phase==="escolha") return vChoose();
  if(G().phase==="jogo") return vGame();
  return vLobby();
}
function render(){
  const keep={}; root.querySelectorAll("input").forEach(i=>{if(i.id)keep[i.id]=i.value;});
  const ae=document.activeElement, fid=ae&&root.contains(ae)?ae.id:null;
  root.innerHTML=view();
  for(const id in keep){const el=document.getElementById(id);if(el)el.value=keep[id];}
  if(fid){const el=document.getElementById(fid);if(el){el.focus();try{el.setSelectionRange(el.value.length,el.value.length)}catch(e){}}}
  hostDuties();
}
/* anfitrião inicia o jogo quando todos escolheram */
function hostDuties(){
  if(!isHost()||!G()||S.busy) return;
  if(G().phase==="escolha"&&order().length&&order().every(id=>assignFor(id))&&S.phaseFor!==M()){
    S.phaseFor=M();
    S.db.doc("qse/"+S.code).update({phase:"jogo",turn:0,turnNo:1,turnStart:Date.now()}).catch(()=>{S.phaseFor=null;});
  }
}
root.addEventListener("click",e=>{
  const t=e.target.closest("[data-act]"); if(!t||t.disabled) return;
  const a=t.dataset.act;
  if(a==="kick") return A.kick(t.dataset.id);
  if(a==="dur") return A.dur(+t.dataset.d);
  if(a==="answer") return A.answer(t.dataset.v);
  if(A[a]) A[a]();
});
root.addEventListener("change",e=>{
  if(e.target.id==="qseTheme") A.theme(e.target.value);
  if(e.target.id==="qseItem") A.item(e.target.value);
});
root.addEventListener("keydown",e=>{
  if(e.key!=="Enter") return;
  const id=e.target.id;
  if(id==="qseQ"){e.preventDefault();A.ask();} else if(id==="qseGuess"){e.preventDefault();A.guess();} else if(id==="qseCode"){e.preventDefault();A.join();}
});
/* relógio da vez: troca automática quando o tempo acaba */
setInterval(()=>{
  if(!S.code||!G()||G().phase!=="jogo"||over()) return;
  const tl=timeLeft(), el=document.getElementById("qseTimer");
  if(el){el.textContent=fmt(tl);el.classList.toggle("low",tl<=10000);}
  if(tl<-1000&&(isHost()||cur()===S.me)&&S.advancedFor!==turnNo()&&!S.busy){ advance(null).catch(()=>{S.advancedFor=null;}); }
},500);

const st=document.createElement("style");
st.textContent=`
.qse-wrap{padding-top:1rem}
.qse-sel{font:inherit;width:100%;background:var(--surface2);color:var(--text);border:1px solid var(--line);border-radius:6px;padding:.5rem .6rem}
.qse-table-wrap{position:relative;width:100%;max-width:880px;margin:3.2rem auto 2.2rem;aspect-ratio:16/11}
@media (max-width:600px){.qse-table-wrap{aspect-ratio:1/1.15}}
.qse-table{position:absolute;left:18%;right:18%;top:22%;bottom:22%;border-radius:50%;background:radial-gradient(ellipse at 50% 40%,#5a2f1e,#2b140c 70%);border:6px solid #1a0b06;box-shadow:0 18px 40px rgba(0,0,0,.6),inset 0 0 40px rgba(0,0,0,.5)}
.qse-center{position:absolute;left:24%;right:24%;top:30%;bottom:30%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:.25rem;z-index:2}
.qse-turn{font-size:.95rem;color:#f2e6d8}
.qse-timer{font-family:"Nosifer","Creepster",fantasy;font-size:clamp(1.4rem,5vw,2.4rem);color:#f5b942;text-shadow:0 0 12px rgba(245,185,66,.5)}
.qse-timer.low{color:var(--flame);animation:flick 1s infinite}
.qse-bubble{background:#fff8e6;color:#2a1c12;border-radius:12px;padding:.35rem .7rem;font-size:clamp(.78rem,2.4vw,1rem);max-width:100%;overflow-wrap:anywhere}
.qse-bubble.dim{background:rgba(255,248,230,.2);color:#f2e6d8}
.qse-votes{font-size:.8rem;color:#f2e6d8}
.qse-guess{font-size:.85rem;font-weight:700;padding:.2rem .5rem;border-radius:8px}
.qse-guess.ok{background:rgba(127,196,157,.25);color:#b5f0cc}.qse-guess.bad{background:rgba(224,25,42,.25);color:#ffb3b8}
.seat{position:absolute;transform:translate(-50%,-50%);width:clamp(70px,15vw,120px);display:flex;flex-direction:column;align-items:center;z-index:3;transition:transform .3s}
.seat.active{transform:translate(-50%,-50%) scale(1.1)}
.seat.active .qse-boneco{filter:drop-shadow(0 0 12px #f5b942)}
.qse-boneco{width:100%;height:auto}
.seat-name{font-size:clamp(.7rem,2.2vw,.9rem);background:rgba(0,0,0,.6);padding:.1rem .45rem;border-radius:999px;white-space:nowrap;max-width:140%;overflow:hidden;text-overflow:ellipsis}
.seat.mine .seat-name{color:var(--clue)}
.postit{background:#ffe066;color:#2a1c12;border-radius:4px;padding:.25rem .35rem;width:130%;text-align:center;line-height:1.1;box-shadow:0 3px 8px rgba(0,0,0,.4);transform:rotate(-2deg);margin-bottom:-6px;z-index:2;font-size:clamp(.62rem,2vw,.85rem)}
.postit b{display:block;overflow-wrap:anywhere}
.postit small{display:block;opacity:.7;font-size:.75em}
.postit.me{background:#3a2f45;color:#fff;border:2px dashed var(--clue)}
.postit.me b{font-size:1.4em}
.postit.ok{background:#bdf0cf}
.postit.ok i{display:block;font-size:.75em;font-style:normal;color:#1d6b3e}
.postit.empty{background:#555;color:#ddd}
.turn-me{border-color:#f5b942;box-shadow:0 0 18px rgba(245,185,66,.3)}
.qse-rank{padding-left:1.4rem}.qse-rank li{margin:.3rem 0}.qse-rank .lost{color:var(--means)}`;
document.head.appendChild(st);
init();
})();
