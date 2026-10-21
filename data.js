// Civilizaciones: gm = recolección, hp/atk/sp = multiplicadores de combate
const CIVS=[
 {n:'Orcos',c:'#4a8a2a',b:'+20% ataque, -5% vida',atk:1.2,hp:.95},
 {n:'Elfos',c:'#2fbf71',b:'+30% madera',gm:{w:1.3}},
 {n:'Altos elfos',c:'#e8d27a',b:'+20% vida',hp:1.2},
 {n:'Enanos',c:'#c0762e',b:'+30% oro y piedra',gm:{g:1.3,s:1.3}},
 {n:'Humanos',c:'#e6e6e6',b:'+10% recolección',gm:{w:1.1,f:1.1,g:1.1,s:1.1}},
 {n:'Vikingos',c:'#4aa3c9',b:'+12% vida, +8% ataque',hp:1.12,atk:1.08},
 {n:'Magos',c:'#3f7fe0',b:'+15% ataque, -5% vida',atk:1.15,hp:.95},
 {n:'Brujos',c:'#b04fd8',b:'+30% comida',gm:{f:1.3}},
 {n:'Sectarios',c:'#c0392b',b:'+10% ataque, +20% comida',atk:1.1,gm:{f:1.2}},
 {n:'No muertos',c:'#5fd0a0',b:'+20% ataque, -10% vida',atk:1.2,hp:.9},
 {n:'Pícaros',c:'#8a8a96',b:'+15% velocidad',sp:1.15}
];
const MAPS=[
 {n:'Llanuras',t:'llanuras',a:'#3f7d3a',b:'#458541',c:'#376f33',w:30,m:7},
 {n:'Bosque',t:'bosque',a:'#2f6b34',b:'#357538',c:'#265a2c',w:50,m:5},
 {n:'Desierto',t:'desierto',a:'#cfae6a',b:'#d6b774',c:'#bf9d58',w:10,m:9},
 {n:'Nevada',t:'nevada',a:'#dfe9f2',b:'#e8f0f7',c:'#c9d8e6',w:22,m:8},
 {n:'Montaña',t:'montana',a:'#6b6b62',b:'#74746b',c:'#5a5a52',w:12,m:14},
 {n:'Valle',t:'valle',a:'#4f8a3a',b:'#58943f',c:'#427a33',w:26,m:8},
 {n:'Pantano',t:'pantano',a:'#3f5a3a',b:'#456540',c:'#35502f',w:40,m:5},
 {n:'Tundra',t:'tundra',a:'#a9b4b8',b:'#b4bec2',c:'#97a3a8',w:12,m:9}];
const LORE='El mundo vivía en paz, hasta que se abrió una grieta en su centro. Quien la domine obtendrá un poder capaz de conquistarlo todo. Destruye el centro urbano enemigo o mantén la grieta con tus tropas durante 60 segundos.';
const INTRO=[
 'Hubo un tiempo en que todos los pueblos vivían en paz.',
 'Elfos, enanos, humanos y orcos comerciaban, colaboraban y compartían una vida en armonía.',
 'Pero un día, el mundo se abrió.',
 'Una enorme grieta surgió en su centro, y de ella brotaba una luz extraña.',
 'Las civilizaciones se unieron para investigarla, y descubrieron que emanaba un poder inmenso, capaz de otorgar a su portador el dominio del mundo.',
 'La desconfianza creció. Quien lograra ese poder sería el dueño de todo.',
 'Hicieron entonces un pacto: nadie conquistaría la grieta.',
 'Pero los rumores, las sospechas y el ansia de poder lo rompieron todo.',
 'Y así, el mundo entró en guerra. Elige tu pueblo... y domina la Grieta.'];
// Unidad única por civilización (mismo orden que CIVS); Cuartel, Era II
const UU=[
 {n:'Berserker',hp:130,atk:14,rng:16,sp:1.1,cost:{f:90,g:50}},
 {n:'Guardabosques',hp:60,atk:9,rng:140,sp:1.2,cost:{w:60,g:50}},
 {n:'Paladín solar',hp:140,atk:12,rng:16,sp:1.4,cost:{f:100,g:80}},
 {n:'Martillero',hp:160,atk:11,rng:16,sp:.9,cost:{f:90,g:70}},
 {n:'Caballero real',hp:150,atk:13,rng:16,sp:1.6,cost:{f:100,g:90}},
 {n:'Huscarl',hp:125,atk:13,rng:16,sp:1.2,cost:{f:90,g:60}},
 {n:'Mago de batalla',hp:50,atk:18,rng:130,sp:1,cost:{w:60,g:90}},
 {n:'Hechicero',hp:55,atk:13,rng:120,sp:1,cost:{w:50,g:70}},
 {n:'Fanático',hp:80,atk:17,rng:16,sp:1.5,cost:{f:60,g:60}},
 {n:'Caballero de la muerte',hp:110,atk:15,rng:16,sp:1.2,cost:{f:80,g:80}},
 {n:'Asesino',hp:70,atk:16,rng:16,sp:1.9,cost:{f:70,g:60}}
];
// Voz de cada civilización (frecuencia base, onda e intervalos en semitonos)
const CS=[{f:82,t:'sawtooth',p:[0,0,-5]},{f:520,t:'sine',p:[0,4,7,12]},{f:440,t:'triangle',p:[0,7,12]},{f:110,t:'square',p:[0,-5,0]},{f:294,t:'sawtooth',p:[0,0,7,7]},{f:98,t:'sawtooth',p:[0,7,0,-5]},{f:660,t:'sine',p:[0,5,10,3]},{f:196,t:'triangle',p:[0,-1,0,1]},{f:130,t:'square',p:[0,3,0,3]},{f:73,t:'sawtooth',p:[0,-1,-6]},{f:880,t:'triangle',p:[0,12]}];
