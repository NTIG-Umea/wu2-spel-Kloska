# Post Mortem
# Julbordsskandalen

Tim Lundström. 2021-12-20

## Inledning

Arbetet har varit ett spel-projekt mellan TE19 och ES20. Klasserna har blivit indelade i 6 grupper med personer från TE19 och ES20. Gruppen planerade tillsammans en spelidé som där TE19 står för programmeringen och ES20 står för grafiken. Jag programmerade själv utifrån gruppens basplanering och gjorde en liten egen spin på det hela för att anpassa kodandet till mig egen nivå.

## Bakgrund

Jag började med att bekanta mig med mallen för projektet för att veta vilken kod som Jens skrivit och hur jag kan använda mig av den. Samtidigt ändrade jag och testade runt med simplare värden såsom rörelse.

Därefter jobbade jag utifrån min planering och lista på vilka saker som ska göras utifrån vad som är viktigt för att få ett fungerande spel samt funktioner som jag vill ha i spelet. Listan kan ses ovanför detta PM.

Efter att ha justerat värdena för rörelse började jag att försöka göra en ny tiled mapp i större storlek än den i exemplet. Det misslyckades jag med, så jag gick vidare till att importera de stjärnorna från en tutorial jag jobbat med tidigare och lyckades fixa till dem efter en hel del simpel men utmanande felsökning. Stjärnorna faller ner från toppen av kartan. Efter att man tagit alla stjärnor genereras nya stjärnor.

Jag implementerade ett poängsystem för stjärnorna som jag senare gjorde lite finlir med. Poängen man får för varje stjärna är slumpmässigt för varje stjärna. Dessa poäng var de samma genom hela spelet efter att spelet startat, så jag insåg att de bara slumpades en gång. Därför fick jag göra så att poängen slumpades om varje gång nya stjärnor genererades. 

Jag hade även spikes från exempelspelet som jag gjorde om en aning. Istället för att ha en counter för hur många gånger man dött gjorde jag om så att då man dör av en spike halveras ens score och rundas av för att undvika långa decimaltal.

Därefter sökte jag upp och implementerade en tutorial för en kamera som centrerar karaktären på skärmen förutom då karaktären  är ute i kanten av kartan. Eftersom jag inte hade en större tiledmap än så kunde jag inte helt säkert se att det fungerade som det skulle. 

Jag implementerade grafik och animationer för spelkaraktären med hjälp från Liam som ingick i samma grupp.

Jag hade fått lite grafik från estetaren och började göra ett till försök på att bygga en större tiledmap och lyckades denna gången. Däremot fungerade inte de spikes i exempelspelet som jag planerade att använda då jag gjorde en större karta. Då jag efter många försök att fixa spikes gav upp att fixa den så importerade jag en karta utan spikes och körde med den istället.
Därefter kunde jag se att funktionen med den centrerade kameran fungerade, men också att kartans design blev större än vad jag ville, samt att utrymmet man kan röra sig på i sidled fortfarande var lika litet som innan trots att designen var bredare. Jag hade svårt att hitta hur jag skulle fixa problemet så jag gick vidare med andra småfix.

## Positiva erfarenheter
Jag har lärt mig att jobba mer med felsökning samt blivit mycket bättre på att felsöka och kunna tolka felmeddelanden i webbläsaren.

Jag har kunnat arbeta med andra, såsom Elliot och Liam under programmeringsbiten för att få hjälp och lära av varandra.

## Negativa erfarenheter
Jag har haft min skärm utzoomad en aning, så jag har inte insett problemet med storleken på designen tills att någon annan gick in på spelet på deras dator för att se att man inte kunde se hela spelet utan att zooma ut. Jag måste för framtida projekt helt enkelt se till så att jag har min skärm på 100% storlek, inte mer eller mindre.

Jag fick inte till alla delar som jag ville ha med för ett okej fungerande spel eftersom vissa delar slutade fungera eller fungerade på ett sätt som jag inte menade.

## Sammanfattning
Det har varit ett svårt projekt att jobba med, men lätt att anpassa till den nivå jag ligger på för att få en lagom utmaning och kunna utvecklas.

Sättet vi jobbat på har fungerat bra tycker jag. Att planera tillsammans i grupp, speciellt med en estetare som också kan ge input har varit givande. Det var även bra för mig att kravlöst jobba med andra även under programmeringsdelen för att lära sig av andra samt diskutera med andra hur man ska göra saker och varför vissa saker fungerar eller inte fungerar.

De saker som kan vidareutvecklas eller läggas till i spelet är många.
Exempelvis;
Ha plattformar med grafik från estetaren,
Byta grafik på stjärnorna till mat från estetaren,
Lägga till istappar/spikes som syns och fungerar som tidigare spikes,
Göra spelutrymmet bredare för att kunna använda den breda kartan som gjorts,
Lägga till random fallande istappar som kan döda en och återställa score till 0,
Spara ett highscore som också kan sparas i local storage,
Ev lägga till fler kartor

## Tutorial
Det Marcus skrev

# Planering
- [x] Movement speed
- [x] Skapa ett item för collectives
- [x] Skapa collisions för collectives
- [x] Gör ett poängsystem för collectives
- [x] Följande kamera (Tror det fungerar, behöver en längre bana för att testa)
- [x] Bredare (längre) bana
- [x] Lägg in ny grafik
- [ ] Att kunna dö av ett föremål, exempelvis en istapp.

Saker jag vill göra om det andra går bra
- [ ] Vinst vid viss poäng
- [ ] Highscore
- [ ] Skymd sikt
- [ ] Traps

## V48 

Måndag: Movement

Onsdag: Collectives

Fredag: Collectives

## V49 

Måndag: Collectives (collision, collection) + Scroll view

Onsdag: Scroll view, ny grafik

## V50

Måndag: Ev nya scener, eller finlir med det som redan finns.