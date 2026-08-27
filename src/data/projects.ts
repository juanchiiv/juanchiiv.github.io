import type { CaseStudy, MiniProject } from './types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'arenas-verdes',
    name: { en: 'Arenas Verdes', es: 'Arenas Verdes' },
    tagline: {
      en: 'The municipal campground, from spreadsheet to system',
      es: 'El camping municipal, de la planilla al sistema',
    },
    kind: 'internship',
    context: {
      en: 'Professional practice (UNICEN) for the Municipality of Lobería, later continued at DIXER',
      es: 'Prácticas profesionales (UNICEN) para la Municipalidad de Lobería, continuado después en DIXER',
    },
    period: { en: '2024 — 2026', es: '2024 — 2026' },
    role: {
      en: 'Full stack: data model, MVC backend, availability and booking logic, admin panel',
      es: 'Full stack: modelo de datos, backend MVC, lógica de disponibilidad y reservas, panel de administración',
    },
    accent: '#E0B368',
    why: {
      en: "Here I learned the hard part isn't the code, it's the rules the code has to respect.",
      es: 'Acá aprendí que lo difícil no es el código, son las reglas que el código tiene que respetar.',
    },
    problem: {
      en: 'The municipal campground at Arenas Verdes has around 900 plots across four sectors, and it fills up every summer. Bookings were handled by hand, outside any system. We were asked to refactor the reservation page, but once we sat down with the tourism office it was clear the real problem was different: nothing modelled a plot, its services, or whether it was free on a given date.',
      es: 'El camping municipal de Arenas Verdes tiene unos 900 lotes repartidos en cuatro sectores, y en verano se llena. Las reservas se manejaban a mano, fuera de todo sistema. Nos pidieron refactorizar la página de reservas, pero cuando nos sentamos con el área de turismo quedó claro que el problema era otro: no había nada que modelara una parcela, sus servicios, ni si estaba libre en una fecha.',
    },
    system: {
      en: "A full platform on hand-written MVC in PHP. Everything revolves around the plot: each one has a sector, a capacity and services — fire pit, power, shade, water, shower — and availability is calculated from that plus the dates and the group size. It's not a checkbox someone ticks.",
      es: 'Una plataforma completa con MVC escrito a mano en PHP. Todo gira alrededor de la parcela: cada una tiene sector, capacidad y servicios (fogón, luz, sombra, agua, ducha), y la disponibilidad se calcula a partir de eso más las fechas y la cantidad de gente. No es un casillero que alguien tilda.',
    },
    build: [
      {
        en: 'MySQL schema: users, plots, sectors, services, reservations and tariffs.',
        es: 'Esquema en MySQL: usuarios, parcelas, sectores, servicios, reservas y tarifas.',
      },
      {
        en: 'MVC from scratch: routing into controllers, models as the only database access, PHTML views.',
        es: 'MVC desde cero: ruteo a controladores, modelos como único acceso a la base, vistas en PHTML.',
      },
      {
        en: 'Availability search by dates, group size and required services, resolved in a single query.',
        es: 'Búsqueda de disponibilidad por fechas, cantidad de personas y servicios requeridos, resuelta en una sola consulta.',
      },
      {
        en: 'Six-step booking flow and a price simulator, with separate tariffs for residents and non-residents.',
        es: 'Reserva en seis pasos y simulador de precios, con tarifas distintas para residentes y no residentes.',
      },
      {
        en: 'Admin panel to enable or disable plots for maintenance, outside the booking flow.',
        es: 'Panel para habilitar o deshabilitar parcelas por mantenimiento, por fuera del flujo de reservas.',
      },
      {
        en: 'Login and password recovery, PDF reports with TCPDF, mail through PHPMailer and scheduled notices with node-cron.',
        es: 'Login y recuperación de contraseña, informes en PDF con TCPDF, mails con PHPMailer y avisos programados con node-cron.',
      },
    ],
    challenges: [
      {
        title: { en: "Availability isn't a yes or no", es: 'La disponibilidad no es un sí o un no' },
        body: {
          en: 'A plot is free for a date range, for a group that fits its capacity, if it has the services they asked for, and if nobody pulled it for maintenance. Solving all of that in one query instead of filtering in PHP afterwards is what made me think about the data model first.',
          es: 'Una parcela está libre para un rango de fechas, para un grupo que entre en su capacidad, si tiene los servicios que pidieron y si nadie la sacó por mantenimiento. Resolver todo eso en una consulta, en vez de filtrar en PHP después, fue lo que me hizo pensar primero en el modelo de datos.',
        },
      },
      {
        title: {
          en: 'The simulator and the booking had to agree',
          es: 'El simulador y la reserva tenían que dar lo mismo',
        },
        body: {
          en: "The price depends on people per age bracket, the number of days and whether they're Lobería residents. Write that calculation twice and sooner or later the two numbers disagree. It ended up living in one place.",
          es: 'El precio depende de la cantidad de personas por edad, los días y si son residentes de Lobería. Si el cálculo se escribe dos veces, tarde o temprano los dos números no coinciden. Terminó viviendo en un solo lugar.',
        },
      },
      {
        title: {
          en: 'It started as one page and became the whole site',
          es: 'Empezó como una página y terminó siendo el sitio',
        },
        body: {
          en: "The scope grew along the way. Keeping a hand-made MVC structure tidy while new requests kept arriving forced me to be strict: controllers don't touch SQL, models don't render.",
          es: 'El alcance creció en el camino. Mantener ordenada una estructura MVC hecha a mano mientras llegaban pedidos nuevos me obligó a ser estricto: los controladores no tocan SQL, los modelos no renderizan.',
        },
      },
    ],
    result: {
      en: 'We presented it to the tourism office at the end of the practice and it was accepted with every objective met. My first job came out of it, and I later kept working on it at DIXER, this time as a professional.',
      es: 'Lo presentamos al área de turismo al cerrar la práctica y quedó aceptado con todos los objetivos cumplidos. De ahí salió mi primer trabajo, y después seguí tocándolo en DIXER, ya como profesional.',
    },
    stack: ['PHP', 'MVC', 'PHTML', 'MySQL / MariaDB', 'JavaScript', 'CSS', 'PHPMailer', 'TCPDF', 'Node.js', 'node-cron', 'Apache', 'Git'],
    evidence: [
      { label: { en: 'Domain', es: 'Dominio' }, value: { en: '~900 plots · 4 sectors', es: '~900 lotes · 4 sectores' } },
      { label: { en: 'Architecture', es: 'Arquitectura' }, value: { en: 'MVC by hand', es: 'MVC a mano' } },
      { label: { en: 'Delivered to', es: 'Entregado a' }, value: { en: 'Municipal tourism office', es: 'Área de turismo municipal' } },
      { label: { en: 'Team', es: 'Equipo' }, value: { en: '4 students', es: '4 estudiantes' } },
    ],
    architecture: {
      caption: {
        en: 'Every request comes in through a controller. Nothing reaches MySQL except through a model.',
        es: 'Toda petición entra por un controlador. Nada llega a MySQL si no es por un modelo.',
      },
      layers: [
        {
          id: 'l0',
          tier: { en: 'USERS', es: 'USUARIOS' },
          nodes: [
            { id: 'visitor', label: { en: 'Visitor', es: 'Visitante' } },
            { id: 'admin', label: { en: 'Admin', es: 'Administrador' } },
          ],
        },
        {
          id: 'l1',
          tier: { en: 'VIEW', es: 'VISTA' },
          nodes: [
            {
              id: 'phtml',
              label: { en: 'PHTML views', es: 'Vistas PHTML' },
              note: { en: 'forms · plot map', es: 'formularios · mapa' },
            },
          ],
        },
        {
          id: 'l2',
          tier: { en: 'CONTROLLER', es: 'CONTROLADOR' },
          nodes: [
            { id: 'auth', label: { en: 'Auth', es: 'Auth' } },
            { id: 'resv', label: { en: 'Bookings', es: 'Reservas' } },
            { id: 'plots', label: { en: 'Plot control', es: 'Control de parcelas' } },
          ],
        },
        {
          id: 'l3',
          tier: { en: 'RULES', es: 'REGLAS' },
          nodes: [
            {
              id: 'avail',
              label: { en: 'Availability', es: 'Disponibilidad' },
              note: { en: 'dates × capacity × services', es: 'fechas × capacidad × servicios' },
              hot: true,
            },
            {
              id: 'pricing',
              label: { en: 'Pricing', es: 'Precios' },
              note: { en: 'resident / non-resident', es: 'residente / no residente' },
            },
          ],
        },
        {
          id: 'l4',
          tier: { en: 'MODEL', es: 'MODELO' },
          nodes: [
            {
              id: 'models',
              label: { en: 'Models', es: 'Modelos' },
              note: { en: 'only database access', es: 'único acceso a la base' },
            },
          ],
        },
        {
          id: 'l5',
          tier: { en: 'DATA', es: 'DATOS' },
          nodes: [
            {
              id: 'mysql',
              label: { en: 'MySQL', es: 'MySQL' },
              note: { en: 'plots · services · bookings', es: 'parcelas · servicios · reservas' },
            },
          ],
        },
        {
          id: 'l6',
          tier: { en: 'JOBS', es: 'TAREAS' },
          nodes: [
            { id: 'cron', label: { en: 'node-cron', es: 'node-cron' } },
            { id: 'pdf', label: { en: 'TCPDF reports', es: 'Informes TCPDF' } },
            { id: 'mail', label: { en: 'PHPMailer', es: 'PHPMailer' } },
          ],
        },
      ],
      links: [
        ['visitor', 'phtml'], ['admin', 'phtml'],
        ['phtml', 'auth'], ['phtml', 'resv'], ['phtml', 'plots'],
        ['resv', 'avail'], ['resv', 'pricing'], ['plots', 'avail'], ['auth', 'models'],
        ['avail', 'models'], ['pricing', 'models'],
        ['models', 'mysql'],
        ['mysql', 'cron'], ['mysql', 'pdf'], ['cron', 'mail'],
      ],
    },
  },

  {
    id: 'fixture-2026',
    name: { en: 'Fixture 2026', es: 'Fixture 2026' },
    tagline: {
      en: "Scores and payments that can't go wrong",
      es: 'Puntajes y pagos que no pueden fallar',
    },
    kind: 'professional',
    context: {
      en: 'DIXER — in production for the 2026 World Cup',
      es: 'DIXER — en producción para el Mundial 2026',
    },
    period: { en: 'May — Jul 2026', es: 'May — Jul 2026' },
    role: {
      en: 'Full stack: 141 of 387 commits, with three other developers',
      es: 'Full stack: 141 de 387 commits, con otros tres desarrolladores',
    },
    accent: '#FF7A45',
    why: {
      en: 'Mistakes here show: a miscalculated point changes the ranking, and a mishandled payment charges twice.',
      es: 'Los errores acá se notan: un punto mal calculado cambia el ranking, y un pago mal procesado cobra dos veces.',
    },
    problem: {
      en: "A World Cup prediction platform: people forecast results and earn points, and alongside it businesses sell entries and vendors earn commission. Two things can't be approximate — the score that orders the ranking, and the payment that moved real money. Both have to survive a result being corrected afterwards, or the payment gateway answering late, twice, or never.",
      es: 'Una plataforma de pronósticos del Mundial: la gente predice resultados y suma puntos, y por otro lado hay comercios que venden participaciones y vendedores que cobran comisión. Dos cosas no admiten un "más o menos": el puntaje que ordena el ranking y el pago que movió plata de verdad. Y las dos tienen que aguantar que un resultado se corrija después, o que la pasarela responda tarde, dos veces, o nunca.',
    },
    system: {
      en: "Laravel 12 on PHP 8.2, with the logic pulled out of the controllers and into services. Scoring, ranking, payments, referrals and auditing are each their own class. That's what makes recalculating or reprocessing routine instead of an emergency.",
      es: 'Laravel 12 sobre PHP 8.2, con la lógica sacada de los controladores y puesta en servicios. Puntaje, ranking, pagos, referidos y auditoría son cada uno su propia clase. Gracias a eso, recalcular o reprocesar es algo normal y no una emergencia.',
    },
    build: [
      {
        en: '34 migrations: tournaments, matches, participants, predictions, businesses, vendors, sales and roles.',
        es: '34 migraciones: torneos, partidos, participantes, pronósticos, comercios, vendedores, ventas y roles.',
      },
      {
        en: 'Scoring split in two: one class decides what a prediction is worth, another reprocesses everything when a result is corrected.',
        es: 'Puntaje separado en dos: una clase decide cuánto vale un pronóstico, la otra reprocesa todo cuando se corrige un resultado.',
      },
      {
        en: 'Ranking as its own service, derived from the scores instead of maintained by hand.',
        es: 'Ranking como servicio aparte, derivado de los puntajes en vez de mantenerse a mano.',
      },
      {
        en: 'MercadoPago with orders and events kept separate: the order holds the state, the events hold everything the gateway sent.',
        es: 'MercadoPago con órdenes y eventos separados: la orden guarda el estado, los eventos guardan todo lo que mandó la pasarela.',
      },
      {
        en: 'Audit logging on three fronts: sign-in, profile changes and result changes.',
        es: 'Auditoría en tres frentes: login, cambios de perfil y cambios de resultados.',
      },
      {
        en: 'Sign-in with Breeze and with Google, referral codes, and one account that can be participant, business or vendor.',
        es: 'Login con Breeze y con Google, códigos de referido, y una misma cuenta que puede ser participante, comercio o vendedor.',
      },
    ],
    challenges: [
      {
        title: {
          en: 'A callback that can arrive twice',
          es: 'Un callback que puede llegar dos veces',
        },
        body: {
          en: 'Gateways retry, answer out of order, and sometimes never answer. Storing the payment as an order with a state plus the events that came in — instead of a column someone overwrites — means the same notice arriving again breaks nothing, and lets you reconstruct afterwards what actually happened.',
          es: 'Las pasarelas reintentan, responden fuera de orden y a veces no responden. Guardar el pago como una orden con estado más los eventos que fueron llegando, en lugar de una columna que alguien pisa, hace que el mismo aviso repetido no rompa nada y permite reconstruir después qué pasó.',
        },
      },
      {
        title: {
          en: 'Results change after everyone was scored',
          es: 'Los resultados cambian después de puntuar',
        },
        body: {
          en: "A result gets loaded wrong and everyone's points have to be redone. That had to be a normal operation of the system, not a manual fix. Every change is logged, so a disputed position can be traced back to the edit that caused it.",
          es: 'Un resultado se carga mal y hay que rehacer los puntos de todos. Eso tenía que ser una operación normal del sistema y no un arreglo a mano. Cada cambio queda registrado, así una posición discutida se puede rastrear hasta la edición que la causó.',
        },
      },
    ],
    result: {
      en: 'It went live for the tournament. The repository has 387 commits from four people between May and July 2026; 141 are mine, and they cover payments, scoring, auditing and the commerce side. Continuous integration runs on GitHub Actions.',
      es: 'Salió a producción para el torneo. El repositorio tiene 387 commits de cuatro personas entre mayo y julio de 2026; 141 son míos, y son los de pagos, puntaje, auditoría y comercios. La integración continua corre en GitHub Actions.',
    },
    stack: ['PHP 8.2', 'Laravel 12', 'MySQL', 'Blade', 'JavaScript', 'MercadoPago', 'Socialite', 'PHPUnit', 'Docker', 'GitHub Actions', 'Git'],
    evidence: [
      { label: { en: 'My commits', es: 'Mis commits' }, value: { en: '141 of 387', es: '141 de 387' } },
      { label: { en: 'Migrations', es: 'Migraciones' }, value: { en: '34', es: '34' } },
      { label: { en: 'Services', es: 'Servicios' }, value: { en: '12', es: '12' } },
      { label: { en: 'Team', es: 'Equipo' }, value: { en: '4 developers', es: '4 desarrolladores' } },
    ],
    architecture: {
      caption: {
        en: 'The payment state comes from its events, and the scores come from the results, so both can be replayed.',
        es: 'El estado del pago sale de sus eventos y los puntajes salen de los resultados, así que los dos se pueden reprocesar.',
      },
      layers: [
        {
          id: 'l0',
          tier: { en: 'CLIENT', es: 'CLIENTE' },
          nodes: [
            { id: 'user', label: { en: 'Participant', es: 'Participante' } },
            { id: 'shop', label: { en: 'Business / vendor', es: 'Comercio / vendedor' } },
          ],
        },
        {
          id: 'l1',
          tier: { en: 'UI', es: 'UI' },
          nodes: [{ id: 'blade', label: { en: 'Blade + JS', es: 'Blade + JS' } }],
        },
        {
          id: 'l2',
          tier: { en: 'HTTP', es: 'HTTP' },
          nodes: [
            { id: 'pred', label: { en: 'Predictions', es: 'Pronósticos' } },
            { id: 'checkout', label: { en: 'Checkout', es: 'Checkout' } },
            { id: 'adminc', label: { en: 'Admin', es: 'Admin' } },
          ],
        },
        {
          id: 'l3',
          tier: { en: 'DOMAIN', es: 'DOMINIO' },
          nodes: [
            {
              id: 'score',
              label: { en: 'Scoring', es: 'Puntaje' },
              note: { en: 'calculate + redo', es: 'calcular + rehacer' },
              hot: true,
            },
            { id: 'rank', label: { en: 'Ranking', es: 'Ranking' } },
            {
              id: 'pay',
              label: { en: 'Payments', es: 'Pagos' },
              note: { en: 'orders + events', es: 'órdenes + eventos' },
              hot: true,
            },
            { id: 'audit', label: { en: 'Audit', es: 'Auditoría' } },
          ],
        },
        {
          id: 'l4',
          tier: { en: 'DATA', es: 'DATOS' },
          nodes: [
            {
              id: 'db',
              label: { en: 'MySQL', es: 'MySQL' },
              note: { en: '34 migrations', es: '34 migraciones' },
            },
          ],
        },
        {
          id: 'l5',
          tier: { en: 'EXTERNAL', es: 'EXTERNO' },
          nodes: [
            { id: 'mp', label: { en: 'MercadoPago', es: 'MercadoPago' } },
            { id: 'google', label: { en: 'Google OAuth', es: 'Google OAuth' } },
          ],
        },
      ],
      links: [
        ['user', 'blade'], ['shop', 'blade'],
        ['blade', 'pred'], ['blade', 'checkout'], ['blade', 'adminc'],
        ['pred', 'score'], ['adminc', 'score'], ['checkout', 'pay'],
        ['score', 'rank'], ['pred', 'audit'], ['adminc', 'audit'],
        ['score', 'db'], ['rank', 'db'], ['pay', 'db'], ['audit', 'db'],
        ['pay', 'mp'], ['mp', 'pay'], ['google', 'blade'],
      ],
    },
  },

  {
    id: 'urban-mobility',
    name: { en: 'Scooter Sharing', es: 'Monopatines Compartidos' },
    tagline: {
      en: 'One domain, five services, two databases',
      es: 'Un dominio, cinco servicios, dos bases',
    },
    kind: 'academic',
    context: {
      en: 'Web Architectures — Tecnicatura en Desarrollo de Aplicaciones Informáticas, UNICEN',
      es: 'Arquitecturas Web — Tecnicatura en Desarrollo de Aplicaciones Informáticas, UNICEN',
    },
    period: { en: '2024', es: '2024' },
    role: {
      en: 'Service decomposition, data modelling, API design and reporting endpoints',
      es: 'Descomposición en servicios, modelado de datos, diseño de la API y endpoints de reportes',
    },
    accent: '#5EE9D0',
    why: {
      en: "Here I had to justify every boundary: why this goes together and that goes apart, and why one of the services doesn't use SQL.",
      es: 'Acá tuve que justificar cada límite: por qué esto va junto y aquello separado, y por qué uno de los servicios no usa SQL.',
    },
    problem: {
      en: 'A shared e-scooter system: units parked at stations, customers who use them, tariffs, billing, and an operator who needs to know which units are earning and which are in maintenance. All in one application it becomes a tangle of tables. The task was to cut it into services along lines that actually made sense.',
      es: 'Un sistema de monopatines compartidos: unidades en paradas, clientes que las usan, tarifas, facturación, y un operador que necesita saber qué unidades rinden y cuáles están en mantenimiento. Todo junto en una sola aplicación es una maraña de tablas. La consigna era cortarlo en servicios por líneas que tuvieran sentido.',
    },
    system: {
      en: 'Spring Boot microservices, cut by which tables each one uses rather than by name. A scooter and its station are always read together, so they stayed in one service. Trip routes went to MongoDB because they are documents that grow and change shape; everything else stayed in MySQL, where constraints are worth having.',
      es: 'Microservicios en Spring Boot, cortados por qué tablas usa cada uno y no por el nombre. El monopatín y la parada se leen siempre juntos, así que quedaron en un mismo servicio. Los recorridos van a MongoDB porque son documentos que crecen y cambian de forma; el resto se queda en MySQL, donde las restricciones sirven.',
    },
    build: [
      {
        en: 'Five services: Scooter + Station, Customer, User, Administration and Trip, each with its own tables.',
        es: 'Cinco servicios: Monopatín + Parada, Cliente, Usuario, Administración y Recorrido, cada uno con sus tablas.',
      },
      {
        en: 'REST API documented as OpenAPI 3.0, with DTO schemas and a bearer token declared as a security scheme.',
        es: 'API REST documentada como OpenAPI 3.0, con esquemas de DTO y bearer token declarado como esquema de seguridad.',
      },
      {
        en: "DTOs at the boundary so entities don't leak out of a service.",
        es: 'DTOs en el límite para que las entidades no se escapen del servicio.',
      },
      {
        en: 'Reports resolved with JPQL: kilometres per scooter, trips per year, available versus unavailable, and pause time excluded.',
        es: 'Reportes resueltos con JPQL: kilómetros por monopatín, viajes por año, disponibles contra no disponibles, y descontando el tiempo en pausa.',
      },
      {
        en: 'Nearest scooters by latitude and longitude, plus the fleet lifecycle: register, send to maintenance, return, retire.',
        es: 'Monopatines cercanos por latitud y longitud, más el ciclo de vida de la flota: alta, mantenimiento, vuelta al servicio y baja.',
      },
    ],
    challenges: [
      {
        title: { en: 'Where to cut', es: 'Dónde cortar' },
        body: {
          en: "The rule I settled on was which tables each service uses, not what it's called. A scooter without its station is useless, so they go together. Administration, Customer and User barely touch each other, so they go apart. Splitting for tidiness instead of coupling is how a microservice system ends up a monolith spread across processes.",
          es: 'La regla que terminé usando fue qué tablas usa cada servicio, no cómo se llama. Un monopatín sin su parada no sirve para nada, así que van juntos. Administración, Cliente y Usuario casi no se tocan, así que van separados. Partir por prolijidad y no por acoplamiento es como un sistema de microservicios termina siendo un monolito repartido.',
        },
      },
      {
        title: { en: 'Two databases on purpose', es: 'Dos bases a propósito' },
        body: {
          en: 'A trip route grows while the trip is happening and has no fixed shape. In a relational model you end up with either a huge table or a join per point. It went to Mongo. Tariffs, billing and credentials stayed in MySQL. The interesting part was having to defend why that split exists at all.',
          es: 'El recorrido de un viaje crece mientras el viaje pasa y no tiene forma fija. En relacional te queda una tabla enorme o un join por punto. Fue a Mongo. Tarifas, facturación y credenciales se quedaron en MySQL. Lo interesante fue tener que defender por qué existe esa división.',
        },
      },
    ],
    result: {
      en: 'Delivered as a documented API: the OpenAPI 3.0 spec for the scooter service with its request, response and error schemas, plus a Postman collection to exercise it against the running services.',
      es: 'Quedó entregado como una API documentada: la especificación OpenAPI 3.0 del servicio de monopatines con sus esquemas de petición, respuesta y error, más una colección de Postman para probarla contra los servicios corriendo.',
    },
    stack: ['Java', 'Spring Boot', 'Spring Data JPA', 'JPQL', 'DTOs', 'REST', 'MySQL', 'MongoDB', 'JWT', 'OpenAPI', 'Postman', 'Maven'],
    evidence: [
      { label: { en: 'Services', es: 'Servicios' }, value: { en: '5', es: '5' } },
      { label: { en: 'Databases', es: 'Bases' }, value: { en: 'MySQL + MongoDB', es: 'MySQL + MongoDB' } },
      { label: { en: 'Contract', es: 'Contrato' }, value: { en: 'OpenAPI 3.0', es: 'OpenAPI 3.0' } },
      { label: { en: 'Auth', es: 'Auth' }, value: { en: 'JWT bearer', es: 'JWT bearer' } },
    ],
    architecture: {
      caption: {
        en: 'Each service owns its tables, and the database is chosen per service from the shape of its data.',
        es: 'Cada servicio es dueño de sus tablas, y la base se elige por servicio según la forma de sus datos.',
      },
      layers: [
        {
          id: 'l0',
          tier: { en: 'CLIENT', es: 'CLIENTE' },
          nodes: [{ id: 'app', label: { en: 'Client', es: 'Cliente' } }],
        },
        {
          id: 'l1',
          tier: { en: 'CONTRACT', es: 'CONTRATO' },
          nodes: [
            {
              id: 'api',
              label: { en: 'REST · OpenAPI', es: 'REST · OpenAPI' },
              note: { en: 'JWT bearer', es: 'JWT bearer' },
            },
          ],
        },
        {
          id: 'l2',
          tier: { en: 'SERVICES', es: 'SERVICIOS' },
          nodes: [
            { id: 'svc-user', label: { en: 'User', es: 'Usuario' }, note: { en: 'JWT', es: 'JWT' } },
            { id: 'svc-cust', label: { en: 'Customer', es: 'Cliente' }, note: { en: 'payments', es: 'pagos' } },
            {
              id: 'svc-adm',
              label: { en: 'Administration', es: 'Administración' },
              note: { en: 'tariffs · billing', es: 'tarifas · facturación' },
            },
            { id: 'svc-scoot', label: { en: 'Scooter + Station', es: 'Monopatín + Parada' }, hot: true },
            { id: 'svc-trip', label: { en: 'Trip', es: 'Recorrido' }, note: { en: 'routes', es: 'trayectos' }, hot: true },
          ],
        },
        {
          id: 'l3',
          tier: { en: 'DATA', es: 'DATOS' },
          nodes: [
            { id: 'mysql', label: { en: 'MySQL', es: 'MySQL' }, note: { en: 'relational core', es: 'núcleo relacional' } },
            { id: 'mongo', label: { en: 'MongoDB', es: 'MongoDB' }, note: { en: 'route documents', es: 'documentos de recorrido' } },
          ],
        },
        {
          id: 'l4',
          tier: { en: 'REPORTS', es: 'REPORTES' },
          nodes: [
            {
              id: 'rep',
              label: { en: 'JPQL reports', es: 'Reportes JPQL' },
              note: { en: 'km · trips · availability', es: 'km · viajes · disponibilidad' },
            },
          ],
        },
      ],
      links: [
        ['app', 'api'],
        ['api', 'svc-user'], ['api', 'svc-cust'], ['api', 'svc-adm'], ['api', 'svc-scoot'], ['api', 'svc-trip'],
        ['svc-user', 'mysql'], ['svc-cust', 'mysql'], ['svc-adm', 'mysql'], ['svc-scoot', 'mysql'],
        ['svc-trip', 'mongo'],
        ['mysql', 'rep'], ['mongo', 'rep'],
      ],
    },
  },

  {
    id: 'rift-legacy',
    name: { en: 'Rift Legacy', es: 'Rift Legacy' },
    tagline: {
      en: 'A simulator that has to feel believable',
      es: 'Un simulador que tiene que resultar creíble',
    },
    kind: 'personal',
    context: {
      en: 'Personal project, deployed on Cloudflare Pages',
      es: 'Proyecto personal, desplegado en Cloudflare Pages',
    },
    period: { en: '2026', es: '2026' },
    role: {
      en: 'On my own: engine, data pipeline, verification scripts and interface',
      es: 'Solo: motor, pipeline de datos, scripts de verificación e interfaz',
    },
    accent: '#B47CFF',
    why: {
      en: 'No client and no deadline, and the hardest problem I have set myself: that what comes out has to feel believable.',
      es: 'Sin cliente ni fecha de entrega, y con el problema más difícil que me puse solo: que lo que sale tiene que resultar creíble.',
    },
    problem: {
      en: "A career simulator for a pro esports player: you create a rookie and the system runs their whole career, with teams, offers, tournaments and retirement. The screens aren't the hard part. A simulator is only worth what its rules are worth, and rules that produce absurd outcomes — a rookie winning everything, or three difficulties that lead to the same career — ruin it without ever throwing a single error.",
      es: 'Un simulador de carrera de un jugador profesional de esports: creás un novato y el sistema corre toda su carrera, con equipos, ofertas, torneos y retiro. Lo difícil no son las pantallas. Un simulador vale lo que valen sus reglas, y unas reglas que dan resultados absurdos (un novato que gana todo, o tres dificultades que llevan a la misma carrera) lo arruinan sin dar un solo error.',
    },
    system: {
      en: "A TypeScript engine kept separate from the interface. State advances through a calendar engine and a decision system, and React only draws what the engine returned. Since the failure mode is \"wrong but not broken\", there's a set of scripts that test the rules rather than the screen.",
      es: 'Un motor en TypeScript separado de la interfaz. El estado avanza por un motor de calendario y un sistema de decisiones, y React solo dibuja lo que el motor devolvió. Como la falla es "está mal pero no se rompe", hay una batería de scripts que prueban las reglas y no la pantalla.',
    },
    build: [
      {
        en: 'Typed domain model for players, teams, tournaments, offers and achievements, all in one place.',
        es: 'Modelo de dominio tipado para jugadores, equipos, torneos, ofertas y logros, todo en un solo lugar.',
      },
      {
        en: 'Simulation engine and calendar engine that move a career forward season by season.',
        es: 'Motor de simulación y motor de calendario que hacen avanzar la carrera temporada a temporada.',
      },
      {
        en: "Idempotent decisions: repeating one doesn't stack its effects.",
        es: 'Decisiones idempotentes: repetir una no acumula sus efectos.',
      },
      {
        en: 'Seeded randomness, so a run can be repeated and audited instead of only watched.',
        es: 'Aleatoriedad con semilla, para que una partida se pueda repetir y auditar en vez de solo mirarla.',
      },
      {
        en: '27 Node scripts for verification, auditing and fuzzing, including a full-career fuzz run.',
        es: '27 scripts de Node de verificación, auditoría y fuzzing, incluido un fuzz de carrera completa.',
      },
    ],
    challenges: [
      {
        title: {
          en: 'The three difficulties were the same one',
          es: 'Las tres dificultades eran la misma',
        },
        body: {
          en: "Intense, normal and express were supposed to give different careers. An audit that ran careers and compared the distributions showed they had converged: they differed in the label more than in the outcome. Playing it, I would never have noticed.",
          es: 'Intensa, normal y exprés tenían que dar carreras distintas. Una auditoría que corrió carreras y comparó las distribuciones mostró que habían convergido: se diferenciaban en el nombre más que en el resultado. Jugando no me iba a dar cuenta nunca.',
        },
      },
      {
        title: {
          en: 'Verifying something with no right answer',
          es: 'Verificar algo que no tiene respuesta correcta',
        },
        body: {
          en: 'There is no expected output for "a believable career". So the tests are about properties: decisions must not stack, a whole career must never reach an impossible state, offers must stay within reason. There are 27 scripts because each one pins down a rule I could otherwise only feel.',
          es: 'No hay un resultado esperado para "una carrera creíble". Así que las pruebas son sobre propiedades: que las decisiones no se acumulen, que una carrera entera nunca llegue a un estado imposible, que las ofertas se mantengan dentro de lo razonable. Hay 27 scripts porque cada uno fija una regla que si no solo podía intuir.',
        },
      },
    ],
    result: {
      en: 'Playable and deployed on Cloudflare Pages. The repository holds the engine, the generated catalogues and the whole set of verification scripts.',
      es: 'Está jugable y desplegado en Cloudflare Pages. En el repositorio están el motor, los catálogos generados y toda la batería de verificación.',
    },
    stack: ['TypeScript', 'SvelteKit', 'React', 'Vite', 'Zustand', 'Tailwind CSS', 'Node.js', 'Cloudflare Pages'],
    evidence: [
      { label: { en: 'Scripts', es: 'Scripts' }, value: { en: '27 verification', es: '27 de verificación' } },
      { label: { en: 'Engine', es: 'Motor' }, value: { en: 'Separate from the UI', es: 'Separado de la interfaz' } },
      { label: { en: 'Randomness', es: 'Aleatoriedad' }, value: { en: 'Seeded', es: 'Con semilla' } },
      { label: { en: 'Author', es: 'Autor' }, value: { en: 'On my own', es: 'Yo solo' } },
    ],
    links: [{ label: { en: 'Repository', es: 'Repositorio' }, href: 'https://github.com/juanchiiv/rift-legacy' }],
    architecture: {
      caption: {
        en: 'The engine never imports the interface. Everything the player sees is a projection of simulated state.',
        es: 'El motor nunca importa la interfaz. Todo lo que ve el jugador es una proyección del estado simulado.',
      },
      layers: [
        {
          id: 'l0',
          tier: { en: 'PLAYER', es: 'JUGADOR' },
          nodes: [{ id: 'p', label: { en: 'Player', es: 'Jugador' } }],
        },
        {
          id: 'l1',
          tier: { en: 'UI', es: 'UI' },
          nodes: [
            { id: 'career', label: { en: 'Career screen', es: 'Pantalla de carrera' } },
            { id: 'moments', label: { en: 'Decisive moments', es: 'Momentos decisivos' } },
            { id: 'eco', label: { en: 'Ecosystem', es: 'Ecosistema' } },
          ],
        },
        {
          id: 'l2',
          tier: { en: 'STATE', es: 'ESTADO' },
          nodes: [
            {
              id: 'store',
              label: { en: 'Store', es: 'Store' },
              note: { en: 'single source of truth', es: 'única fuente de verdad' },
            },
          ],
        },
        {
          id: 'l3',
          tier: { en: 'ENGINE', es: 'MOTOR' },
          nodes: [
            { id: 'engine', label: { en: 'Simulation', es: 'Simulación' }, hot: true },
            { id: 'cal', label: { en: 'Calendar', es: 'Calendario' } },
            {
              id: 'dec',
              label: { en: 'Decisions', es: 'Decisiones' },
              note: { en: 'idempotent', es: 'idempotentes' },
            },
          ],
        },
        {
          id: 'l4',
          tier: { en: 'DATA', es: 'DATOS' },
          nodes: [
            {
              id: 'gen',
              label: { en: 'Generated data', es: 'Datos generados' },
              note: { en: 'teams · champions · events', es: 'equipos · campeones · torneos' },
            },
          ],
        },
        {
          id: 'l5',
          tier: { en: 'TESTS', es: 'PRUEBAS' },
          nodes: [
            {
              id: 'harness',
              label: { en: '27 scripts', es: '27 scripts' },
              hot: true,
            },
          ],
        },
      ],
      links: [
        ['p', 'career'], ['p', 'moments'], ['p', 'eco'],
        ['career', 'store'], ['moments', 'store'], ['eco', 'store'],
        ['store', 'engine'], ['store', 'cal'], ['store', 'dec'],
        ['engine', 'gen'], ['cal', 'gen'], ['dec', 'engine'],
        ['harness', 'engine'], ['harness', 'cal'], ['harness', 'dec'],
      ],
    },
  },
];

