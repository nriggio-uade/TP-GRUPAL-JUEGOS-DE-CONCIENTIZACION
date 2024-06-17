document.addEventListener('DOMContentLoaded', function() {
    const palabras = ["RECICLAJE", "BIODIVERSIDAD", "ENERGÍA", "SOSTENIBLE", "PLANETA"];
    const tamanoCuadricula = 15;
    let seleccionadas = [];
    const cuadricula = [];

    function generarCuadricula() {
        for (let i = 0; i < tamanoCuadricula; i++) {
            cuadricula[i] = [];
            for (let j = 0; j < tamanoCuadricula; j++) {
                const letra = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                cuadricula[i].push({ letra, seleccionado: false });
            }
        }
        colocarPalabras();
    }

    function colocarPalabras() {
        palabras.forEach(palabra => {
            let colocada = false;
            while (!colocada) {
                const fila = Math.floor(Math.random() * tamanoCuadricula);
                const columna = Math.floor(Math.random() * (tamanoCuadricula - palabra.length));
                if (puedeColocarPalabra(fila, columna, palabra)) {
                    for (let i = 0; i < palabra.length; i++) {
                        cuadricula[fila][columna + i].letra = palabra[i];
                    }
                    colocada = true;
                }
            }
        });
        renderizarCuadricula();
        renderizarListaPalabras();
    }

    function puedeColocarPalabra(fila, columna, palabra) {
        for (let i = 0; i < palabra.length; i++) {
            if (cuadricula[fila][columna + i].seleccionado) return false;
        }
        return true;
    }

    function renderizarCuadricula() {
        const contenedor = document.getElementById('contenedorSopaLetras');
        contenedor.innerHTML = '';
        cuadricula.forEach((fila, i) => {
            fila.forEach((celda, j) => {
                const div = document.createElement('div');
                div.textContent = celda.letra;
                div.className = 'letra';
                div.onclick = () => manejarClickLetra(i, j, div);
                contenedor.appendChild(div);
            });
        });
    }

    function renderizarListaPalabras() {
        const lista = document.getElementById('listaPalabras');
        lista.innerHTML = '';
        palabras.forEach(palabra => {
            const elemPalabra = document.createElement('div');
            elemPalabra.textContent = palabra;
            elemPalabra.dataset.palabra = palabra;
            lista.appendChild(elemPalabra);
        });
    }

    function manejarClickLetra(fila, col, div) {
        cuadricula[fila][col].seleccionado = !cuadricula[fila][col].seleccionado;
        div.style.backgroundColor = cuadricula[fila][col].seleccionado ? '#A2D9CE' : 'transparent';
        seleccionadas = seleccionadas.filter(sel => !(sel.fila === fila && sel.col === col));
        if (cuadricula[fila][col].seleccionado) {
            seleccionadas.push({ fila, col });
        }
        verificarPalabra();
    }

    function verificarPalabra() {
        const palabraFormada = seleccionadas.map(sel => cuadricula[sel.fila][sel.col].letra).join('');
        if (palabras.includes(palabraFormada) && palabraFormada.length === seleccionadas.length) {
            marcarPalabraEncontrada(palabraFormada);
            seleccionadas.forEach(sel => {
                document.getElementById('contenedorSopaLetras').children[sel.fila * tamanoCuadricula + sel.col].style.backgroundColor = 'lightgreen';
            });
            seleccionadas = [];
        }
    }

    function marcarPalabraEncontrada(palabraEncontrada) {
        const elemPalabra = Array.from(document.getElementById('listaPalabras').children)
            .find(elem => elem.dataset.palabra === palabraEncontrada && !elem.style.textDecoration);
        if (elemPalabra) {
            elemPalabra.style.textDecoration = 'line-through';
            elemPalabra.style.color = 'grey';
        }
    }

    generarCuadricula();
});
