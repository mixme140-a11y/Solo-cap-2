import { 
  Chapter, 
  Character, 
  MapLocation, 
  RadioBroadcast, 
  NewspaperArticle, 
  StoreItem, 
  SecretFile, 
  TimelineEvent, 
  AppNotification,
  SecurityCamera
} from '../types';

import heroImg from '../assets/images/hero_gothic_convent_1786989071944.jpg';
import carousel1Img from '../assets/images/hero_exact_scene_1786994101116.jpg';
import carousel2Img from '../assets/images/hero_carousel_2_1786993076235.jpg';
import carousel3Img from '../assets/images/hero_carousel_3_1786993091263.jpg';
import artemisaImg from '../assets/images/artemisa_portrait_1786989083792.jpg';
import avatarImg from '../assets/images/user_avatar_gothic_1786989096250.jpg';
import newspaperImg from '../assets/images/newspaper_la_verdad_1786989104985.jpg';
import readerFrameImg from '../assets/images/gothic_reader_frame_1786991895280.jpg';
import radioCathedralImg from '../assets/images/radio_cathedral_disk_1786998021816.jpg';
import mapImg from '../assets/images/terra_vita_map_1787002831529.jpg';

export const HERO_ASSETS = {
  hero: carousel1Img,
  carousel: [carousel1Img, carousel2Img, carousel3Img],
  carousel1: carousel1Img,
  carousel2: carousel2Img,
  carousel3: carousel3Img,
  artemisa: artemisaImg,
  avatar: avatarImg,
  newspaper: newspaperImg,
  readerFrame: readerFrameImg,
  radioDisc: radioCathedralImg,
  map: mapImg,
};

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 'cap-0',
    number: 0,
    part: 1,
    title: 'Sinopsis & Prólogo: Condena y Refugio',
    subtitle: 'Capítulo 0 — Sinopsis Oficial',
    estimatedReadTime: '8 min',
    synopsis: 'Huyendo de quienes quieren verlo muerto, Gabriel encuentra refugio en el último lugar donde esperaba estar: un convento.',
    date: 'Archivo Oficial',
    isUnlocked: true,
    coverImage: heroImg,
    content: [
      'Huyendo de quienes quieren verlo muerto, Gabriel encuentra refugio en el último lugar donde esperaba estar: un convento.',
      'Allí se reencuentra con Helena, la mujer que alguna vez amó y que ahora ha entregado su vida a Dios. Pero detrás de los muros de aquel lugar hay algo mucho más oscuro que fe y silencio.',
      'Un padre corrupto, monjas que guardan secretos y una historia que nadie parece dispuesto a contar comienzan a revelar que algunos pecados no pertenecen al pasado.',
      'Gabriel creyó que el convento sería un refugio. Tal vez solo encontró otra forma de condena.',
      'Entra en su historia. Explora sus secretos. Y descubre qué se esconde detrás de las paredes.'
    ]
  },
  {
    id: 'cap-1',
    number: 1,
    part: 1,
    title: 'Subida al infierno',
    subtitle: 'Capítulo 1 — El convento como refugio',
    estimatedReadTime: '10 min',
    synopsis: 'Perseguido por las calles bajo la lluvia y herido de bala, Gabriel encuentra refugio en las puertas del convento, donde es recibido por Elena, su antigua prometida.',
    date: '12 Octubre 2025',
    isUnlocked: true,
    coverImage: heroImg,
    content: [
      'Corriendo a través de las oscuras calles empapadas por la lluvia. Mi respiración es pesada, mis pasos son frenéticos, y el sonido de los motores de los coches y las voces lejanas de las personas que me perseguían me hacían preguntarme a mi mismo: ¿Cómo he llegado a tal punto? Solía tenerlo todo hace un par de años atrás, ahora mi vida dependía de ellos.',
      '— ¡Vuelve aquí y dame la cara imbécil! — Escuche un grito a mis espaldas, seguido de algunos disparos, que con un poco de suerte lograba esquivar —',
      'Al casi caer en una esquina ya que una de las balas atravesó mi pierna derecha, esto hizo que perdiera el equilibrio y un quejido de dolor saliera de mi garganta, trate de seguir corriendo aun que la herida no me ayudaba mucho y empezaba a perder una cantidad considerable de sangre, de repente me vi a mi mismo en un callejón sin salida y frente a mi, las paredes de un antiguo convento.',
      'Voltee mi mirada con desesperación hacia cada lado, tratando de encontrar una salida pero no tenia otra opción. Corrí hacia las grandes puertas del convento y empecé a dar golpes en ella.',
      '— ¡¿Hay alguien aquí?! — Grite con desesperación ya que sabía que mi tiempo estaba contado y si esos tipos me alcanzaban sería mi fin.',
      'Llame una y otra vez a la puerta mientras escuchaba la voz de los hombres que me buscaban a mis espaldas, cada vez más cerca. Estuve a punto de rendirme cuando la vi abriendo la puerta del convento. Quedé paralizado al reconocer su rostro.',
      '— ¿Elena? — pronuncie su nombre con temblor en mi voz, al recordarla y ahora verla en un traje de monja —',
      '— Lo siento, persona equivocada — Dijo ella para luego querer cerrarme la puerta —',
      '— ¡No! — detuve la puerta con mis manos — Elena, déjame entrar, me están siguiendo — mi tono de voz era suplicante —',
      '— Se está confundí...... — Antes de que terminara su frase hizo su típico gesto rodando sus ojos y maldijo en voz baja, para luego abrir la puerta y ayudarme a ocultarme —',
      '— Gracias — Suspire —',
      '— Cierra la boca y entra — Dijo ella empujándome hacia el convento y cerrando la puerta — En qué problema...',
      '— Shhhj — cubrí su boca con mis manos — Están afuera — Susurre —',
      '— ¿Dónde está? ¿Dónde se metió? — Se escuchaban las voces de los tipos a través de la puerta —',
      '— ¿Crees que esté en el convento? — Pregunto uno de ellos —',
      '— Jj, es un convento y él un criminal, se derretiría al poner un pie en una iglesia —',
      'Las voces se alejaban, haciéndome saber que estaba a salvo, di un suspiro largo y recosté mi espalda en la puerta.',
      '— Estás sangrando — Comentó Elena al ver mi pierna —',
      '— Gracias — Respondí sin mucha energía —',
      '— No puede ser que estoy albergando a un criminal.',
      '— ¿Un criminal? ¿Solo soy eso? ¿Estás segura? Elena, soy tu ex prometido. Me conoces mejor que nadie.',
      '— Ni siquiera te conoces a ti mismo Gabriel, ¿cómo pretendes que otros lo hagan por ti? — Ella me extendió su mano para ayudar a ponerme en pie — Te ayudaré por esta vez. Pocas personas de afuera suelen entrar a este convento. Te ayudaré sólo porque creo en que aún tienes esperanza.',
      '— ¿La tengo? — pregunté mientras caminaba con su ayuda — ¿Después de todo lo que he hecho?',
      '.....\n................\n1:00 PM',
      '— Duele — Me quejé en voz baja, al sentir cómo la aguja con la que Elena cerraba mi herida en la pierna, traspasaba por mi piel — ¿No puedes hacerlo con más cuidado? — Volví a renegar —',
      '— Cállate y baja la voz que los curas ni las monjas saben que estás aquí — Respondió Elena mientras daba otra puntada a mi herida. Con la última pensé que el dolor fue causado a propósito. Sabía que me guardaba rencor desde el día en que rompí su corazón — Está listo.',
      '— ¿Puedo quedarme? Es bueno verte.',
      '— Ya pasamos por esto, Gabriel — Esquivaba mi mirada —',
      '— Dijiste que tenías fe en mí.',
      '— No de esa clase — Elena empezaba a vendar mi herida —',
      '— Sé que estás enojada porque arruiné...',
      '— "Arruinar" es una palabra suave para lo que hiciste — Me interrumpió — De igual modo, encontré la paz aquí, Gabriel. Me gusta el convento, puedo ayudar a las personas como...',
      '— ¿Como yo?',
      'Esperé por algunos minutos su respuesta, debo de admitir que no pensé querer escuchar algún tipo de aprobación de alguien, hasta que la volví a encontrar. Aún la recuerdo bien, en su vestido de novia antes de nuestra boda, su hermosa sonrisa que ahora pareciera haberse desvanecido con el tiempo, se notaba cansada y hasta podía pensar que me recordaba a esos días en que yo sabía que había algo que ella no me decía.',
      '— Hermana Elena — la débil voz de un anciano llamaba a la puerta. Vi cómo Elena se estremeció de nervios al escucharlo — ¿Qué hace en la habitación del sacerdote Sebastián?',
      '— Ah... yo... yo... — Pellizca su brazo cuando está nerviosa, tal como la recuerdo — Gabriel, debes de irte.',
      '— Pero... pero...',
      '— Debes de irte, te van a descubrir aquí — Elena me da un leve empujón hacia la ventana —',
      '— ¿Con quién habla, hermana Elena? — El anciano abrió la puerta curioso.',
      '— Padre Fermín, puedo... puedo explicar...',
      '— Sacerdote Sebastián, ¿no dijo que...'
    ]
  },
  {
    id: 'cap-2',
    number: 2,
    part: 1,
    title: 'Capítulo 2: La Suplantación',
    subtitle: 'Capítulo 2 — La identidad prestada',
    estimatedReadTime: '15 min',
    synopsis: 'Gabriel acepta hacerse pasar por el difunto sacerdote Sebastián ante el anciano padre Fermín, descubriendo oscuros secretos en la biblioteca y enfrentando la misa de medianoche.',
    date: '15 Noviembre 2025',
    isUnlocked: true,
    coverImage: heroImg,
    content: [
      '— ¿Me estás queriendo decir que ustedes, un grupo de monjas, le mienten a un hombre mayor sobre la muerte de su hermano sacerdote, que se fue a Italia, cuando en realidad está a 5 pies bajo tierra y además quieres que me haga pasar por el muerto para cubrir sus mentiras?',
      '— Solo serán unos meses, él no tiene mucho tiempo de vida, el cáncer lo está matando — Ella respondió un poco alterada —. Es una mentira piadosa, trato de que viva sus últimos días feliz, todos lo intentamos aquí.',
      '— ¿Te estás escuchando? ¿Realmente soy yo el que me iré al infierno? — protesté —',
      '— Por favor — Ella juntó ambas manos en modo de súplica —',
      'Al ver lo convencida que estaba de que no era gran cosa, me hizo dudar a mí mismo. No tenía nada que perder y estaría encerrado aquí dentro, al menos hasta que los tipos que me buscaban me dieran como caso perdido. Necesitaba un refugio.',
      '— Ya que estás aquí y que soy yo la que te escondo, mínimo sirve para...',
      '— Lo haré — la interrumpí —',
      '— ¿Lo harás? — Preguntó sorprendida —',
      '— Sí. ¿Qué más da? He hecho cosas peores por menos.',
      'Pude ver la mirada de desagrado de Elena al escucharme. Seguido de la frase "no quiero saber".',
      '..................',
      'Me molesté en investigar un poco más sobre el sacerdote al que yo suplantaba. No había mucho en su historial fuera de lo normal hasta que una noche entré a la biblioteca, ignoré el letrero que decía "solo personal autorizado" y por curiosidad empecé a escudriñar entre algunos viejos libros, actas y pergaminos cubiertos de polvo. Entonces entendí la amabilidad, el interés y la calidez del anciano, cuando empecé a atar cabos, descubriendo que Sebastián era el hijo del anciano.',
      '— Vaya — Dije para mí mismo con ironía —. Entonces el convento tiene cosas ocultas. No soy el único que...',
      '— ¿Qué haces aquí? — la voz de Elena me hizo sobresaltarme. Me estaba iluminando el rostro con un foco —. ¿No leíste el cartel? Dice personal autorizado.',
      '— Claro que lo leí. Pero hace unos días tú decidiste dejar de llamarme Gabriel y tomar la identidad de un tal sacerdote Sebastián, yo solo estoy haciendo mi tarea — Respondí de manera burlesca —',
      '— Escucha Gabriel — Ella usaba ese tono de voz que me hacía entender que estaba enojada —. No necesitas saber más. Te quedarás aquí solo 2 semanas y luego puedes irte. Le diré al padre Fermín que te fuiste a una misión espiritual — Ella me quitó el libro que tenía entre mis manos y me empujó hacia la salida —',
      '— Espera, auch. ¿Las monjas son así de violentas? — La molesté un poco al sentir cómo me daba empujones para sacarme de la biblioteca —',
      '— Mantente alejado y en tu papel.',
      '— Pero no me dejas investigar mi papel. ¿Has escuchado de algún actor que actúe sin antes estudiar?',
      '— No digas estupideces, eres bueno mintiendo, pasaste todo nuestro compromiso ocultándome cosas.',
      'Iba a defender mi honor por milésima vez ante Elena, cuando una de las monjas se detuvo al final del pasillo para vernos.',
      '— Sa... sacerdote Sebastián, hermana Elena. La misa de medianoche está por comenzar — Dijo esta chica algo tímida —',
      'Era extraño, podía entender que el anciano no me reconociera gracias a su pobreza de alzheimer pero ¿qué hay de las monjas? Ninguna decía algo, actuaban como si no supieran que tenían a un desconocido durmiendo en el convento, haciéndose pasar por su guía espiritual. Porque a decir verdad, entre el difunto sacerdote y yo no hay mucho parecido.',
      'Al dirigirnos a una de las capillas Elena me daba algunos consejos de comportamiento. Al abrir las puertas entrando al lugar todos los ojos de las monjas se posaban en nosotros, un pequeño escalofrío recorrió mi cuerpo al verlas a todas reunidas, sus rostros cubiertos con velos negros y sosteniendo una vela en sus manos.',
      '— Sebastián — Escuché la voz del anciano, que provenía del púlpito —. Este es tu lugar, ¿quieres hacernos los honores de iniciar la ceremonia esta noche?',
      'Mi mirada se desvió hacia Elena que se encontraba a mi lado.',
      '— Ve — Susurró ella.',
      '— ¿Qué se supone que debo de hacer? — Susurré de vuelta —',
      '— ¿Nunca has ido a misa? — Creo que eso fue un regaño de su parte —. Solo ve — Ella dio un leve empujón a mi espalda —',
      'Caminé por el pasillo y mi mirada iba a cada una de las monjas con sus espeluznantes trajes y la vela en sus manos.',
      '«No recuerdo que mi catecismo haya sido de esta manera»',
      'Avancé lentamente hasta el púlpito, sintiendo cómo cada mirada clavada en mí me quemaba la piel. Mi corazón latía más rápido de lo que me hubiera gustado admitir.',
      '— Bien, sacerdote Sebastián — dijo el anciano con voz cansada pero firme —. Comienza la ceremonia.',
      'Miré a Elena buscando una señal, pero ella estaba inexpresiva, como si ya supiera que me quedaría paralizado. Respiré hondo, tratando de recordar alguna frase que encajara.',
      '— En el nombre del Padre, del Hijo y del Espíritu Santo... — balbuceé, más por reflejo que por convicción.',
      'Una de las monjas comenzó a cantar un himno en latín que no reconocía, y las demás se unieron, formando un coro que parecía salir de otro mundo.'
    ]
  },
  {
    id: 'cap-3',
    number: 3,
    part: 1,
    title: 'Capítulo 3: Trabajo Comunitario',
    subtitle: 'Capítulo 3 — Las tres de la madrugada y los viejos pecados',
    estimatedReadTime: '12 min',
    synopsis: 'A las tres de la madrugada, Gabriel revive los recuerdos con Elena y la farsa de su boda. Al amanecer, obligado a vestir los hábitos de Sebastián, sale con ella a repartir suministros a la comunidad.',
    date: 'Actualizado',
    isUnlocked: true,
    coverImage: heroImg,
    content: [
      'El sonido de las campanas rompió el silencio de la madrugada. Eran las tres.\nHora de los fantasmas.\nO, en mi caso, de los errores.',
      'Al levantarme de la cama y encender un cigarro para aliviar el estrés de no dormir, abrí la ventana recibiendo un viento frío en mi rostro. Como era lo usual, mi mente vagaba en aquellos momentos en que alejé a Elena de mi vida. Al cerrar mis ojos podía obtener esa imagen perfecta de ella en ese vestido de novia, caminando al altar.',
      'Y sin darme cuenta, ya no estaba en la habitación, ni en la madrugada helada. Estaba ahí, en la iglesia. El murmullo de la gente, la fragancia de las flores, y ella, radiante, dando pasos hacia mí, mientras el mundo se desvanecía a nuestro alrededor.',
      'Mentí en el altar por una sencilla razón: dinero. La familia de Elena solía tener de sobra y yo necesitaba un poco en ese tiempo. Nunca le dije quién era exactamente, ni de dónde venía. Así que fingí ser un tipo de la alta sociedad el día que la conocí en aquel club de campo, disfrazado de un gran inversionista con ropa barata y autos lujosos de dudosa procedencia. Con mentiras y más mentiras logré conquistar a Elena. Codiciada por muchos, ella cayó en mis brazos. Enamorarse de mí fue su primer error.',
      'Elena tenía muchas virtudes, entre ellas la belleza, lealtad, amabilidad, paciencia y alguna otra que pudo haberse escapado de mi vista. No era extraño el haberla elegido a ella, pero siempre he sido alguien codicioso, por lo que nuestro matrimonio no funcionaría; creo que siempre lo supe.',
      'No diría que tengo un problema con los juegos de azar, pero esa fue la razón por la que empecé a perder dinero. El negocio de mi familia cayó gracias a mis apuestas, y empecé a tratar de conseguir dinero para pagar todo lo que perdí. La manera más legal de todas sería casarme por dinero. Al final del día mi apellido aún tendría peso en la sociedad, aunque ya no quedaba mucho hombre detrás de mí.',
      'Creo que la peor parte de cuando conoces a alguien realmente, es darte cuenta de que siempre fue así y nada de lo que hagas podrá cambiarlo. Nada pudo cambiarme a mí, especialmente a ella. Ni las veces que la hice llorar al descubrirme robando su anillo de compromiso para así poder apostarlo, mucho menos esa noche en que estando ebrio y enojado, confesé que solo quería un poco de dinero de ella. Ahora me pregunto a mí mismo si las noches en las que solo puedo pensar en Elena son porque realmente la amé o solo porque siento haberla tratado así.',
      '— Gabriel — Esa voz me sacó de mis pensamientos —.',
      'Sin siquiera enterarme Elena ya estaba arrebatándome el cigarrillo de la mano para apagarlo.',
      '— Estás en un convento, no debes de fumar — Dijo Elena mientras pisaba la colilla del cigarro —. Se supone que eres un cura respetable. Cumple tu papel.',
      '— Se supone que tú eres una heredera de un grupo de negocios exitoso ¿Qué haces en un convento? — Respondí de manera no muy agradable, actitud de la que me arrepentí segundos después —.',
      '— No lo entenderías, siempre fuiste un idiota — Elena caminó a mi armario para sacar un traje —.',
      '— No, de hecho no lo entiendo. Si tuviera el dinero que tu famil... — En ese preciso momento me enteré de la gran estupidez que estaba diciendo y pude verlo en el rostro enojado de Elena —. No dije nada — volví a hablar —.',
      '— Como sea — Ella extendió ese traje a mí —. Cámbiate, hoy tenemos trabajo comunitario.',
      '— ¿T... trabajo qué? — Dije en un tono casi como si hubiera escuchado la peor ofensa del mundo —.',
      '— Trabajo comunitario, preparamos almuerzo para los niños de una comunidad de escasos recursos — Ella dejó el traje sobre mi cama —. Cámbiate.',
      '— ¿Niños? ¡¿Y qué han hecho los niños por mí?! — Me sobresalté un poco, bueno de hecho actuaba como si fueran a decirme que me comerían vivo —.',
      '— Ash, deja de decir estupideces y ponte el traje. Eres el cura Sebastián te lo recuerdo, actúa como tal.',
      '.......................................................................',
      'Observé a los niños correr de un lado a otro en el momento en que Elena repartía suministros de comida a los padres. Íbamos puerta a puerta de parte del convento entregando alimentos a los pobladores de esa pequeña comunidad y claro, alguna que otra palabra alentadora.',
      'Al parecer el "padre Sebastián" era muy querido en el lugar y por obvias razones evitábamos mencionarme con tal nombre. Algo llamó mi atención: al otro lado de la calle una chica estaba siendo reprendida por lo que serían sus padres. Ella lloraba desconsolada mientras su padre le gritaba frases como: "No vuelvas a casa, olvídate de tu familia. Tú te buscaste este problema".',
      'Me dio un poco de pena en ese momento, me recordó a una versión más joven de mí mismo, siendo expulsado de mi casa por tomar malas decisiones. Por impulso me dirigí a esa "familia" y traté de poner mi sonrisa más agradable posible.',
      '— Disculpe. ¿Todo bien? — Interrumpí al padre de la chica —.',
      '— ¿Eres de los monjes del convento? — La pregunta fue hasta en un tono mezquino —.',
      '— Lo soy — traté de sonreír —.',
      '— Entonces...'
    ]
  },
  {
    id: 'cap-4',
    number: 4,
    part: 1,
    title: 'Capítulo 4: La Revelación & Las Llamas',
    subtitle: 'Capítulo 4 — El fuego y la confesión',
    estimatedReadTime: '16 min',
    synopsis: 'Tras la fuerte discusión por la chica embarazada y la verdad oculta de Sebastián, Elena revela un oscuro crimen justo antes de que una explosión desate el fuego en el convento.',
    date: 'Nuevo Capítulo',
    isUnlocked: true,
    coverImage: heroImg,
    content: [
      '— ¿Me vas a decir qué fue eso? — le solté a Elena apenas cruzamos el umbral. La puerta detrás de nosotros aún vibraba del portazo —. ¿No se supone que ustedes predican amor, paz y ayudar al prójimo? ¿Cómo puedes dejar a una chica en la calle, sola, embarazada, sin un lugar a dónde ir?',
      '— No lo entenderías — respondió, seca. Ni siquiera me miró.',
      '— ¿Que no lo entendería? — solté una risa vacía, ácida —. ¡¿Qué no voy a entender?! La chica estaba llorando, suplicándote ayuda, y tú...',
      '— ¡Ya cállate! — me cortó de golpe, su voz un látigo —. ¡Tú no estás aquí para nada más que lo que viniste a hacer! No tienes derecho a cuestionar mis decisiones, porque ni siquiera eres alguien aquí. Así que mantente callado. No le digas a nadie lo que viste. Y después, vete.',
      '— ¿Callarme? — bufé, incrédulo —. ¿Es por lo que puedan decir los demás? ¿Por eso la echaste? ¿Porque no quieres que sepan que el libre de pecado padre Sebastián... tenía secretos?',
      'Me di vuelta, hirviendo por dentro.',
      '— Sabes, eso es lo que más detesto de ustedes. Se esconden detrás de esta fachada de virtud, se llenan la boca de buenas intenciones, pero cuando llega el momento de actuar... son los primeros en señalar y abandonar.',
      '— No sabes de lo que hablas — dijo ella, cruzada de brazos. Tan fría que me dolió.',
      '— ¡¿Ves?! Justo eso. Te escondés detrás del hábito, de los rezos, de este papel de mártir que no te queda. Fingís que te importa la gente, pero vivís de las apariencias. Te importa más lo que digan allá afuera que lo que pasa aquí adentro.',
      '— Quizás por eso lo nuestro no funcionó — escupió. Su voz ya no temblaba, pero sí dolía —. Porque no sabes escuchar. Porque actuás como un imbécil.',
      'Y ahí me quedé. Mudo. Porque tenía razón.\nPorque pensaba en ella todo el tiempo.\nPorque me sabía de memoria su perfume, su canción favorita, el sonido de su risa en los pasillos.\nY me dolía. Jodidamente me dolía.',
      '— Elena, vamos a empezar — interrumpió una monja desde la puerta —. Te necesitamos en la habitación de Mar.',
      '— Voy en seguida — respondió ella, sin mirarme. Luego giró apenas el rostro hacia mí, con esa frialdad que se clava como vidrio en el pecho —. Solo vete, Gabriel. Olvídate de todo. Eso se te da bien.',
      'Iba a irse.\nPero antes de que cruzara la puerta, la detuve.\n\nMis manos temblaban. El corazón parecía una bomba a punto de estallar.',
      '— Te amo — susurré.\n\nEl mundo se detuvo.\nNo hubo respuesta. Ni una mirada.\nSolo silencio.',
      '— No sabes lo que estás diciendo — murmuró, soltando mi mano como si le quemara.',
      '— Sí lo sé — le dije, tomándola del brazo suavemente, sin fuerza, como un náfrago agarrando una tabla en mitad del mar —. Sé que estás enojada. Y tenés todo el derecho. Fue mi culpa.\nArruiné nuestro compromiso.\nVendí tu anillo para pagar una deuda de juego.\nTe mentí con lo de mi familia, diciendo que no me desheredaron, cuando en realidad ya había perdido todo.\nMe perdí en los casinos, en las mentiras, en esa vida de mierda que quise esconderte.',
      '— Basta, Gabriel. Cállate. Tengo que irme.',
      '— No. Esperá. También aposté el último centavo que habíamos ahorrado para nuestra casa...',
      '— ¡Ya cállate! ¡No sabes lo que dices!',
      '— ¡Sí lo sé! ¡Te conozco, Elena! Sé que nunca me hubieras hecho algo así. Porque tú...',
      '— Maté al padre Sebastián.\nY haré lo mismo con el padre Fermín.\n\n...\n\nNo me dio tiempo a preguntar qué carajo significaba eso.\nPorque en ese preciso instante, una explosión retumbó como un trueno dentro del convento.\n\nLas paredes temblaron.\nEl fuego empezó a escupirse por los pasillos.\nY el infierno acababa de desatarse.',
      '11:50 p. m.\n\nLas llamas se deslizaban como serpientes por los pasillos del convento. Las monjas corrían entre gritos, intentando evacuar, mientras todo a nuestro alrededor ardía. Las paredes crujían, los vitrales estallaban, y el infierno tomaba forma entre columnas de humo.',
      '— ¡El padre Fermín! — solté el brazo de Elena y corrí hacia la habitación del cura.',
      '— ¡Gabriel, tenemos que salir de aquí! — gritó detrás de mí, pero no frené.',
      '— ¡Tenemos que sacarlo! ¡Llamar a los bomberos! ¡El lugar se está cayendo! — jadeé, ya frente a la puerta del sacerdote.',
      'Mi mano rozó la perilla. Estaba caliente. El fuego acechaba del otro lado. Justo antes de girarla, la mano de Elena se posó sobre la mía. Su toque no era para detenerme, era para detener el tiempo.',
      'La miré.\nY lo supe.\nNo tuvo que decir nada.\nElla lo había hecho.\nElla provocó la explosión.',
      'Y entonces, como una maldición que llega tarde, recordé lo que dijo en la cocina. Que había matado a Sebastián. Que haría lo mismo con Fermín.\n\n¿Dónde había quedado la mujer con la que una vez soñé casarme?',
      '— ¿Por qué? — pregunté apenas, sin moverme, sin parpadear. Mi mano aún sobre la perilla, pero mi alma, clavada en sus ojos.',
      '— ¡Auxilio! — la voz del cura se filtró desde adentro, ahogada, desesperada —. ¡¿Alguien ahí afuera?! ¡Por favor! ¡Ayuda!',
      '— No abras — susurró Elena, casi con ternura, casi como una plegaria.',
      'Los golpes tras la puerta se hicieron más fuertes.\nEl humo ya entraba por la rendija del suelo.\nY por primera vez en mucho tiempo...'
    ]
  },
  {
    id: 'cap-5',
    number: 5,
    part: 1,
    title: 'Capítulo 5: El Confesionario & La Venganza',
    subtitle: 'Capítulo 5 — 12:00 a. m. & Seis meses después',
    estimatedReadTime: '18 min',
    synopsis: 'El fuego consume el convento mientras los perseguidores de Gabriel disparan contra Elena. Seis meses después, refugiado en una nueva iglesia bajo la sotana del sacerdote Sebastián, el asesino de Elena entra al confesionario buscando perdón.',
    date: 'Nuevo Capítulo',
    isUnlocked: true,
    coverImage: heroImg,
    content: [
      '12:00 a. m.',
      'Las campanas del convento comenzaron a sonar, como si ignoraran que todo a su alrededor se venía abajo. Un sonido monótono, casi solemne, que cortaba el humo. Las aves salieron disparadas de los árboles, escapando del calor, del caos.',
      'El fuego seguía devorando el edificio, como si quisiera borrar todo lo que ocurrió entre esas paredes. Elena y yo lo mirábamos desde la calle, sin hablar. Sólo mirando.',
      'En cuestión de minutos, los vecinos comenzaron a correr hacia nosotros con cubetas, mangueras, gritos. Algunos por ayudar, otros solo por mirar. Y entre los curiosos, entre el murmullo de la calle, se colaban ojos que no pertenecían a este vecindario.',
      '— Se terminó — dijo una voz a mis espaldas.\n\nEra una de las monjas. Su rostro estaba ennegrecido por el humo, pero sus ojos... sus ojos estaban en paz. Demasiado en paz.\n\n— Volveré a casa — añadió.',
      '— ¿A casa...? — repetí en un susurro, como si esa palabra no tuviera sentido ya. Entonces giré la mirada hacia Elena —. ¿Y tú...? ¿Volverás a casa?\n\n— No soy bienvenida — respondió sin siquiera mirarme. Su voz era seca. Definitiva.',
      'Me acerqué un poco más. La calle seguía ruidosa, pero ese instante era nuestro.\n\n— Hablaba de nuestra casa — le dije al oído —. ¿Volverás conmigo?\n\nElla parpadeó. Y por un segundo, por un maldito segundo, me pareció verla regresar. A ella. A la de antes.',
      'Pero la calle se hizo silencio. Un silencio denso. Cortante. Como si el mundo contuviera el aliento. Y lo sentí. Nos estaban observando.\n\nMiré de reojo. Entre la multitud, al fondo, había un hombre con chaqueta negra y gorra, con la mirada clavada en mí. Junto a él, otro sujeto hablaba por radio. No eran vecinos. No eran curiosos. Eran ellos.\n\nLos mismos que me habían perseguido desde el inicio. Los mismos de los que huí hasta terminar aquí. Y ahora me habían encontrado.',
      'Uno de ellos empezó a caminar hacia nosotros, lento, con seguridad. Como quien ya sabía la respuesta a una pregunta que aún no hacía.\n\n— Gabriel... — dijo el primero, sacando algo del bolsillo —. ¿Pensaste que podías esconderte para siempre?\n\n— Tenemos que irnos — le susurré a Elena, tomando su brazo. Pero ella no se movió.\n\n— Por favor... — le insistí, apretando los dientes —. Confía en mí. Por una última vez.',
      'El hombre se detuvo a pocos pasos. Sonrió con una calma que me erizó la piel.\n\n— Tus cuentas siguen abiertas, muchacho. Y no me gusta dejar historias a medias.\n\nTiré del brazo de Elena para así poder escapar junto a ella.',
      'Entonces, todo fue rápido. Demasiado rápido.\n\nUno de ellos sacó un arma.\nY no dudó.\n\n— ¡ELENA! — grité.\n\nEl disparo fue seco. Un único estallido que cortó la noche.',
      'Ella cayó hacia mí, como si su cuerpo se negara a separarse del mío incluso en la caída. La sostuve, desesperado, sintiendo la tibieza de la sangre mancharme las manos.\n\n— No... no... no... — susurré, con el pecho hecho trizas —. ¡No! ¡¡Ayuda!!\n\nElla respiraba, pero apenas. Sus ojos buscaban los míos como si todavía tuviera algo que decir.\n\n— Gabriel... — susurró.\n\n— No hables, por favor. Te vas a poner bien. Vamos a salir de esta. Vas a volver a casa. Te lo juro, Elena. Te lo juro por mi vida.\n\nPero el mundo a nuestro alrededor no paraba. Gritos. Más disparos. Gente corriendo. Y yo ahí, arrodillado en medio de la calle, sosteniéndola como si pudiera retenerla solo con quererlo.',
      '................... 6 meses más tarde ...................',
      'Lo juré en vano.\n\nElla murió...\nY con ella, todo lo que me quedaba de vida.\n\nLlamé a su familia para el funeral. No se molestaron en aparecer. Llamé a las monjas que fueron sus cómplices, sus hermanas de dolor. Ninguna contestó el teléfono. Estaba sola. Y ahora me dejaba solo a mí también.',
      'La diócesis no tardó en enterarse. Encontraron el cuerpo del padre Fermín, calcinado en su habitación. Los restos del tanque de gas que había provocado la explosión. Toda una biblioteca de pruebas y crímenes... en cenizas.\n\nPor supuesto, descubrieron que yo no era el padre Sebastián. Pero yo también tenía mis cartas. Yo sabía cosas. Muchas cosas. Y ellos sabían que no les convenía tenerme hablando.',
      'Me ofrecieron un trato.\nUn convento en Los Ángeles.\nLejos.\nMuy lejos.\nUna nueva identidad: ser el sacerdote Sebastián para los que no conocían su rostro.\nMi silencio... a cambio de mi nueva vida.\n\nY como el cobarde que soy... acepté.',
      'Elena estaría decepcionada. Lo sé. Pero Elena ya no estaba. Y yo necesitaba desaparecer, alejarme de los hombres que aún me seguían, de la sangre que aún me manchaba las manos. Necesitaba sobrevivir.\n\nIntenté hacerlo bien esta vez. Memoricé cada credo. Repetí cada juramento. Aprendí incluso a no juzgar a las personas cuando se arrodillaban frente a mí a confesar sus pecados.\nA veces, cerraba los ojos...\nY pensaba que si fingía lo suficiente... tal vez, solo tal vez...\nDios me perdonaría.',
      'La misa había terminado hace horas. Los fieles se habían marchado dejando bancos húmedos por los paraguas, la fragancia de las velas apagadas aún flotando en el aire, y un silencio espeso que solo era interrumpido por los truenos a lo lejos.\n\nYo permanecía allí, solo. Recogiendo el incensario, doblando los manteles del altar, apagando las luces una por una.\n\nEstaba en el confesionario, limpiando las tablas del asiento con un trapo húmedo, cuando la puerta principal del templo se abrió con un estruendo.',
      'Me sobresalté.\nUna figura entró empapada, tambaleante, casi deshecha.\n\n— ¿Hola...? — pregunté con cautela, saliendo del confesionario —. ¿Se encuentra bien?\n\nEl hombre no respondió. Solo se arrodilló frente al altar, como si el peso del mundo le aplastara los hombros. Se persignó con torpeza. Temblaba.\n\n— Vengo a confesarme... — murmuró al fin, con voz ronca.',
      'Y esa voz.\nEsa voz no era nueva.\nLa había escuchado antes.\nEn otra vida.\nEn una calle cubierta de ceniza.\nEn el mismo segundo en que ella cayó al suelo.\n\nMi cuerpo se tensó como un resorte. No podía ver bien su rostro, pero el tono nervioso, la manera en que arrastraba las palabras, el eco agrio en su garganta... era él.\nEl mismo que jaló el gatillo.\nEl asesino de Elena.',
      '— ¿Padre...? — volvió a decir, con las manos juntas —. Por favor... necesito refugio. Me siguen. No sabía a quién más acudir. Por favor...\n\n— ¿Quiere confesar sus pecados? — pregunté con un tono neutro.\n\n— Sí. Sí, lo necesito — dijo él, la voz más quebrada ahora —. Lo que hice... a esa mujer... Fue un error. Fue una orden, ¿entiende? Yo no quería. Yo no sabía que...\n\n— ¿Elena? — dije su nombre.\nCasi como si fuera una bala.\n\nEl hombre enmudeció al otro lado. Silencio. Después, respiraciones entrecortadas.\n\n— ¿Qué... qué dijo?\n\n— Dije su nombre.',
      'El confesionario se volvió un ataúd de madera. No había paz allí, ni misericordia.\n\n— Padre... yo no sabía quién era. Yo no... No era personal. ¡Por favor! — su voz era puro miedo. Como si supiera, instintivamente, que estaba ante el peor tipo de juez: uno que ya perdió todo.\n\nMe puse de pie. Abrí la reja lateral del confesionario con lentitud. Me quedé allí, mirándolo bajo la tenue luz del candelabro.\n\n— No hay refugio aquí para ti — dije con frialdad.\n\n— ¡Pero...! ¡Soy un alma arrepentida! ¡Esto es una iglesia!\n\n— No.',
      'Me acerqué al altar. Encendí una vela con calma, sin quitarle la vista.\n\n— No te daré el perdón.\nNo hoy.\nNo tú.\nNo mientras ella siga muerta.\n\nY entonces le señalé la salida, mientras el trueno rugía como una bestia sobre nosotros.\n\n— Vete. Antes de que me olvide de la sotana que llevo puesta.'
    ]
  },
  {
    id: 'cap-6',
    number: 6,
    part: 1,
    title: 'Capítulo 6: Terrenos en el Cielo',
    subtitle: 'Capítulo 6 — Deudas de sangre y parcelas celestiales',
    estimatedReadTime: '20 min',
    synopsis: 'León irrumpe en el templo asesinando al perseguidor e inculpa a Gabriel ante la temida familia Vargas. Sin un centavo para pagar la extorsión, Gabriel sube al púlpito con una insólita propuesta: vender parcelas en el cielo.',
    date: 'Nuevo Capítulo',
    isUnlocked: true,
    coverImage: heroImg,
    content: [
      'La tormenta no cesaba. El confesionario olía a madera húmeda y secretos podridos.',
      'Aún no se iba. Ese hombre —empapado, temblando, con las manos crispadas— seguía de rodillas frente al altar. Yo seguía de pie, con la sotana pegada al cuerpo por el sudor frío que me recorría la espalda.',
      '— No hay perdón para ti — repetí, esta vez más firme —. No aquí. No conmigo.\n\nEl tipo levantó el rostro. La luz de una vela temblorosa reveló sus ojos abiertos de par en par.\n\n— Tú... — susurró con pánico —. ¡Tú eres él!\n\n— ¿Perdón?\n\n— ¡Tú eres el maldito que escapó esa noche! El que todos creímos muerto. ¡Tú eres Gabriel!\n\nMis manos se cerraron en puños.\n\n— Así que me recuerdas...\n\n— ¡Claro que sí! ¡Te buscamos por semanas! ¡Pensé que te habías desangrado en algún callejón! No puede ser que tú... seas un cura ahora.',
      '¡PAM!\n\nUn solo disparo. Sordo, brutal.\nEl cuerpo del hombre se tambaleó hacia atrás como una marioneta sin hilos. El agujero rojo en su espalda aún humeaba. Cayó al suelo con un golpe seco, como si la iglesia hubiera decidido tragárselo.',
      'Yo giré de golpe, y allí estaba él. Empapado, con un abrigo largo negro y un revólver aún humeante en la mano. Un rostro que no había visto en mucho tiempo, pero que conocía demasiado bien.\n\n— Buenas noches, Gabriel — dijo con una sonrisa torcida —. Vaya, vaya... pensé que estabas muerto. Pero la vida siempre me guarda sorpresas.\n\nMi voz salió ronca, como si hubiera tragado clavos.\n\n— León.\n\n— ¿Me extrañaste?\n\n— Pensé que te habían deportado.\n\n— Y tú pensaste mal. Como cuando pensaste que podías huir sin pagar. — León apuntó con el arma al cuerpo que acababa de derribar —. Este era de la familia Vargas, ¿te suena ese nombre? Seguro no, pero yo sí lo conozco. Y ahora que está muerto, alguien va a tener que pagarles con algo más que excusas.',
      'Se agachó junto al cadáver con frialdad, le quitó la billetera y se guardó algo en el abrigo.\n\n— Voy a decirles que tú lo mataste. Que te negaste a pagar, que lo emboscaste y lo silenciaste. Les diré que tengo pruebas. Y te juro por Dios que van a creerme. Esa familia no perdona, Gabriel. Ya lo sabes.\n\nLeón se acercó lentamente. Ya no apuntaba con el arma, pero no hacía falta. Su amenaza estaba bien colocada, como un cuchillo invisible entre mis costillas.\n\n— Así que... o pagas hasta el último centavo, o te entierran por algo que esta vez no hiciste.\n\n— ¿Y si no tengo con qué?\n\nSonrió. Una sonrisa lenta, podrida de cinismo.\n\n— Entonces empezarás a cavar tu tumba, padre. Porque ellos vienen por ti. Y ahora yo no pienso detenerlos.\n\nSe marchó con paso tranquilo, como si acabara de dejar una ofrenda en el altar.',
      'Dos semanas. Eso era lo que llevaba León apareciéndose en las misas, siempre en el mismo banco, siempre con la mirada clavada en Gabriel. Como si quisiera recordarle que la deuda no se olvidaba, que no importaba cuánto tiempo pasara, él estaba ahí.\n\nGabriel trataba de ignorarlo, rezaba para que algún milagro lo hiciera desaparecer.\n\nUna tarde, después de una misa agotadora, Gabriel salió del templo y encendió un cigarro en la esquina, buscando un respiro, una pausa en esa pesadilla constante.',
      '— ¿Sabes que te estaba buscando? — la voz seca de León surgió detrás de él.\n\nGabriel dio un salto, pero no se sorprendió. Ya estaba acostumbrado.\n\n— ¿Y qué quieres ahora? — exhaló el humo, mirando al hombre con cansancio.\n\n— El pago. Es hora de que me des algo, padre — dijo León con esa sonrisa torcida que nunca llevaba buenas noticias.\n\n— ¿Y qué crees que voy a darte? — Gabriel apretó el cigarro entre los dedos —. No tengo ni para un café, menos para pagar tus cuentas.\n\nLeón se encogió de hombros, fingiendo comprensión.\n\n— Por ser viejo amigo, te doy opción de cuotas. No creas que me hice monje de repente, pero tampoco soy un monstruo — le guiñó un ojo.',
      'Gabriel rió, esa risa amarga que sale cuando ya no queda nada más que ironía.\n\n— Quiero mi dinero de vuelta, no me interesa cómo lo consigas. El reloj avanza.\n\n— ¿Y cómo se supone que voy a pagar? ¿Ya viste en dónde vivo?\n\n— Ese es tu problema, no el mío — León le restó importancia y me arrebató un cigarrillo —. Vas a pagar hasta el último centavo, incluso si eso significa que tengas que vender terrenos en el cielo.',
      '«Terrenos en el cielo»... esa broma sarcástica de León fue la que me dio la idea. Mis problemas no se resolverían hasta que me quitara a estos tipos de encima; se llevaron a Elena con ellos pero ¿podría hacerla sentir orgullosa en donde sea que esté si salgo de aquí? Porque lo hice mal, no debí de involucrarla en esto en primer lugar.',
      'La iglesia está repleta. Los bancos crujen bajo el peso de decenas de fieles, algunos expectantes, otros buscando respuestas. El aire huele a incienso barato y a humedad acumulada. Gabriel, con su sotana, sube al púlpito con pasos pesados, respirando hondo.\n\nMira a su alrededor. Ve rostros cansados, ojos que buscan esperanza, y sabe que hoy no va a darles un sermón clásico. No. Hoy tiene algo... diferente.',
      '— Hermanos y hermanas — su voz corta el silencio, un poco ronca pero firme —. Hoy les traigo una oferta que no pueden rechazar.\n\n— ¿Alguna vez se han preguntado qué pasará cuando este mundo se termine? — Gabriel baja la voz, mira directo a la congregación —. Yo sí. Y les voy a ser franco: el Apocalipsis no está a la vuelta de la esquina, ¡está ya en la puerta de enfrente!\n\nUnos pocos susurran, algunos empiezan a inquietarse.\n\n— Pero no teman — continúa, esbozando una sonrisa torcida —. Porque tengo el producto perfecto para ustedes: terrenos en el cielo. Sí, ¡en el mismísimo cielo! Un lugar asegurado para cuando el mundo esté destruido.',
      'Se escucha un ahogo colectivo, una señora mayor cruza las manos en oración mientras otros bajan la mirada confundidos.\n\n— Imaginen: un lote con vista panorámica a la eternidad, buena vecindad y cero impuestos. El terreno que ningún banco puede embargar.\n\nGabriel hace una pausa, siente que algunas miradas se clavan en él como dagas.\n\n— Así que, los contratos están al final de la misa — dice señalando el altar con una sonrisa medio burlona —. Y si no tienen todo el dinero ahora, no se preocupen, tengo planes de pago en cuotas. Porque la eternidad es larga y el cielo... bueno, el cielo espera a todos, pero mejor asegurar el lugar antes que se llene. Recuerden que no nos llevaremos nada cuando nos vayamos de este mundo.\n\nAlgunos ríen nerviosos, otros miran con escepticismo, y un par de curiosos sacan sus teléfonos para grabar.',
      'Más tarde, al terminar la misa, cuando Gabriel estaba frente a la pequeña foto que cargaba de Elena, tuvo un momento de lucidez y reconoció que estaba mal tratar de estafar a las personas; se arrepentía, se culpaba de su muerte.\n\n— Lo siento, sé que confiabas en mí — susurraba para sí mismo frente a esa foto.\n\nDe pronto el sonido del teléfono llamó su atención: mensajes de indignados, curiosos, y algún que otro «quiero mi parcela celestial».\n\n— Vender terrenos en el cielo — murmura —. Nunca pensé que terminaría haciendo algo así... Estarías decepcionada si me vieras ahora.\n\nSuspira.\n\nSe levanta, mira al altar improvisado en la esquina de su habitación, y una sombra de determinación cruza su rostro. Al revisar el por qué su teléfono sonaba tanto y encontrar los mensajes de las personas curiosas por adquirir su pedazo de cielo, supo que no daría paso atrás...'
    ]
  },
  {
    id: 'cap-7',
    number: 7,
    part: 1,
    title: 'Capítulo 7: La Oficina Celestial & Sor Lucía',
    subtitle: 'Capítulo 7 — Certificados de salvación y pasos en la sombra',
    estimatedReadTime: '22 min',
    synopsis: 'El negocio de las parcelas celestiales explota con certificados de pureza y suscripciones espirituales. Mientras Gabriel salda su deuda con León billete a billete, la llegada de Sor Lucía —con un inquietante parecido a Elena— desata una red de espionaje en el convento.',
    date: 'Nuevo Capítulo',
    isUnlocked: true,
    coverImage: heroImg,
    content: [
      'Desde hace dos semanas, había empezado a firmar contratos. Sí, en serio. Contratos para vender terrenos en el cielo.\nNadie más lo sabía. Ni las monjas, ni menos los curas. Era un secreto entre Dios y yo... bueno, y mis clientes desesperados.',
      'La sala del convento se convirtió en mi oficina oculta. Entre velas apagadas y olor a incienso, guardaba las hojas con nombres, firmas y promesas de pagos: los famosos planes en cuotas.',
      'Cada vez que escuchaba pasos, el corazón me daba un salto de esos que casi me delatan. Cerraba el libro de contratos rápido, fingía estar leyendo la Biblia, o simplemente me refugiaba en una plegaria falsa, murmurando un «Padre, perdóname».',
      'Los curas hablaban de fe y sacrificio, y yo vendía parcelas para escapar de mi pasado.\n\nCada firma era una pequeña victoria, un paso más lejos de la ruina y un paso más cerca del infierno.',
      'Cada domingo, Gabriel subía al púlpito con esa mezcla de cansancio y picardía, ajustaba la sotana y lanzaba su discurso.\n\nLo hacía parecer casi como la mejor ganga de la historia. Poco a poco, la noticia se expandió como el fuego. Gente empezó a acercarse después de la misa, haciendo preguntas y firmando contratos en el rincón que Gabriel había montado como su «oficina celestial secreta».',
      'Un anciano, con sonrisa traviesa, le pidió que le «encargara una casita con vista al paraíso, pero que tuviera jardín y espacio para las visitas». Una pareja joven pidió que les ayudara a asegurar dos terrenos juntos, «para cuando lleguemos, ir de vecinos».\n\nIncluso, una señora que nunca faltaba, y siempre con su rosario en mano, le dijo con firmeza:\n\n— Padre, necesito ese terreno para mi alma, y si puede ser, con vista al lago celestial. Ya hice cuentas y creo que puedo pagar en cuotas... aunque me va a tocar vender el reloj de oro de mi esposo.\n\nGabriel, mientras firmaba con sonrisa de vendedor experimentado, se daba cuenta de lo absurdo y surrealista que era todo.',
      'Después de que los terrenos en el cielo se convirtieran en la estafa del momento, Gabriel decidió ampliar el catálogo.\n\nPorque, ¿qué es un lote celestial sin la garantía de pureza?\n\nAsí, entre sermones y contratos firmados, empezó a mencionar algo más...\n\n— Y para los jóvenes que quieren asegurar su lugar en el reino de los cielos —decía con una sonrisa pícara—, también ofrecemos certificados de virginidad, para que cuando den el «sí, acepto», el cielo no tenga dudas.',
      'Un murmullo recorrió la iglesia, algunos se tapaban la boca sorprendidos, otros con sonrisas cómplices.\n\n— Porque sí, hermanos, en estos tiempos modernos hay que tener todo bien certificado. No queremos sorpresas.\n\nLas madres asintieron con firmeza, los abuelos cruzaron miradas, y algunos jóvenes se miraban entre ellos, entre vergüenza y curiosidad.\n\n— El certificado es expedido por el mismísimo convento —Gabriel bajaba la voz para hacer la oferta más «exclusiva»—, y se entrega con una bendición especial.\n\nY así como llegaron estas ideas, también llegó la de alquiler de santos protectores o la de el seguro de almas.',
      'Los rumores no tardaron en expandirse. En poco tiempo, el «combo celestial» de Gabriel incluía terrenos, certificados de virginidad y hasta «paquetes premium» para bodas en la iglesia con paquete completo de bendiciones y «seguridad espiritual».\n\nLas redes sociales locales ardían con memes, comentarios sarcásticos, y jóvenes bromeando con la idea de «comprar su virginidad para el cielo».\n\nPero lo que a Gabriel le importaba era que la clientela seguía llegando, y los billetes, aunque en forma de donaciones y contratos «espirituales», seguían entrando. Al final del día mientras los curas del convento no lo supieran, no sucedería nada y era una ventaja el hecho de que ellos no tuvieran redes sociales.',
      'Salía por la puerta trasera del convento, esquivando miradas curiosas. León siempre lo esperaba en la misma esquina, apoyado contra un poste.\n\nEl intercambio era rápido: un sobre por un gesto de aprobación. León no daba las gracias, solo asentía y contaba el dinero allí mismo.\n\nAsí, pago tras pago, el peso de la deuda comenzó a aflojarse, como una soga que ya no asfixia pero que sigue colgando del cuello. León parecía satisfecho con el avance, y Gabriel, aunque no lo admitiera ni frente al espejo, sentía una extraña mezcla de alivio y poder: estaba comprando su libertad, billete a billete.',
      '— Te daré tu último pago en 1 mes — mencionó Gabriel en voz baja —. Será lo último y luego saldrás de mi vida.\n\n— Pensé que nos estábamos divirtiendo, «Padre» — León dio el suspiro más dramático y fingido que he visto —. Me gusta ver cómo juegas con los demás y su fe — Empezaba a contar el dinero entre sus manos —. Eres creativo y hasta gracioso. Me entretendrías más si en este último mes te descubren.',
      'Gabriel no entendía a qué se refería León en ese momento.\n\nA la semana siguiente, una nueva monja llegó al convento. Se llamaba Sor Lucía, y aunque todos la recibieron con la formalidad acostumbrada, Gabriel sintió un escalofrío la primera vez que la vio. Sus rasgos... esa forma de arquear las cejas, la curva exacta de los labios, incluso la manera en que bajaba la mirada al rezar: todo le recordaba a Elena. Era como verla de nuevo, pero vestida de hábito.',
      'Lucía, sin embargo, no era una presencia pasiva. Desde el primer día mostró un interés peculiar en Gabriel. Lo observaba durante la misa con una devoción que no parecía solo religiosa. Caminaba detrás de él en los pasillos con pasos suaves, como si no quisiera ser escuchada. A veces lo encontraba en la sacristía y fingía que estaba «buscando algo», pero sus ojos se quedaban demasiado tiempo fijos en él.\n\nGabriel lo notó. Primero lo tomó como paranoia, luego como una burla del destino... hasta que se convenció de que era real: lo estaba vigilando. Y, en el fondo, aunque le incomodaba, había algo en esa vigilancia que lo inquietaba.',
      'Una noche mientras el alcalde del pueblo aseguraba su alma por 19 dólares la hora, Gabriel pudo notar que a través de la rendija de la puerta se encontraban un par de zapatos negros. No de cualquier tipo de negro o textura: han sido los zapatos que ha estado observando cada noche debajo de su puerta desde que Sor Lucía pisó el convento. Ella ha estado escuchando, por lo que el cura le entregaba notas de papel al alcalde por debajo de la mesa para comunicarse y sellar su suscripción semanal de salvación.',
      'Era así en cada visita. Una vez Gabriel juró ver una cámara oculta o micrófonos en su oficina, lo que lo llevaba a preguntarse a sí mismo: ¿Quién era esta mujer? O ¿Qué quería de él?\n\nÉl tenía 2 opciones:\n1. Preguntar civilizadamente acerca de su llegada al convento. Si hacía las preguntas correctas tal vez tendría sus respuestas.\n2. Tomar las respuestas a la fuerza.'
    ]
  },
  {
    id: 'cap-9',
    number: 9,
    part: 1,
    title: 'Capítulo 9: El Precio de la Libertad & Margaret',
    subtitle: 'Capítulo 9 — Cuentas saldadas, falsas salvaciones y la caída',
    estimatedReadTime: '18 min',
    synopsis: 'Gabriel salda su última deuda con León creyéndose finalmente libre. En su última jornada vendiendo certificados de salvación conoce a Margaret. Una tragedia inesperada desata una persecución policial y el fin de la farsa.',
    date: 'Nuevo Capítulo',
    isUnlocked: true,
    coverImage: heroImg,
    content: [
      '— Cincuenta, sesenta, ochenta y cien — contaba los billetes en mis manos —. Eso es todo — le di un par de golpes en el hombro —. No te debo nada. Ahora puedes largarte y no volver a verme.\n\n— Fue divertido mientras duró — se le formó una sonrisa en el rostro —. Debo admitir que no esperaba que dejaras a la oficial en cama de por vida. Eres malo, Gabriel. Más que yo.\n\n— No me vengas con que vas a extrañar esto. Eres el único que se divierte chantajeándome y haciéndome perder la cabeza — casi fue un regaño.\n\n— ¿Ahora qué sigue? Ya no tienes deudas. ¿Qué hay? ¿Te vas a quedar aquí a verles la cara de estúpidos a todos después de haberles robado el dinero? — preguntó el criminal frente a mí.',
      'Esa era una buena pregunta. ¿Qué seguía? ¿Había más? ¿Qué venía después de haberlo dado todo para comprar mi libertad? ¿Realmente era libre?\n\nSe había terminado. Podía huir, podía volver a casa, podía mudarme y no tener que ver nunca más a nadie de este lugar. O podía volver ahí adentro y seguir haciendo lo que mejor sabía: dinero y mentiras.',
      '— Padre Gabriel — uno de los curas se acercó por mi espalda, gritando mi nombre, lo que me hizo dar la vuelta.\n\n— Cura Armando — sonreí —. ¿En qué puedo ayudarle?\n\n— Le recuerdo que la jornada de salvación empieza a las seis. Le corresponde abrir las actividades con las personas de la comunidad rural.\n\nNo lo recordaba. Había propuesto esa actividad precisamente para visitar a quienes más se preocupaban por tener un lugar allá arriba. Aunque ya no necesitara el dinero, terminar lo que había empezado no me vendría mal.\n\n«Una última vez».\n\n— Claro — sonreí —. Ahí estaré.',
      'Para la tarde de ese mismo día había tomado la decisión de irme. Grecia era el destino que le prometí a Elena para nuestra luna de miel. Nunca lo dije en voz alta, pero aún guardo sus cenizas en un cofre a la orilla de mi cama. Su familia no era la más comunicativa desde que se volvió monja. Yo era todo lo que ella tenía, y sus cenizas son lo único que me queda ahora.\n\nA veces, al terminar de firmar los certificados de salvación, pensaba en Elena. Anhelaba poder salvarla con uno de estos, tener la seguridad de que estaría a su lado en otra vida… aunque yo para entonces ya estaría camino al infierno.',
      '7:00 p.m.\n\nNo necesitaba hacer esto nunca más. Sin embargo, aquí estaba, engañando una vez más a personas que probablemente tenían el alma más limpia que había visto en todo mi tiempo como cura. Por un segundo, solo por un segundo, pensé en no hacerlo. Pero entonces tenía una fila de gente clamando por un certificado que les asegurara la vida. ¿Quién era yo para negármeles y decepcionarlos?',
      '— Claro que sí, señora Akira. Su hija encontrará al mejor esposo después de mostrar este certificado de pureza — sellé el expediente y se lo entregué a la joven.\n\n— Gracias, padre — la señora me dedicó una mirada de aprobación, tanto a mí como a su hija, y se marchó, dando paso al siguiente.\n\n— ¿Quién sigue?\n\n— Escuché que tiene casas de todo tamaño allá arriba. ¿Acepta pagos a cuotas?\n\n— Lo siento, don Carlos. Están agotadas con esa oferta. ¡Siguiente!\n\nClaro que no le vendería una casa a cuotas. Me iría de aquí en cinco días.',
      'Casi al final de la fila la vi acercarse. Su postura era encorvada y sus ojos reflejaban tristeza. Una anciana de unos setenta años, poco arreglada, con el semblante pálido. Seguramente estaba enferma.\n\n— ¿En qué puedo ayudarla?\n\n— Dos certificados de salvación exprés, por favor — dejó una bolsa de plástico sobre mi mesa. Al abrirla, contenía monedas viejas, posiblemente ya no válidas por su diseño anticuado.\n\nNo dije nada. Ni una sola palabra. Pensé en hacer mi única obra buena antes de irme. Aunque… como si lo que hacía pudiera considerarse una obra de bondad. Tomé sus monedas inútiles y saqué un certificado falso de la gaveta.\n\n— Es para mi hijo — dijo la anciana —. Murió hace dos años. Y otro para mí. Quiero reunirme con él algún día.\n\n— ¿Cuál es su nombre? — tomé un marcador para empezar a completar el certificado.\n\n— Para Margaret y Edward — sonrió.\n\nMargaret. Recordaría ese nombre por el resto de mi vida. Porque sería quien me jodería. Debí haberme ido cuando todavía tenía tiempo.',
      'Todo el mundo lamenta las tragedias: huracanes, accidentes, descuidos. Pero si hay algo que las personas aman es encontrar culpables. Se dice que las cosas son más llevaderas si existe alguien a quien puedas aferrar todo tu odio y descargar lo que llevas dentro. Alguien como yo.\n\n— «Noticia de última hora: una anciana es encontrada sin vida en la sala de su casa. La policía investiga, ya que se halló una carta de suicidio en sus manos en la que aseguraba que ella y su difunto hijo se reunirían en el cielo gracias a la compraventa de un certificado de salvación directa con el cura del convento del oeste, Sanctus Lux. La anciana afirmaba en su carta que había cometido ese acto debido a que el cura Gabriel, en una de sus misiones, le había asegurado una reunión con su hijo.\n\nLas autoridades investigan el convento por fraude por segunda vez y ordenan la captura del desaparecido cura Gabriel. Tenemos una copia del certificado y de la carta de la señora Margaret que…»',
      'Apagué el televisor cuando escuché golpes fuertes en la puerta. No podían haberme encontrado tan rápido. ¿Cómo lo hicieron? Estaba asustado. No sabía que la anciana haría algo así. Al salir a la luz, el convento me expulsó de mis servicios. Mi teléfono no paraba de sonar con llamadas de reclamo por el dinero robado.\n\n— Es mejor que te vayas. Si la policía viene aquí y te encuentra, también me llevarán a mí — dijo uno de mis amigos de la vida antigua al entrar en la habitación.\n\n— Dijiste que podía quedarme el tiempo que necesitara.\n\n— Amigo, tengo hierba sembrada en el jardín. Si vienen y descubren eso…\n\n— Ash — rodé los ojos y me puse de pie para irme.\n\n— Sabía que entenderías.\n\nNo tenía a dónde ir realmente, ni cómo llegar a otro lugar. Tenía todo el dinero necesario, pero si ponía un pie en el aeropuerto seguro me agarrarían. Pensé en ser más discreto y encerrarme durante los próximos seis meses hasta que todo se calmara.\n\nNo duré ni siquiera en cruzar el puente de la ciudad. A cinco pasos de distancia ya estaba de cabeza contra el piso, con las manos en la nuca y rodeado de policías.'
    ]
  }
];

