//code du défillement

const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}



//gestion du menu

document.querySelector("nav>ul>.iconeMenu").addEventListener("click", function() {
    document.querySelector(".menuMobile").classList.toggle("afficheM");
    document.querySelector("nav>ul>.iconeMenu").classList.toggle("afficheM");
});



//Spy scroll

window.onload = () => {
    // On va chercher les sections du document
    let sections = document.querySelectorAll("section");

    // On initialise l'Intersection Observer
    let observer = new IntersectionObserver(observables => {
        for(let observable of observables){
            if(observable.intersectionRatio > 0.5){
                // Plus de la moitié de la section est visible à l'écran
                // On récupère tous les menus pour les désactiver
                let nomMenus = document.querySelectorAll("nav>ul>li>a");
                let nomMenusupr = document.querySelectorAll(".menuMobile>ul>li>a");

                // On boucle sur les menus pour les désactiver
                for(let nomMenu of nomMenus){
                    nomMenu.classList.remove("active","active-start");
                }

                for(let nomMenu of nomMenusupr){
                    nomMenu.classList.remove("active","active-start");
                }

                // On va chercher le menu correspondant à la section active
                let nomMenus2 = document.querySelectorAll(`[data-id=${observable.target.id}]`);

                for(let nomMenu2 of nomMenus2){
                    // On active le menu
                    nomMenu2.classList.add("active");
                    setTimeout(() => {
                        nomMenu2.classList.add('active-start');
                    }, 10);
                }
                
            }
        }
    }, {
        threshold: [0.5]
    });

    // On boucle sur les sections
    sections.forEach((section) => {
        // On ajoute la section à l'Intersection Observer
        observer.observe(section);
    });


}

    // animation des yeux                                    //////////////


    document.addEventListener("DOMContentLoaded", function () {
        const pupilles = document.querySelectorAll('.pupille');
    
        document.addEventListener('mousemove', function (e) {
            pupilles.forEach(pupille => {
                // Obtenir les coordonnées du centre de l'œil
                const eyeRect = pupille.parentElement.getBoundingClientRect();
                const eyeCenterX = eyeRect.left + eyeRect.width / 2;
                const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    
                // Obtenir les coordonnées de la souris
                const mouseX = e.clientX;
                const mouseY = e.clientY;
    
                // Calculer les distances
                const deltaX = mouseX - eyeCenterX;
                const deltaY = mouseY - eyeCenterY;
                const angle = Math.atan2(deltaY, deltaX);
    
                // Calculer la distance maximale que la pupille peut se déplacer
                const eyeRadius = Math.min(eyeRect.width, eyeRect.height) / 2;
                const pupilRadius = 30 / 2; // La moitié de la taille de la pupille
                const maxDistance = eyeRadius - pupilRadius;
    
                // Calculer la nouvelle position de la pupille
                const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), maxDistance);
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
    
                // Appliquer la transformation
                pupille.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
            });
        });
    });



    //      curseur personalisé            /////////

    const cursor = document.querySelector('.cursor');
    cursor.style.display = 'none';
    const cursorSizeY = 35; 
    const cursorSizeX = 25; 
    
    document.addEventListener('mousemove', e => {
        let x = e.pageX;
        let y = e.pageY;
    
        // Limite la position à la largeur totale de la fenêtre moins la taille du curseur
        if (x + cursorSizeX > document.documentElement.clientWidth) {
            x = document.documentElement.clientWidth - cursorSizeX;
        }
    
        // Limite la position à la hauteur totale du document moins la taille du curseur
        if (y + cursorSizeY > document.documentElement.scrollHeight) {
            y = document.documentElement.scrollHeight - cursorSizeY;
        }
    
        cursor.setAttribute('style', 'top:' + y + 'px; left:' + x + 'px;');
    });

    // Masquer le curseur personnalisé lorsque la souris quitte l'écran du site
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    // Réafficher le curseur personnalisé lorsque la souris entre dans l'écran du site
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });



    // Appliquer et retirer la classe grow lors du survol des liens et des boutons
    document.querySelectorAll('a, button, .iconeMenu, .boutonVoir, .close-button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('grow');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('grow');
        });
    });



    //          loader

    const loader = document.querySelector('.loader');

    window.addEventListener('load', () => {

        loader.classList.add('fondu-out');
        setTimeout(() => {
            loader.classList.add('loader-out');
        }, 400);

    })




    //          rotation pour le contact



    const h2Element = document.querySelector('#contact h2');

    function applyTransforms() {
        const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

        // Link 1
        document.querySelectorAll('#contact div a:nth-child(1)').forEach(link => {
            link.addEventListener('mouseover', () => {
                if (isSmallScreen) {
                    h2Element.style.transform = 'translate(-15px, 150px) rotate(40deg)';
                } else {
                    h2Element.style.transform = 'translate(-30px, 200px) rotate(60deg)';
                }
            });

            link.addEventListener('mouseout', () => {
                if (isSmallScreen) {
                    h2Element.style.transform = 'translate(0px, 150px) rotate(0deg)';
                } else {
                    h2Element.style.transform = 'translate(0px, 200px) rotate(0deg)';
                }
            });
        });

        // Mail Link (Middle)
        document.querySelectorAll('#contact .mail').forEach(link => {
            link.addEventListener('mouseover', () => {
                if (isSmallScreen) {
                    h2Element.style.transform = 'translate(0px, 165px) rotate(0deg)';
                } else {
                    h2Element.style.transform = 'translate(0px, 230px) rotate(0deg)';
                }
            });

            link.addEventListener('mouseout', () => {
                if (isSmallScreen) {
                    h2Element.style.transform = 'translate(0px, 150px) rotate(0deg)';
                } else {
                    h2Element.style.transform = 'translate(0px, 200px) rotate(0deg)';
                }
            });
        });

        // Link 3
        document.querySelectorAll('#contact a:nth-child(3)').forEach(link => {
            link.addEventListener('mouseover', () => {
                if (isSmallScreen) {
                    h2Element.style.transform = 'translate(15px, 150px) rotate(-40deg)';
                } else {
                    h2Element.style.transform = 'translate(30px, 200px) rotate(-60deg)';
                }
            });

            link.addEventListener('mouseout', () => {
                if (isSmallScreen) {
                    h2Element.style.transform = 'translate(0px, 150px) rotate(0deg)';
                } else {
                    h2Element.style.transform = 'translate(0px, 200px) rotate(0deg)';
                }
            });
        });
    }

    // Appliquer les transformations lors du chargement de la page
    applyTransforms();

    // Réappliquer les transformations lors du redimensionnement de la fenêtre
    window.addEventListener('resize', applyTransforms);




    // orientation des tablettes

    const tablets = document.querySelectorAll('.orientationTab');

    function updateRotation(e) {
        tablets.forEach(tablet => {
            const rect = tablet.getBoundingClientRect();
            const xAxis = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
            const yAxis = (e.clientY - (rect.top + rect.height / 2)) / rect.height;

            // Limites de rotation (par exemple, ±20 degrés)
            const maxRotation = 20;
            const rotateX = Math.max(Math.min(yAxis * maxRotation, maxRotation), -maxRotation);
            const rotateY = Math.max(Math.min(-xAxis * maxRotation, maxRotation), -maxRotation);

            tablet.style.transform = `rotateX(${-rotateX}deg) rotateY(${-rotateY}deg)`;

            // Calcul des décalages pour l'ombre en fonction de la rotation
            const shadowX = rotateY * 2; // Ombre décalée en X en fonction de rotateY
            const shadowY = -rotateX * 2;  // Ombre décalée en Y en fonction de rotateX
            const shadowBlur = 20 + Math.abs(rotateX) + Math.abs(rotateY); // Augmente le flou en fonction de l'inclinaison

            tablet.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3), 
                                    ${shadowX / 2}px ${shadowY / 2}px ${shadowBlur / 1.5}px rgba(0, 0, 0, 0.15)`;
            });
    }

    // Optimiser avec requestAnimationFrame pour limiter les calculs
let isRequesting = false;

document.addEventListener('mousemove', function(e) {
    if (!isRequesting) {
        isRequesting = true;
        requestAnimationFrame(() => {
            updateRotation(e);
            isRequesting = false;
        });
    }
});




    




// carrousel

const carouselItems = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.carousel-dots');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

let positions = [
    { top: '10%', left: '0%' },   
    { top: '19%', left: '33.3333%' }, 
    { top: '27%', left: '66.6666%' }, 
];


const updatePositions = () => {
    carouselItems.forEach((item, index) => {
        // Calcul du positionnement en boucle
        let posIndex = (index - currentIndex + carouselItems.length) % carouselItems.length;
        
        item.classList.remove('front', 'center', 'back');

        if (posIndex >= 0 && posIndex < 3) {
            // Réassigner les positions selon le tableau positions
            item.style.top = positions[posIndex].top;
            item.style.left = positions[posIndex].left;
            item.classList.add('visible');

            // Définir le z-index en fonction de la position
            if (posIndex === 0) {
                item.classList.add('back');
            } else if (posIndex === 1) {
                item.classList.add('center');
            } else if (posIndex === 2) {
                item.classList.add('front');
            }
        } else {
            item.classList.remove('visible');
        }
    });
};

const updateDots = () => {
    dotsContainer.innerHTML = '';

    carouselItems.forEach((item, index) => {
        const dot = document.createElement('span');
        if (index === currentIndex) {
            dot.classList.add('active');
        } else if (index === (currentIndex - 1 + carouselItems.length) % carouselItems.length || 
                   index === (currentIndex + 1) % carouselItems.length) {
            dot.classList.add('middle');
        }
        dotsContainer.appendChild(dot);
    });
};

const updateCarousel = () => {
    updatePositions();
    updateDots();
};

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
});

// Initialisation
updateDots();
updateCarousel();

// Fonction pour ajuster les positions en fonction de la taille de l'écran
const adjustPositionsForScreenSize = () => {
    if (window.innerWidth <= 630) { 
        positions = [
            { top: '10%', left: '-30%' },   
            { top: '19%', left: '33.3333%' }, 
            { top: '27%', left: '96%' },  
        ];
    } else {
        positions = [
            { top: '10%', left: '0%' },   
            { top: '19%', left: '33.3333%' }, 
            { top: '27%', left: '66.6666%' }, 
        ];
    }

    updateCarousel();
};

adjustPositionsForScreenSize();
window.addEventListener('resize', adjustPositionsForScreenSize);






//        canva des logos de compétences

// Fonction pour initialiser un canvas avec des logos
function initializeCanvas(canvasId, logos, infoBulleId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        if (window.innerWidth <= 768) {
            canvas.width = window.innerWidth / 1.2;
        } else {
            canvas.width = window.innerWidth / 2.2;
        }
        canvas.height = window.innerHeight / 1.5;

        logos.forEach(logo => {
            if (logo.x + logo.width > canvas.width) {
                logo.x = canvas.width - logo.width;
            }
            if (logo.y + logo.height > canvas.height) {
                logo.y = canvas.height - logo.height;
            }
        });
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    logos.forEach(logo => {
        const image = new Image();
        image.src = logo.img;
        logo.image = image;
        logo.width = logo.width || 50;  // Définit la largeur par défaut à 50 si non spécifié
        logo.height = logo.height || 50;
    });

    let currentHoveredLogo = null;

    function drawLogos() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        logos.forEach(logo => {
            ctx.drawImage(logo.image, logo.x, logo.y, logo.width, logo.height);
            logo.x += logo.dx;
            logo.y += logo.dy;

            // Collision
            if (logo.x + logo.width > canvas.width || logo.x < 0) {
                logo.dx *= -1;
            }
            if (logo.y + logo.height > canvas.height || logo.y < 0) {
                logo.dy *= -1;
            }
        });

        requestAnimationFrame(drawLogos);
    }

    function handleMouseMove(event) {
        const infoB = document.getElementById(infoBulleId);
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;
        let newHoveredLogo = null;

        logos.forEach(logo => {
            if (
                mouseX > logo.x && mouseX < logo.x + logo.width &&
                mouseY > logo.y && mouseY < logo.y + logo.height
            ) {
                newHoveredLogo = logo;
            }
        });

        if (newHoveredLogo !== currentHoveredLogo) {
            currentHoveredLogo = newHoveredLogo;
            if (currentHoveredLogo) {
                infoB.style.display = 'block';
                infoB.innerHTML = `<strong>${currentHoveredLogo.name}</strong><br>${currentHoveredLogo.description}`;
            }
        }
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    drawLogos();
}

// Initialisation des canvases
initializeCanvas('logoCanvas', [
    { img: '../images/HTML5_logo_and_wordmark.svg.png', x: 50, y: 60, dx: 1.05, dy: 1.05, width: 80, height: 80, name: 'HTML', description: '' },
    { img: '../images/LogoCss.png', x: 20, y: 20, dx: 1.05, dy: -1.05, width: 50, height: 80, name: 'CSS', description: '' },
    { img: '../images/JavaScript-Logo.png', x: 70, y: 160, dx: 1.05, dy: 1.05, width: 140, height: 80, name: 'JavaScript', description: '' },
    { img: '../images/LogoPhp.png', x: 90, y: 10, dx: 1.05, dy: -1.05, width: 80, height: 50, name: 'PHP', description: '' }
], 'infoBulle');

initializeCanvas('logoCanvasBis', [
    { img: '../images/adobe-after-effects-logo-0.png', x: 100, y: 150, dx: 1.2, dy: -1.2, width: 80, height: 80, name: 'AfterEffect', description: '' },
    { img: '../images/adobe-photoshop-logo-0.png', x: 300, y: 200, dx: -1.2, dy: 1.2, width: 80, height: 80, name: 'Photoshop', description: '' },
    { img: '../images/Illustrator-Logo.png', x: 130, y: 220, dx: -1.2, dy: 1.2, width: 100, height: 60, name: 'Illustrator', description: '' }
], 'infoBulleBis');




// pages des projets


document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.boutonVoir');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    // Données pour les modals
    const modalData = {
        modal1: {
            title: "Site SPA",
            tabletSrc: {src: "/images/MiniaPortFolioMMI.png", class: "coucher"},
            contexte: "Lors de ma seconde année en BUT Métier du Multimédia et de l’Internet, j’ai été amené à créer un site de SPA, avec un autre étudiant. <br>Le but du site est de permettre aux différentes SPA de France de présenter son refuge, et les animaux proposés à l'adoption. L'utilisateur pourra alors contacter le refuge pour rencontrer l'animal. Il était demandé pour ce projet était une bonne expérience utilisateur, et la création de fonctionnalités faites \"à la main\", en essayant de présenter une fonctionnalité novatrice, pour se démarquer. Nous avons à réaliser le logo pour la SPA, conçu la maquette du site, la base de données et coder le site.",
            realisation: "J'ai conçu le logo, participé à la création de la maquette sur Figma, et développé le back-end du site. Le logo, réalisé avec Illustrator, combine une police lisible à une icône de cœur avec une patte, reflétant l'identité de la SPA. Nous avons choisi une palette de couleurs incluant le jaune, une couleur chaleureuse adaptée pour un site de SPA, et le rouge pour les appels à l'action, symbolisant l'amour et l'adoption. <br/><br>La base de données, hébergée sur PhpMyAdmin, gère les informations sur les animaux, les refuges et les utilisateurs. Le site est développé en MVC avec HTML, PHP, CSS, JavaScript et SQL. Lorsqu'un utilisateur n'est pas connecté, il peut accéder aux animaux, aux refuges, aux articles, et à la page \"Comment aider ?\", mais sans possibilité de liker. Sur la page \"Adopter\", un filtre permet de trier les animaux par sexe, taille, espèce, etc. Les races sont affichées dynamiquement en fonction de l'espèce sélectionnée. La page \"Nos refuges\" propose une carte interactive et une barre de recherche pour trouver facilement un refuge. <br><br>Une fois connecté, l'utilisateur peut liker des animaux, avec les informations enregistrées en AJAX pour une expérience fluide. La page \"Favoris\" regroupe les animaux likés. J'ai également imaginé et conçu une fonctionnalité innovante appelée \"Tu préfères\", qui permet de comparer et de sélectionner des animaux, le préféré étant marqué d'un coup de cœur. <br><br>L'administrateur peut, de son côté, gérer les refuges, ajouter ou supprimer des animaux, et télécharger des photos pour leur profil.",
            carousel: [
                {type: "image", src: "/images/projets/siteSPA.png", alt: "site spa"},
                {type: "iframe", src: "https://www.youtube.com/embed/_etCFp5-Y80", alt: "presentation site SPA"},
                {type: "iframe", src: "https://www.youtube.com/embed/gfc7KRO3-K4", alt: "siteAdmin"},
                {type: "image", src: "/images/projets/FigmaSPA.png", alt: "figma site spa"}
            ]
        },
        modal2: {
            title: "Site Mairie",
            tabletSrc: {src: "/images/MiniaMairie.png", class: ""},
            contexte: "Lors de ma seconde année en BUT Métier du Multimédia et de l’Internet, j’ai été amener à créer un site de Mairie...",
            realisation: "Personnellement, j’ai réalisé le logo, j’ai participé à la création de la maquette sur figma...",
            carousel: [
                {type: "image", src: "/images/MiniaJeux.png", alt: "Image 1"},
                {type: "iframe", src: "https://www.youtube.com/embed/_etCFp5-Y80", alt: "presentation site SPA"},
                {type: "image", src: "/images/macRose1.png", alt: "Image 2"}
            ]
        },
        modal3: {
            title: "Site astronaute",
            tabletSrc: {src: "/images/MiniaAstronaute.png", class: ""},
            contexte: "Lors de ma seconde année en BUT Métier du Multimédia et de l’Internet, j’ai été amener à créer un site de SPA...",
            realisation: "Personnellement, j’ai réalisé le logo, j’ai participé à la création de la maquette sur figma...",
            carousel: [
                {type: "image", src: "/images/projets/siteSPA.png", alt: "site spa"},
                {type: "iframe", src: "https://www.youtube.com/embed/_etCFp5-Y80", alt: "presentation site SPA"},
            ]
        },
        modal4: {
            title: "Petit jeu",
            tabletSrc: {src: "/images/MiniaJeux.png", class: ""},
            contexte: "Lors de ma seconde année en BUT Métier du Multimédia et de l’Internet, j’ai été amener à créer un site de SPA...",
            realisation: "Personnellement, j’ai réalisé le logo, j’ai participé à la création de la maquette sur figma...",
            carousel: [
                {type: "image", src: "/images/projets/siteSPA.png", alt: "site spa"},
                {type: "iframe", src: "https://www.youtube.com/embed/_etCFp5-Y80", alt: "presentation site SPA"}
            ]
        },
        modal5: {
            title: "Motion design",
            tabletSrc: {src: "/images/MiniaTurnip.png", class: ""},
            contexte: "Dans le cadre de ma première année en BUT Métiers du Multimédia et de l’Internet, j’ai travaillé en groupe sur un projet visant à promouvoir un service de mobilité écologique. Avec trois autres étudiants, nous avons imaginé \"Turnip9\", des navettes électriques alimentées par l’énergie hydraulique. Le slogan de notre produit, “Ne tournez pas autour du pot”, reflète l'idée que la navette ne s’arrête qu’aux arrêts nécessaires pour optimiser les trajets.<br><br>J’ai contribué à la création du logo en proposant le concept du visage avec la flèche et la forme des personnages. Ensuite, j’ai réalisé le logo dans Illustrator et préparé les éléments pour l'animation en les organisant en calques distincts.",
            realisation: "Pour l’animation du logo, j’ai utilisé le logiciel After Effect.<br>Dans mon animation, j’ai voulu transmettre et renforcer les messages que renvoie le logo. Pour faire référence à l’idée d'aller du point A au point B, j’ai fait apparaître les flèches vers les points représentant les yeux. Pour faire référence au “Turn” présent dans le nom de l’entreprise, j’ai fait arriver les personnages avec une rotation.<br><br>De plus, pour donner un côté plus vivant aux personnages, j’ai ajouté un petit délai entre l'arrivée des deux yeux, et j’ai ajouté du mouvement aux feuilles du personnage. Pour l’animation de sortie, j'ai retourné le logo pour voir le visage de l’autre personnage à l’endroit.<br>Pour finir, j'ai réalisé le son design, avec des bruits de feuilles et des bruitages pour les mouvements.",
            carousel: [
                {type: "image", src: "/images/projets/frameInGameFichier 1.svg", alt: "logoTurnip"},
                {type: "iframe", src: "https://www.youtube.com/embed/vg-Py1p5yrg", alt: "Logo Turnip9 animation"}
            ]
        },
        modal6: {
            title: "Portfolio MMI",
            tabletSrc: {src: "/images/MiniaPortFolioMMI.png", class: "coucher"},
            contexte: "Dans le cadre de ma première année en BUT Métier du Multimédia et de l’Internet, j’ai réalisé un site portfolio de compétences.Le but du site est d’avoir des traces des différents projets réalisés lors du BUT.<br>Pour chaque projet, il y a une description avec d'autres informations présentant le projet, et une explication de comment j'ai réalisé le projet.",
            realisation: "Pour créer mon site, j'ai d'abord planifié les pages nécessaires, définies le style, et identifié les données essentielles. J'ai ensuite réalisé une maquette sur Figma avant de coder le site avec Visual Studio Code, en utilisant le code HTML, CSS, JavaScript, et PHP. J'ai conçu le filtre de projet en CSS et intégré des animations avec CSS et JavaScript pour améliorer l'expérience utilisateur.<br><br>Le site repose sur une base de données, que j'ai d'abord modélisée en créant un MCD et un MLD, puis développée via PHPMyAdmin. J'ai intégré les données dans les pages HTML en utilisant la méthode MVC (Modèle Vue Contrôleur), en gérant la connexion à la base de données et les requêtes SQL dans la partie \"Modèle\".",
            carousel: [
                {type: "image", src: "/images/projets/site.png", alt: "site portfolio mmi"},
                {type: "image", src: "/images/projets/Capturefiltre.PNG", alt: "site portfolio mmi"},
                {type: "image", src: "/images/projets/CaptureSAE.PNG", alt: "site portfolio mmi"}
            ]
        },
        modal7: {
            title: "Poster",
            tabletSrc: {src: "/images/miniaPoster.png", class: ""},
            contexte: "Ce projet consistait en une analyse en anglais du film \"The Green Knight\", accompagnée de la création d'un poster qui capture l'essence et l'atmosphère du film.",
            realisation: "J'ai d'abord visionné le film en prenant des notes, puis j'ai analysé différents aspects comme les décors, les costumes et les couleurs. Après avoir rédigé l'analyse, j'ai esquissé des croquis pour l'affiche. <br><br>Ensuite, j'ai réalisé l'affiche sur Photoshop, en utilisant l'IA du logiciel pour créer les contours feuillus des images. Pour rester fidèle au thème, j'ai choisi une police médiévale anglaise, identique à celle utilisée dans le film.",
            carousel: [
                {type: "image", src: "/images/projets/PosterTheGreenKnight.png", alt: "poter the green knight"}
            ]
        }
    };

    // Fonction pour ouvrir le modal
    function openModal(modalId) {
        const modal = document.getElementById('modal-template');
        if (modal) {
            const data = modalData[modalId];
            if (data) {
                // Remplir le modal avec le contenu
                modal.querySelector('.modal-title').textContent = data.title;
                modal.querySelector('.modal-contexte').innerHTML = data.contexte;
                modal.querySelector('.modal-realisation').innerHTML = data.realisation;
                modal.querySelector('.modal-tablet').src= data.tabletSrc.src;
                if (data.tabletSrc.class === 'coucher') {
                    modal.querySelector('.modal-tablet').classList.add("coucher");
                }
                else{
                    modal.querySelector('.modal-tablet').classList.remove("coucher");
                }  

                // Remplir le carousel
                const carousel = modal.querySelector('.custom-carousel');
                carousel.innerHTML = ''; // Vider le contenu existant du carousel
                data.carousel.forEach(item => {
                    let slide;
                    if (item.type === 'image') {
                        slide = `<div class="custom-slide"><img loading="lazy" src="${item.src}" alt="${item.alt}"></div>`;
                    } else if (item.type === 'iframe') {
                        slide = `<div class="custom-slide"><iframe width="100%" height="100%" src="${item.src}" title="${item.alt}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
                    }
                    carousel.innerHTML += slide;
                });

                modal.style.display = 'block'; // Afficher le modal
                document.body.style.overflow = 'hidden'; // Désactiver le défilement
            }
        }
    }

    // Fonction pour fermer le modal
    function closeModal() {
        const modal = document.getElementById('modal-template');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Réactiver le défilement
        }
    }

    // Attacher les événements de clic aux boutons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Attacher l'événement de clic au bouton de fermeture
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Fermer le modal en cliquant en dehors du contenu
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal();
            }
        });
    });
});



            




// carrousel


let customCurrentIndex = 0;

function showCustomSlide(index) {
    const slides = document.querySelectorAll('.custom-slide');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        customCurrentIndex = 0;
    } else if (index < 0) {
        customCurrentIndex = totalSlides - 1;
    } else {
        customCurrentIndex = index;
    }

    const newTransformValue = -customCurrentIndex * 100;
    document.querySelector('.custom-carousel').style.transform = `translateX(${newTransformValue}%)`;
}

function customNextSlide() {
    showCustomSlide(customCurrentIndex + 1);
}

function customPrevSlide() {
    showCustomSlide(customCurrentIndex - 1);
}




