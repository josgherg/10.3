const main = document.getElementById('main');
const buscarTodos= document.getElementById('boton-todos');
const principal= document.getElementById('contenedorPrincipal');
let seleccion = document.getElementById("boton-todos");
const busqueda = document.getElementById('boton-buscar');
let campo = document.getElementById('campoBusqueda');

const clasePok = fetch("https://pokeapi.co/api/v2/type");
clasePok
    .then((respuesta)=>{
        return respuesta.json();
    })
    .then((datos)=>{
        datos.results.map((dato)=>{
            let opt=document.createElement('option');
            let parrafo= document.createElement('p');
            parrafo.textContent = dato.name;
            opt.value=dato.name;
            opt.appendChild(parrafo);
            buscarTodos.appendChild(opt); 
        });
    })
    .catch((error)=>{
        console.log(error);
    });

const Pok = fetch("https://pokeapi.co/api/v2/pokemon-form/");
    Pok
    .then((respuesta)=>{
        return respuesta.json();
    })
    .then((datos)=>{
        principal.classList.add('contenedorPrincipal');
        datos.results.map((dato)=>{ 
            let link = dato.url;
            const otrosDatosPok = fetch(link);
            otrosDatosPok
                .then((respuesta)=>{
                    return respuesta.json();
                })
                .then((datos)=>{
                    let parrafo= document.createElement('p');
                    let carta=document.createElement('div');
                    let img = document.createElement('img');
                    img.src = datos.sprites.front_shiny;
                    carta.appendChild(img);
                    parrafo.textContent = datos.pokemon.name;  
                    carta.appendChild(parrafo);
                    carta.classList.add('divcard');
                    parrafo.classList.add('textcard');
                    img.classList.add('imgcard');
                    principal.appendChild(carta);
                    main.appendChild(principal);
                })
                .catch((error)=>{
                    console.log(error);
                });  
        });
    })
    .catch((error)=>{
        console.log(error);
    });
    
seleccion.addEventListener("change", ()=>{
    let valorSeleccion = seleccion.value;
    while (principal.firstChild) {
        principal.removeChild(principal.firstChild);
    }
    if (valorSeleccion=='Todos'){
        const Pokemon = fetch("https://pokeapi.co/api/v2/pokemon-form/");
        if (principal.classList.contains('sinhallazgos')){
            principal.classList.remove('sinhallazgos');
            principal.classList.add('contenedorPrincipal')
        }
        Pokemon
            .then((respuesta)=>{
                return respuesta.json();
            })
            .then((datos)=>{
                datos.results.map((dato)=>{ 
                    let link = dato.url;
                    const otrosDatosPok = fetch(link);
                    otrosDatosPok
                        .then((respuesta)=>{
                            return respuesta.json();
                        })
                        .then((datos)=>{
                            let parrafo= document.createElement('p');
                            let carta=document.createElement('div');
                            let img = document.createElement('img');
                            img.src = datos.sprites.front_shiny;
                            carta.appendChild(img);
                            parrafo.textContent = datos.pokemon.name;  
                            carta.appendChild(parrafo);
                            carta.classList.add('divcard');
                            parrafo.classList.add('textcard');
                            img.classList.add('imgcard');
                            principal.appendChild(carta); 
                            main.appendChild(principal);  
                        })
                        .catch((error)=>{
                            console.log(error);
                        });  
                });
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    else{
        const Pokemon = fetch("https://pokeapi.co/api/v2/pokemon-form/");
        if (principal.classList.contains('sinhallazgos')){
            principal.classList.remove('sinhallazgos');
            principal.classList.add('contenedorPrincipal')
        }
        Pokemon
            .then((respuesta)=>{
                return respuesta.json();
            })
            .then((datos)=>{                
                datos.results.map((dato)=>{ 
                    let link = dato.url;
                    const otrosDatosPok = fetch(link);
                    otrosDatosPok  
                        .then((respuesta)=>{
                            return respuesta.json();
                        })
                        .then((datos)=>{
                            datos.types.map((dato)=>{
                                if (dato.type.name==valorSeleccion){
                                    let parrafo= document.createElement('p');
                                    let carta=document.createElement('div');
                                    let img = document.createElement('img');
                                    img.src = datos.sprites.front_shiny;
                                    carta.appendChild(img);
                                    parrafo.textContent = datos.pokemon.name;  
                                    carta.appendChild(parrafo);
                                    carta.classList.add('divcard');
                                    parrafo.classList.add('textcard');
                                    img.classList.add('imgcard');
                                    principal.appendChild(carta);
                                    main.appendChild(principal);
                                } 
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                        })
                })      
            })
            .catch((error)=>{
                console.log(error);
            });
            setTimeout(()=>{
                if(!principal.firstChild){
                    let parrafo=document.createElement('p');
                    parrafo.textContent='No hay coincidencias en su busqueda';
                    principal.appendChild(parrafo);
                    main.appendChild(principal); 
                    if (principal.classList.contains('contenedorPrincipal')){
                        principal.classList.remove('contenedorPrincipal');
                        principal.classList.add('sinhallazgos')
                    }           
                }
            },500);
        }   
    }
);

busqueda.addEventListener('click',(e)=>{
    e.preventDefault();
    let valorSeleccion = campo.value;
    while (principal.firstChild) {
        principal.removeChild(principal.firstChild);
    }
    console.log(valorSeleccion);
    const busquedaPokemon = fetch("https://pokeapi.co/api/v2/pokemon-form/");
        if (principal.classList.contains('sinhallazgos')){
            principal.classList.remove('sinhallazgos');
            principal.classList.add('contenedorPrincipal');
        }
        busquedaPokemon
            .then((respuesta)=>{
                return respuesta.json();
            })
            .then((datos)=>{                
                datos.results.map((dato)=>{ 
                    let link;
                    console.log(`${dato.name}**${valorSeleccion}`);
                    if (dato.name==valorSeleccion){
                        link = dato.url;
                        console.log(link);
                    }
                    const datosPok = fetch(link);
                    datosPok  
                        .then((respuesta)=>{
                            return respuesta.json();
                        })
                        .then((datos)=>{
                            let parrafo= document.createElement('p');
                            let carta=document.createElement('div');
                            let img = document.createElement('img');
                            img.src = datos.sprites.front_shiny;
                            carta.appendChild(img);
                            parrafo.textContent = datos.pokemon.name;  
                            carta.appendChild(parrafo);
                            carta.classList.add('divcard');
                            parrafo.classList.add('textcard');
                            img.classList.add('imgcard');
                            principal.appendChild(carta);
                            main.appendChild(principal);  
                        })
                        .catch((error)=>{
                            console.log(error);
                        })
                })      
            })
            .catch((error)=>{
                console.log(error);
            });
            setTimeout(()=>{
                if(!principal.firstChild){
                    let parrafo=document.createElement('p');
                    parrafo.textContent='No hay coincidencias en su busqueda';
                    principal.appendChild(parrafo);
                    main.appendChild(principal); 
                    if (principal.classList.contains('contenedorPrincipal')){
                        principal.classList.remove('contenedorPrincipal');
                        principal.classList.add('sinhallazgos')
                    }           
                }
            },500);
});

    