export const CHARACTERS_DATA: Character[] = [
  {
    id: 'artemisa',
    name: 'Hermana Artemisa',
    role: 'Guardiana de Secretos & Archivera',
    alias: 'La Dama de la Cera Negra',
    quote: 'El silencio no es la ausencia de sonido; es el grito que nadie se atreve a pronunciar.',
    description: 'Enclaustrada en Santa Vita desde los dieciséis años, custodia los textos prohibidos y los sellos de la cripta. Su lealtad fluctúa entre la doctrina del convento y una deuda de sangre del pasado.',
    secrets: [
      'Oculta la llave maestra de la biblioteca subterránea dentro de su devocionario.',
      'Mantiene contacto encubierto mediante el canal de radio de onda corta.',
      'Sabe quién alteró los registros bautismales de 1924.'
    ],
    confessions: [
      '"A veces rezo no para que Dios me escuche, sino para asegurarme de que las paredes sigan sordas."',
      '"No busques al culpable entre los vivos. Los vivos solo somos herederos de las culpas ajenas."'
    ],
    affinity: 78,
    image: artemisaImg,
    status: 'Bajo Sospecha'
  },
  {
    id: 'lucien',
    name: 'Padre Lucien',
    role: 'Párroco de Santa Vita & Locutor Nocturno',
    alias: 'La Voz de la Medianoche',
    quote: 'Bendito sea el cordero que no huye del lobo, sino que aprende a devorar la noche.',
    description: 'Guía espiritual de la congregación y voz inconfundible de Radio Santa Vita. Emite sus sermones en frecuencias clandestinas a las 00:00 exactas.',
    secrets: [
      'La torre de transmisión de la radio está conectada directamente al órgano mayor.',
      'Ha oficiado diez funerales sin ataúd presente.',
      'Posee un medallón con el escudo de una orden disuelta en el siglo XVIII.'
    ],
    confessions: [
      '"El rebaño necesita fe, pero más que nada necesita miedo para no apartarse del sendero."',
      '"Cada frecuencia radial transporta una plegaria... y una advertencia."'
    ],
    affinity: 42,
    image: avatarImg,
    status: 'Activo'
  },
  {
    id: 'gabriel',
    name: 'Gabriel (Falso Padre Sebastián)',
    role: 'Falso Sacerdote & Prófugo',
    alias: 'El Falso Inversionista',
    quote: '«En un convento lleno de secretos, la única forma de sobrevivir es fingir que eres el santo que todos esperan.»',
    description: 'Llegó a Santa Vita huyendo de prestamistas armados. Elena lo introdujo en el convento bajo la identidad del difunto sacerdote Sebastián. Debe sostener la farsa frente a la demencia del Padre Fermín.',
    secrets: [
      'Debe una fuerte suma de dinero tras una falsa boda con Elena que nunca se consumó.',
      'Descubrió en la biblioteca que Sebastián era en realidad el hijo biológico del Padre Fermín.'
    ],
    confessions: [
      '"Cada vez que alzo el cáliz temo que el viejo Fermín note que mis manos no son las de su hijo."'
    ],
    affinity: 95,
    image: '',
    status: 'Bajo Sospecha'
  }
];

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'convento-santa-vita',
    name: 'Convento Santa Vita',
    subtitle: 'Fortaleza en los riscos de las Altas Cumbres (Noroeste)',
    x: 21.0,
    y: 24.5,
    description: 'Antiguo convento de clausura alzado sobre precipicios de piedra oscura. Lugar central de la novela donde Gabriel busca refugio y halla misterios eclesiásticos y cánticos a medianoche.',
    dangerLevel: 'Peligro Crítico',
    unlockedClue: 'Bajo las bóvedas de la cripta yace el pasaje secreto hacia la cantera de 1924.',
    secretFound: true
  },
  {
    id: 'aldea-del-cipres',
    name: 'Aldea del Ciprés',
    subtitle: 'Valle del Norte, entre montañas y senderos',
    x: 46.5,
    y: 24.0,
    description: 'Pequeño poblado rural resguardado por cipreses centenarios. Los aldeanos guardan silencio sobre las procesiones que descienden de los riscos.',
    dangerLevel: 'Bajo',
    unlockedClue: 'El carruaje negro del Padre Lucien pasa por la vereda cada luna nueva.',
    secretFound: false
  },
  {
    id: 'convento-sanctus-lux',
    name: 'Convento Sanctus Lux',
    subtitle: 'Catedral en la cima del macizo nororiental',
    x: 73.0,
    y: 16.5,
    description: 'Imponente bastión religioso con agudos pináculos que vigilan el Mar Oriental. Custodian los manuscritos canónicos del clero supremo.',
    dangerLevel: 'Moderado',
    unlockedClue: 'Mantiene correspondencia cifrada con la biblioteca de Santa Vita desde 1892.',
    secretFound: false
  },
  {
    id: 'ciudad-lumina',
    name: 'Ciudad Lumina',
    subtitle: 'Gran Metrópoli Catedralicia (Centro de Terrá Vita)',
    x: 42.0,
    y: 43.5,
    description: 'La gran urbe amurallada gobernada por las altas torres de la basílica. Centro de comercio, imprentas clandestinas y redactores de "La Verdad".',
    dangerLevel: 'Moderado',
    unlockedClue: 'La redacción del periódico La Verdad ocultó copias del informe forense de 1924.',
    secretFound: true
  },
  {
    id: 'villa-serena',
    name: 'Villa Serena',
    subtitle: 'Asentamiento oriental junto a la ribera',
    x: 60.5,
    y: 55.5,
    description: 'Pueblo fluvial de casas de piedra y campanarios menores. Vía de paso obligada para viajeros hacia el Mirador del Alba.',
    dangerLevel: 'Bajo',
    unlockedClue: 'Los pescadores aseguran haber oído campanas sonando bajo el agua del río.',
    secretFound: false
  },
  {
    id: 'mirador-del-alba',
    name: 'Mirador del Alba',
    subtitle: 'Bastión del acantilado sobre el Mar Oriental',
    x: 83.5,
    y: 54.0,
    description: 'Atalaya de piedra que divisa el amanecer sobre las aguas orientales. Antiguo faro y puesto de vigilia contra naves forasteras.',
    dangerLevel: 'Moderado',
    unlockedClue: 'En su torreón este se conserva un telescopio astronómico del siglo XVIII.',
    secretFound: false
  },
  {
    id: 'puerto-sombrio',
    name: 'Puerto Sombrío',
    subtitle: 'Muelle costero en el Mar Occidens (Sudoeste)',
    x: 19.5,
    y: 64.0,
    description: 'Puerto de aguas turbias y muelles de madera desgastada por la salitre. Punto de entrada de contrabandistas, marineros y fugitivos.',
    dangerLevel: 'Peligro Crítico',
    unlockedClue: 'Aquí llegó el barco en el que Gabriel escapó antes de refugiarse en Santa Vita.',
    secretFound: true
  },
  {
    id: 'bosque-de-los-susurros',
    name: 'Bosque de los Susurros',
    subtitle: 'Espesa foresta de pinos y niebla perpetua',
    x: 43.0,
    y: 72.5,
    description: 'Denso bosque donde el viento entre las ramas produce murmullos semejantes a letanías. Pocos se atreven a cruzarlo tras el ocaso.',
    dangerLevel: 'Peligro Crítico',
    unlockedClue: 'Entre las raíces de los robles viejos se hallan cruces de hierro sin nombre.',
    secretFound: false
  },
  {
    id: 'puente-del-suspiro',
    name: 'Puente del Suspiro',
    subtitle: 'Paso fluvial fortificado al sur',
    x: 55.5,
    y: 80.5,
    description: 'Puente de tres arcos de cantería custodiado por barbacanas. Cruce vital entre los senderos del sur y el estuario del mar.',
    dangerLevel: 'Moderado',
    unlockedClue: 'Bajo el arco central se conserva una lápida grabada con la fecha de la peste de 1870.',
    secretFound: false
  }
];

