let iconos=[];
let selecciones=[];
let CantidadTarjetas = 16;
let contador=60;



generarTablero()
startTimer()



function cargarIconos(){
        iconos = [
                `<i class='bx bxs-dice-6'></i>`,
               `<i class='bx bxs-game' ></i>`,
               '<i class="bx bxs-star" ></i>',
               `<i class='bx bxs-castle' ></i>`,
               `<i class='bx bxs-cheese' ></i>`,
               `<i class='bx bxs-cat' ></i>`,
               `<i class='bx bxs-ghost' ></i>`,
               `<i class='bx bx-cool' ></i>`,

        ]

}




function generarTablero(){

        cargarIconos()
        selecciones=[]
        let tablero = document.getElementById("desk-game");
        let tarjetas=[];
        for (let i = 0; i < CantidadTarjetas; i++) {
              tarjetas.push(`
              
                <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">

                        <div class="tarjeta" id="tarjeta${i}">

                                
                                <div class="cara frente" id="frente${i}">
                                 ${iconos[0]}
                                </div>

                                <div class="cara trasera" >

                                </div>
                                
                                
                        </div>

                 </div>
                `)
                

                if(i%2==1){
                        iconos.splice(0,1);
                }
                
        }
        tarjetas.sort(()=> Math.random()-0.5)
        tablero.innerHTML = tarjetas.join(" ")
}



function seleccionarTarjeta(i){

        let tarjeta = document.getElementById("tarjeta"+i);
        if (tarjeta.style.transform != "rotateY(180deg)") {
                tarjeta.style.transform = "rotateY(180deg)"
                selecciones.push(i)
        }
        if (selecciones.length == 2) {
                deseleccionar(selecciones)
                selecciones=[]
                
        }

        contador --;
        let conta = document.getElementById("count");
        conta.innerText = "Movimientos Restantes: " +contador;
        if (contador==0) {
                Swal.fire({
                        icon: 'error',
                        title: 'Alcanzaste el limite de movimientos',
                        text: 'Por favor volve a comenzar',
                        
                        })

                        setTimeout(() => {
                                generarTablero()
                                stopTimer()
                                resetContadorClick()
                                startTimer()  
                        }, 2500);
                        

        }

      

}




function resetContadorClick(){
        let conta = document.getElementById("count");
        contador =60;
        conta.innerText = "Movimientos Restantes: " +contador;
}



function deseleccionar(selecciones){
        setTimeout(() => {
                        let frente1 = document.getElementById("frente"+selecciones[0])
                        let frente2 = document.getElementById("frente"+selecciones[1])

                if (frente1.innerHTML != frente2.innerHTML) {

                        let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
                        let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
                        tarjeta1.style.transform ="rotateY(0deg)"
                        tarjeta2.style.transform ="rotateY(0deg)"
                }else{

                        frente1.style.background ="blueviolet"
                        frente2.style.background ="blueviolet"   
                }

                if (verificarWin()) {
                        Swal.fire({
                      icon: 'success',
                      title: 'Juego completado!!',
                      text: 'Felicitaciones <3',
                      
                       })
                       frenarReloj();
                }

        }, 1000);
}


function verificarWin() {
        for (let i = 0; i < CantidadTarjetas; i++) {

                let frente = document.getElementById("frente" + i)        
               if (frente.style.background != "blueviolet" ) {
                        return false;
                }
        }
        return true;

}



var seconds = 0;
      var minutes = 0;
      var hours = 0;
      var timer;

      function startTimer() {
        setTimeout(() => {
                timer = setInterval(updateTimer, 1000);  
        }, 2500);
        
      }

      function frenarReloj(){
        clearInterval(timer);

      }

      function stopTimer() {
        clearInterval(timer);
        seconds = 0;
        minutes = 0;
        hours = 0;
        document.getElementById("timer").innerHTML = "Tiempo de juego: 00:00:00";
      }

      function updateTimer() {
        seconds++;
        if (seconds == 60) {
          seconds = 0;
          minutes++;
          if (minutes == 60) {
            minutes = 0;
            hours++;
          }
        }
        var timeString =
          (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
          ":" +
          (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds);
        document.getElementById("timer").innerHTML = "Tiempo de juego: " + timeString;}






        



      