export const miniProjects: MiniProject[] = [
  {
    id: 'gestion-empresarial',
    name: { en: 'Business Management System', es: 'Sistema de Gestión Empresarial' },
    kind: 'professional',
    context: { en: 'DIXER — custom-built', es: 'DIXER — hecho a medida' },
    period: { en: '2025', es: '2025' },
    accent: '#7FB2FF',
    summary: {
      en: 'A management system built from scratch for a company in the energy sector, with between 10 and 15 modules.',
      es: 'Un sistema de gestión hecho a medida para una empresa del sector energético, con entre 10 y 15 módulos.',
    },
    points: [
      {
        en: 'Inventory, vehicles, services, billing, reconciliation, interventions and notifications.',
        es: 'Inventario, vehículos, servicios, facturación, conciliación, intervenciones y notificaciones.',
      },
      {
        en: 'Integration with external services, including the Central Bank API.',
        es: 'Integración con servicios externos, entre ellos la API del Banco Central.',
      },
      {
        en: 'Django over MySQL, containerised with Docker.',
        es: 'Django sobre MySQL, todo contenido en Docker.',
      },
    ],
    stack: ['Python', 'Django', 'MySQL', 'Docker', 'JavaScript'],
  },
  {
    id: 'historias-clinicas',
    name: {
      en: 'Clinical Records + Appointments API',
      es: 'Historias Clínicas + API de Turnos',
    },
    kind: 'professional',
    context: { en: 'DIXER — modernisation', es: 'DIXER — modernización' },
    period: { en: '2025', es: '2025' },
    accent: '#63D6A0',
    summary: {
      en: 'A clinical records system built in 2018 that had aged badly. We modernised the whole thing: faster, with a current interface, and with new features on top.',
      es: 'Un sistema de historias clínicas de 2018 que se había quedado viejo. Lo modernizamos entero: más rápido, con una interfaz actual y con funcionalidades nuevas.',
    },
    points: [
      {
        en: 'Migration off the legacy database and onto Laravel with PostgreSQL, containerised with Docker.',
        es: 'Migración de la base legada y puesta a punto sobre Laravel con PostgreSQL, contenido en Docker.',
      },
      {
        en: 'Patients, healthcare professionals, consultations, medical history and care locations.',
        es: 'Pacientes, profesionales, consultas, antecedentes y lugares de atención.',
      },
      {
        en: 'An appointments API I built myself, so each professional can keep track of the appointments they give their patients.',
        es: 'Una API de agenda de turnos que hice yo, para que cada profesional lleve el control de las citas que le da a sus pacientes.',
      },
    ],
    stack: ['PHP', 'Laravel', 'PostgreSQL', 'Docker', 'Blade', 'JavaScript'],
  },
  {
    id: 'castellano',
    name: { en: 'Castellano Power Team', es: 'Castellano Power Team' },
    kind: 'personal',
    context: { en: 'Personal project — mockup', es: 'Proyecto personal — maqueta' },
    period: { en: '2026', es: '2026' },
    accent: '#FF6B6B',
    summary: {
      en: "A landing page for a Turismo Carretera racing team from Lobería. It's a mockup made to pitch the idea — we still don't know whether it goes ahead.",
      es: 'Una landing para un equipo de Turismo Carretera de Lobería. Es una maqueta hecha para presentar la idea: todavía no sabemos si el proyecto sigue.',
    },
    points: [
      {
        en: 'Video hero and a circuit that you travel through as you scroll.',
        es: 'Hero en video y un circuito que se recorre con el scroll.',
      },
      {
        en: 'Built with React on Vite, deployed on Cloudflare. Here mostly for the animation work.',
        es: 'React sobre Vite, desplegado en Cloudflare. Está acá sobre todo por el trabajo de animación.',
      },
    ],
    stack: ['React', 'Vite', 'Cloudflare', 'Wrangler'],
    preview: {
      src: '/castellano-preview.webp',
      alt: {
        en: 'Hero of the Castellano Power Team landing page',
        es: 'Hero de la landing de Castellano Power Team',
      },
    },
  },
];