export const RADIO_BROADCAST: RadioBroadcast = {
  id: 'radio-sv-live',
  stationName: 'Radio Santa Vita',
  frequency: '88.6 MHz AM / OC',
  programTitle: 'Misa de Medianoche',
  host: 'Padre Lucien',
  isLive: true,
  listenersCount: 1428,
  audioTheme: 'organ',
  sermonText: [
    '«En el principio era la tiniebla, y la tiniebla no comprendió la luz, pero tampoco le temió.»',
    'Hermanos que escuchan en la soledad de sus aposentos... ¿han mirado alguna vez los ojos del crucifijo cuando se apaga la última vela?',
    'No busquen expiación donde solo hay penitencia. Convento Santa Vita continúa sus oraciones por las almas de aquellos cuyos nombres jamás figurarán en los libros de bautismo.',
    'Sintonizan la frecuencia sagrada. Permanezcan en vigilia. La noche apenas comienza.'
  ]
};

export const NEWSPAPER_DATA: NewspaperArticle = {
  id: 'periodico-la-verdad-ed-84',
  edition: 'Edición Extraordinaria Nº 84',
  headline: 'CONVENTO SANTA VITA NIEGA RUMORES SOBRE ACTIVIDADES ILÍCITAS',
  subheadline: 'El clero desmiente las denuncias de vecinos sobre ruidos subterráneos y desapariciones nocturnas.',
  date: 'Jueves, 14 de Noviembre',
  author: 'Por Julián S. Méndez (Enviado Especial de "La Verdad")',
  image: newspaperImg,
  paragraphs: [
    'SANTA VITA — En una rueda de prensa convocada a puertas cerradas, los voceros del Convento Santa Vita salieron al paso de los persistentes testimonios de los habitantes del valle circundante.',
    'Durante los últimos tres meses, más de una decena de testigos han reportado destellos de luz rojiza en la torre del campanario y cánticos en lenguas incomprensibles que se escuchan a través de las frecuencias radiales ordinarias.',
    '«Todo obedece a restauraciones arquitectónicas en el sistema de drenaje y a vigilias litúrgicas tradicionales», declaró el Padre Lucien a las afueras de la rectoría.',
    'Sin embargo, documentos filtrados a la redacción de este periódico sugieren la existencia de un túnel que conecta la cripta con la antigua cantera clausurada en 1954.'
  ],
  classifiedNote: 'ADVERTENCIA EDITORIAL: La imprenta fue allanada dos horas después de la distribución de este ejemplar. El redactor Julián S. Méndez no ha regresado a su domicilio.'
};

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'prod-1',
    name: 'Edición Deluxe: Cap 2 SOLO (Física)',
    category: 'Lectura',
    price: 34.99,
    description: 'Tomo encuadernado en piel sintética negra con estampado en pan de oro, marcapáginas con relicario y cartas exclusivas de Hermana Artemisa.',
    rarity: 'Místico',
    inStock: true,
    imageIcon: 'BookOpen'
  },
  {
    id: 'prod-2',
    name: 'Rosario de Obsidiana & Cera Negra',
    category: 'Reliquia',
    price: 19.50,
    description: 'Cuentas de obsidiana volcánica talladas a mano con cruz gótica de hierro envejecido. Consagrado en las vísperas de Santa Vita.',
    rarity: 'Raro',
    inStock: true,
    imageIcon: 'Cross'
  },
  {
    id: 'prod-3',
    name: 'Artbook Digital: Los Secretos del Convento',
    category: 'Coleccionable',
    price: 12.00,
    description: 'Más de 120 páginas con bocetos conceptuales, planos arquitectónicos de la cripta y diseños inéditos de personajes.',
    rarity: 'Común',
    inStock: true,
    imageIcon: 'Palette'
  },
  {
    id: 'prod-4',
    name: 'Pase de Archivos Clasificados (Acceso Total)',
    category: 'Pase',
    price: 8.99,
    description: 'Desbloquea instantáneamente todas las transcripciones confidenciales, audios del Padre Lucien y pistas del mapa.',
    rarity: 'Prohibido',
    inStock: true,
    imageIcon: 'Key'
  }
];

export const SECRET_FILES_DATA: SecretFile[] = [
  {
    id: 'file-001',
    code: 'EXP-1898-BAUTISMO',
    title: 'Acta Parroquial Confidencial: El Nacimiento de Sebastián',
    date: '22 de Agosto de 1898',
    classificationOfficer: 'Tribunal Canónico Diocesano',
    clearanceLevel: 'Clasificado',
    evidenceType: 'Acta Parroquial Censurada',
    isEncrypted: true,
    decryptKey: 'SEBASTIAN',
    hint: 'Nombre del sacerdote fallecido a quien Gabriel suplanta en el convento (Capítulo 2).',
    content: `PARROQUIA DE NUESTRA SEÑORA DEL PERPETUO SOCORRO
REGISTRO BAJO SECRETO CANÓNICO DE CONFESIÓN

Fecha: 22 de Agosto de 1898.
Oficiante: Archivero Diocesano.

Se deja constancia fehaciente del bautismo e inscripción del infante registrado como SEBASTIÁN. Hijo biológico no reconocido públicamente del entonces presbítero Fermín y de una joven de familia prominente que fue obligada a ingresar en clausura.

Por orden directa del vicario general, el menor fue trasladado al seminario del norte financiado mediante partidas especiales del convento. El padre Fermín conservó la tutela en las sombras.

Nota al margen (escrita con tinta desvaída y pulso tembloroso):
«Que Dios perdone la flaqueza de mi carne ante el altar. Mi propia sangre respira bajo los hábitos. Ningún hermano del clero debe saber que soy su padre.»`
  },
  {
    id: 'file-002',
    code: 'EXP-1923-BUSQUEDA',
    title: 'Ficha de Búsqueda e Investigación Criminal: Gabriel Valenzuela',
    date: '19 de Noviembre de 1923',
    classificationOfficer: 'Departamento de Investigaciones Policiales',
    clearanceLevel: 'Nivel 2',
    evidenceType: 'Informe Forense',
    isEncrypted: true,
    decryptKey: 'TRES DE LA MADRUGADA',
    hint: 'La hora exacta en que Gabriel se desvela con sus culpas, cigarrillos y recuerdos en el Capítulo 3 (4 palabras).',
    content: `DEPARTAMENTO DE POLICÍA JUDICIAL — DIVISIÓN DEFRAUDACIONES
EXPEDIENTE: VALENZUELA, GABRIEL (Alias: 'El Falso Inversionista')

Sujeto de sexo masculino, aproximadamente 30 años. Buscado activamente por estafa reiterada mediante falsificación de títulos crediticios, pagarés incobrables y usurpación de identidad en clubes de alta sociedad.

ANTECEDENTES DEL CASO:
El sospechoso fingió solvencia económica para comprometerse en matrimonio con la hija única de una influyente familia local, huyendo tras cobrar adelantos de dote y créditos privados.

ÚLTIMO AVISTAMIENTO:
Visto por última vez en la zona boscosa adyacente a los muros del Convento de Santa Vita tras ser emboscado por cobradores armados. 

DICTAMEN POLICIAL:
«Sujeto sumamente astuto y hábil en el engaño verbal. Se presume que ha obtenido refugio ilegal bajo identidad falsa. Los acreedores han puesto precio a su captura.»`
  },
  {
    id: 'file-003',
    code: 'DOC-1922-EPISTOLA',
    title: 'Correspondencia Incautada: La Promesa Rota antes del Claustro',
    date: '3 de Junio de 1922',
    classificationOfficer: 'Madre Superiora / Archivo Privado',
    clearanceLevel: 'Nivel 1',
    evidenceType: 'Carta Interceptada',
    isEncrypted: true,
    decryptKey: 'ELENA',
    hint: 'Nombre de la mujer a quien Gabriel engañó y que ahora viste los hábitos que lo ocultan en el convento.',
    content: `CARTA CONFISCADA EN LA CELDA DE CLAUSURA
Remitente: Novicia Elena • Destinatario: Gabriel Valenzuela (Sin despachar)

«Gabriel:
Sabía que tu reloj de oro era una baratija desde nuestra segunda cena en el club. Sabía que tus haciendas en el sur no existían. Pero te dejé mentirme porque era la primera vez que un hombre me miraba sin esperar de mí oraciones perfectas ni dotes familiares.

Cuando los prestamistas derribaron la puerta de mi padre, mi familia me impuso el velo perpetuo para lavar la deshonra del matrimonio cancelado. Me enterraron viva entre estos muros fríos.

Si algún día el destino o tus deudas te empujan a buscar asilo en Santa Vita, recuerda esto: no le temo a tus mentiras, sino al precio de sangre que este convento cobra a los pecadores. Cumple tu papel y no hables de más.»`
  },
  {
    id: 'file-004',
    code: 'MS-1924-ARTEMISA',
    title: 'Diario de Confesiones Prohibidas: La Misa de Medianoche',
    date: '15 de Octubre de 1924',
    classificationOfficer: 'Hermana Artemisa',
    clearanceLevel: 'Clasificado',
    evidenceType: 'Transcripción Oculta',
    isEncrypted: true,
    decryptKey: 'MEDIANOCHE',
    hint: 'El momento exacto en que las monjas se reúnen en la capilla con velos negros y velas encendidas (Capítulo 2).',
    content: `NOTAS MANUSCRITAS ENCONTRADAS TRAS LA TALLA DE SAN JERÓNIMO
Autor: Hermana Artemisa

«El forastero que viste la sotana de Sebastián suda frío en el púlpito. Sus manos tiemblan al alzar el cáliz de plata. Es un actor torpe, pero el viejo padre Fermín está tan ciego por su demencia que ve en ese farsante la redención de su juventud.

Elena cree que tiene el control de la situación. Pobre ilusa. En la misa de medianoche, mientras las demás hermanas cantaban el responsorio con los velos cubriendo sus rostros pálidos, vi las velas titilar sin viento.

El verdadero Sebastián está bajo la losa de la capilla este. Si el impostor descubre lo que guardan los pergaminos de la biblioteca, las puertas del convento no volverán a abrirse para él.»`
  },
  {
    id: 'file-005',
    code: 'LIBRO-1924-FERMIN',
    title: 'Libro de Horas del Prior: Memorias del Olvido y la Culpa',
    date: '2 de Noviembre de 1924',
    classificationOfficer: 'Padre Fermín',
    clearanceLevel: 'Ultra Secreto',
    evidenceType: 'Manuscrito Antiguo',
    isEncrypted: true,
    decryptKey: 'FERMIN',
    hint: 'Nombre del anciano sacerdote cuya memoria se desvanece por el Alzheimer creyendo que Gabriel es su hijo.',
    content: `PÁGINA ARRANCADA DEL BREVIARIO PERSONAL DEL PADRE FERMÍN

«A veces se me borra la oración del Padre Nuestro, pero nunca olvido el día en que entregué a mi muchacho para que el obispo no me quitara la parroquia. 

Hoy Sebastián me miró en la sacristía. Tiene la mirada esquiva y no recuerda el latín que le enseñé de pequeño... pero es él, Dios mío, es él. Ha vuelto a mí antes de que la niebla en mi cabeza lo cubra todo de blanco.

Las monjas susurran en los claustros. Sé que me creen loco y senil. Piensan que no sé de las donaciones que faltan ni de los ruidos en la cripta. Que hablen lo que quieran. Mientras mi muchacho esté a mi lado en el altar, el diablo no entrará en Santa Vita.»`
  },
  {
    id: 'file-006',
    code: 'VAULT-1924-SINODO',
    title: 'PROTOCOLO VACANTE: Bóveda Negra de los Votos de Sangre',
    date: '31 de Diciembre de 1924',
    classificationOfficer: 'Santo Oficio • Sínodo Inquisitorial',
    clearanceLevel: 'Bóveda Negra (Inaccesible)',
    evidenceType: 'Acta Parroquial Censurada',
    isEncrypted: true,
    isPermanentlyLocked: true,
    permanentLockReason: 'ACCESO DENEGADO PERMANENTE • CENSURA EPISCOPAL ABSOLUTA. Expediente lacrado bajo anatema y pena de excomunión mayor por el Tribunal Eclesiástico de 1924. No existen claves terrenales autorizadas para desclasificar este documento.',
    decryptKey: 'BLOQUEO_PERMANENTE',
    hint: '🔒 ARCHIVO SELLADO INDEFINIDAMENTE: Protegido por el Sínodo de las Sombras. Imposible de desbloquear.',
    content: `[DOCUMENTO CENSURADO PERMANENTEMENTE POR ORDEN DEL SANTO OFICIO]
Las fojas de este expediente permanecen confiscadas en el archivo secreto del Vaticano. Ningún usuario ni lector terrenal posee nivel de autorización para vulnerar este sello episcopal.`
  },
  {
    id: 'file-007',
    code: 'FORENSE-000-CRIPTAS',
    title: 'INFORME DE AUTOPSIA N° 0: El Cuerpo Oculto Bajo el Altar',
    date: '14 de Enero de 1925',
    classificationOfficer: 'Comisión Médica Extraordinaria',
    clearanceLevel: 'Bóveda Negra (Inaccesible)',
    evidenceType: 'Informe Forense',
    isEncrypted: true,
    isPermanentlyLocked: true,
    permanentLockReason: 'ACCESO DENEGADO PERMANENTE • EVIDENCIA CONFISCADA E INCINERADA. Las actas forenses y placas fotográficas fueron destruidas tras el allanamiento del subsuelo. Acceso denegado por secreto pontificio de clausura perpetua.',
    decryptKey: 'BLOQUEO_PERMANENTE',
    hint: '🔒 BÓVEDA IMPENETRABLE: Evidencia destruida e inaccesible. No puede ser desbloqueado.',
    content: `[EVIDENCIA FORENSE CONFISCADA Y DESTRUIDA]
Acceso bloqueado de por vida. Este archivo no puede ser desclasificado bajo ninguna circunstancia.`
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'tl-1',
    year: '1892',
    title: 'Fundación de Santa Vita',
    description: 'La orden del Silencio Perpetuo erige los muros del convento sobre las ruinas de una abadía cisterciense destruida por el fuego.',
    impactLevel: 'Clave'
  },
  {
    id: 'tl-2',
    year: '1924',
    title: 'El Eclipse de Cera Negra',
    description: 'Tres monjas desaparecen de la Celda 14 durante la vigilia pascual. Las campanas tañen solas durante siete horas seguidas.',
    impactLevel: 'Tragedia'
  },
  {
    id: 'tl-3',
    year: '1978',
    title: 'Instalación de Radio Santa Vita',
    description: 'El Padre Lucien asume la dirección del convento y monta la torre de transmisión sobre el campanario mayor.',
    impactLevel: 'Misterio'
  },
  {
    id: 'tl-4',
    year: '1924 - Presente',
    title: 'La Huida de Gabriel y la Farsa de Sebastián',
    description: 'Apertura de los acontecimientos narrados en la novela. Gabriel busca refugio en Santa Vita y descubre los secretos que yacen bajo las sombras.',
    impactLevel: 'Clave'
  }
];

export const NOTIFICATIONS_DATA: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Radio Santa Vita: En Vivo',
    message: 'El Padre Lucien ha iniciado la transmisión de la Misa de Medianoche (88.6 MHz).',
    time: 'Ahora',
    read: false,
    type: 'radio'
  },
  {
    id: 'notif-2',
    title: 'Nuevo Resumen Disponible',
    message: 'Capítulo 2 - Parte 4 "Ecos del Pasado" listo para lectura.',
    time: 'Hace 15 min',
    read: false,
    type: 'chapter'
  },
  {
    id: 'notif-3',
    title: 'Alerta de Archivos',
    message: 'Se ha detectado una señal codificada en el archivo EXP-1924-ALTAR.',
    time: 'Hace 1 hora',
    read: true,
    type: 'secret'
  }
];

export const CONVENT_CAMERAS: SecurityCamera[] = [
  {
    id: 'cam-01',
    code: 'CAM-01',
    name: 'Patio Trasero & Gran Claustro',
    location: 'Exterior Norte • Claustro de los Cipreses',
    status: 'ONLINE',
    description: 'Vista panorámica del jardín interior, arcos de piedra y la fuente seca donde las novicias pasean al alba.',
  },
  {
    id: 'cam-02',
    code: 'CAM-02',
    name: 'Capilla Mayor & Altar Sagrado',
    location: 'Planta Principal • Presbiterio',
    status: 'ONLINE',
    description: 'Enfoque directo al retablo barroco, velas votivas y el confesionario sellado con cadenas.',
  },
  {
    id: 'cam-03',
    code: 'CAM-03',
    name: 'Salón de Misa & Nave Central',
    location: 'Templo Principal • Bancos de Madera',
    status: 'ONLINE',
    description: 'Vista de los bancos de roble, vidrieras góticas y el pasillo central por donde camina el Padre Lucien.',
  },
  {
    id: 'cam-04',
    code: 'CAM-04',
    name: 'Pasillo del Noviciado & Celda 14',
    location: 'Ala Oeste • Clausura',
    status: 'ONLINE',
    description: 'Corredor de celdas austeras. La celda 14 permanece cerrada desde el incidente de 1924.',
  },
  {
    id: 'cam-05',
    code: 'CAM-05',
    name: 'Entrada a las Criptas Subterráneas',
    location: 'Nivel -1 • Bóveda de Osarios',
    status: 'ONLINE',
    description: 'Escaleras de piedra húmeda que descienden a las tumbas de los primeros abades.',
  },
  {
    id: 'cam-06',
    code: 'CAM-06',
    name: 'Campanario & Torre de Transmisión',
    location: 'Cima de la Torre • Antena de Radio',
    status: 'ONLINE',
    description: 'Estructura de madera y hierro que alberga la gran campana de bronce y los transmisores de Radio Santa Vita.',
  },
  {
    id: 'cam-07',
    code: 'CAM-07',
    name: 'Biblioteca de Manuscritos Prohibidos',
    location: 'Ala Este • Sala de Archivos',
    status: 'ONLINE',
    description: 'Estanterías con tomos encuadernados en piel y expedientes diocesanos clasificados.',
  },
  {
    id: 'cam-08',
    code: 'CAM-08',
    name: 'Confesionario & Sala Capitular',
    location: 'Nave Lateral • Entrada Secreta',
    status: 'ONLINE',
    description: 'Espacio de reunión del cabildo eclesiástico y celosía donde se escuchan las confesiones de Gabriel y Helena.',
  }
];
