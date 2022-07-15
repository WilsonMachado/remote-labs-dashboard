import React, { useState, useEffect} from 'react';
import io from 'socket.io-client';
import Plot from 'react-plotly.js';
import {CSVLink} from 'react-csv';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

const socket = io.connect('http://eieela.univalle.edu.co:5023');


function App() {  

  const [data, setData] = useState(0.0);
  
  const [plantaOut, setPlantaOut] = useState([]);
  const [plantaIn, setPlantaIn] = useState([]);
  const [muK, setMuK] = useState([]);
  const [reference, setReference] = useState('');
  
  const [relay_1, setRelay_1] = useState(0);
  const [relay_2, setRelay_2] = useState(0);
  const [relay_3, setRelay_3] = useState(0);

  const [start, setStart] = useState(false);

  const [cerrarLazo, setcerrarLazo] = useState(false);  



  const [kc, setKc] = useState(0.0);
  const [tau_i, setTau_i] = useState(0.0);
  const [tau_d, setTau_d] = useState(0.0);

  // 1. listen for data from the server (Raspberry Pi)
  useEffect(() => {
    socket.on('/v1.0/iot-control/get_status_controller', (res) => {

      setPlantaOut(currentData => [...currentData, res.adc_value]);
      setPlantaIn(currentData => [...currentData, res.referencia]);
      setMuK(currentData => [...currentData, res.mu_k]);
      

      setData(res.adc_value);
      setStart(res.transmition_status);      
    });

    socket.emit('/v1.0/iot-control/get_closed_loop', {
      message: 'Cerrando lazo'}); 

    socket.emit('/v1.0/iot-control/get_status_relay', {
      message: 'Obteniendo estado de los relevadores'}); 
    
  }, []);

    /////////////////////////////// TRANSMISION DE DATOS ///////////////////////////////

  const startTransmission = () => {
    socket.emit('/v1.0/iot-control/get_status_controller', {
      message: 'Iniciando transmisición'});      
  }


  const stopTransmission = () => {
    socket.emit('/v1.0/iot-control/stop_get_status_controller', {
      message: 'Deteniendo transmisición'
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////  

  /////////////////////////////// CERRAR LAZO ///////////////////////////////   

  socket.on('/v1.0/iot-control/get_closed_loop', (res) => {
    setcerrarLazo(res.closed_loop);
  });

  socket.on('/v1.0/iot-control/get_status_relay', (res) => {
    setRelay_1(res.status_relay_1);
    setRelay_2(res.status_relay_2);
    setRelay_3(res.status_relay_3);
  });



  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Prototipo para experimentación en sistemas automáticos de control SISO          
        </a>
        <CSVLink data={[
          ["Entrada", "Salida"],
          ...plantaIn.map((item, index) => [plantaIn[index], plantaOut[index]]) 
  
]} filename={"datos_experimento.csv"}><button type="button" class="btn btn-dark">Descargar datos </button></CSVLink>
        <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
      Ayuda
      </button>
      </div>
      
      <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Acerca del prototipo</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Acá va la información sobre el prototipo
              <br />
              <br />
              <div className="container text-center"><img src="https://controlautomaticoeducacion.com/wp-content/uploads/PIDISA.png" alt="" />
              </div>
              <br />              
             <div className="container text-justify">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque velit ut nisl gravida molestie. Nam at mattis enim, eu faucibus erat. Nam tempor pharetra aliquam. Aenean vehicula mi a libero pellentesque ullamcorper. Proin in lacinia massa. Suspendisse auctor lacus nec interdum feugiat. Aenean suscipit pretium ex eu semper. Aliquam aliquet gravida odio, cursus interdum enim iaculis nec. Duis finibus velit orci, vel rhoncus ex posuere posuere. Suspendisse a malesuada odio. Vestibulum mattis euismod felis dapibus scelerisque. Curabitur efficitur, ex sit amet fermentum finibus, turpis orci blandit odio, at dapibus lorem orci nec dolor.

            Duis porttitor nulla sed felis tempus, eu euismod sem laoreet. Nulla feugiat orci non augue lacinia gravida. Nam non imperdiet leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan dui non ipsum fringilla iaculis. Pellentesque id venenatis sapien. Sed nec ex magna. Fusce venenatis congue interdum. In lacus ex, porttitor vel lacinia a, pellentesque a diam. Curabitur at odio et odio varius iaculis. Cras auctor id lorem nec dignissim. Duis pulvinar elit non turpis efficitur sagittis. Sed vehicula, tortor non varius sollicitudin, ex nibh vestibulum lacus, a posuere erat mauris quis lacus.

            Duis nulla arcu, scelerisque nec ante a, ultricies vehicula risus. Etiam posuere ligula sit amet volutpat accumsan. In euismod tristique finibus. Donec hendrerit posuere enim, et pellentesque nisl vulputate quis. Sed sit amet lobortis ipsum, at auctor dolor. Proin sed ultricies mauris. Donec dapibus, nunc et aliquet maximus, nunc metus maximus lorem, eget facilisis dui enim sed turpis. Donec ac ultricies velit, aliquam cursus nisl. Donec convallis tempor tellus a aliquet. Ut a neque vel arcu feugiat rutrum a sit amet enim. Etiam posuere euismod lectus, sit amet dictum nunc bibendum et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ut blandit justo.

            Suspendisse convallis non felis et tempus. Vestibulum finibus tempus nibh, ut dictum odio laoreet rutrum. Ut ac suscipit massa, et mollis nisi. Mauris id venenatis nulla. Donec vitae augue ac nibh malesuada aliquet at vel ligula. Aenean dui leo, sodales ac venenatis quis, cursus ut magna. Morbi malesuada turpis a ultrices bibendum.

            Sed elit ligula, condimentum in blandit sit amet, hendrerit quis quam. Proin sagittis diam quis orci tincidunt, et blandit ante tincidunt. Mauris condimentum, mauris a aliquam malesuada, odio elit efficitur metus, sit amet interdum nisl est vel mi. Aliquam erat volutpat. Vestibulum congue nulla sed nisl fermentum, vel ultrices augue cursus. Nullam in convallis est. Pellentesque imperdiet orci vitae dui suscipit, sit amet dignissim est luctus. Duis vitae risus rhoncus, congue magna eget, mollis ligula. Sed gravida, tellus auctor ornare lobortis, nulla odio bibendum nisl, in consequat orci enim eu ante. Nam aliquet, mi at aliquam imperdiet, lacus libero fringilla elit, ut convallis neque tellus nec magna. Mauris vehicula eros nisl, nec egestas enim malesuada nec.
             </div>
              
              
              

            </div>
            <div class="modal-footer">             
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>              
            </div>
          </div>
        </div>
      </div>
    </nav>    

      <div className="container text-center pt-3">     

        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Referencia de la planta
                </h5>            
                
                <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" id="message" name="message" value={reference}
                  autoComplete="off" onChange={(event) => setReference(event.target.value)} />
                <div className="input-group-append">
                  <button type="button" id="button-addon2" onClick={
                    (event) => {
                      event.preventDefault();
                      let aux = parseFloat(reference);
                      if ((!isNaN(aux)) ) {
                        if(aux >= -10.0 && aux <= 10.0){
                          socket.emit('/v1.0/iot-control/set_reference', {
                            message: Math.round(((4095/20)*aux) + (2048))
                          });
                        }else{
                          alert("El valor de la referencia debe estar entre -10.0 y 10.0 V");
                        }
                      }else {
                        alert("El valor ingresado debe ser numérico");
                      }
                  }}  className="btb btn-dark">Referencia</button>
                </div>              

                <h5 className="card-title pt-3 mx-auto">
                  Parámetros del controlador
                </h5>

                <div className="input-group flex-nowrap">                  
                  <input type="text" className="form-control" placeholder="Kp" aria-label="Username" aria-describedby="addon-wrapping" onChange={(event) => setKc(event.target.value)} />                 
                  
                  <input type="text" className="form-control" placeholder="𝜏ᵢ" aria-label="Username" aria-describedby="addon-wrapping" onChange={(event) => setTau_i(event.target.value)} />
                  
                  <input type="text" className="form-control" placeholder="𝜏d" aria-label="Username" aria-describedby="addon-wrapping" onChange={(event) => setTau_d(event.target.value)} />

                  <div className="input-group-prepend">
                  <button type="button" id="button-addon2" onClick={(event) => {
                    event.preventDefault();
                    let aux_kc = parseFloat(kc);
                    let aux_tau_i = parseFloat(tau_i);
                    let aux_tau_d = parseFloat(tau_d);
                    if ((!isNaN(aux_kc)) && (!isNaN(aux_tau_i)) && (!isNaN(aux_tau_d)) ) {
                      socket.emit('/v1.0/iot-control/set_controller_parameters', {
                        kc: aux_kc,
                        tau_i: aux_tau_i,
                        tau_d: aux_tau_d
                      });                    
                    }else {
                      alert("Todos los parámetros del controlador deben ser numéricos.");
                    }

                  }}  className="btb btn-dark">Establecer</button>
                  </div>

                </div>

                <h5 className="card-title pt-3 mx-auto mt-2">Visualización de la planta </h5>

               <iframe  title='video' style={{maxWidth:640, width:'100%', height:310, overflow:'auto'}} src="http://eieela.univalle.edu.co:5024" frameborder="0" />

              </div>               
                
              </div>
            </div>
          </div>

          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                
              <div className="row text-center">
                <div className="col-sm-4 mx-auto">
                  
                  <button className="btn btn-dark mr-6 mb-3" onClick={() => {                      
                      socket.emit('/v1.0/iot-control/set_closed_loop', {
                        message: 'Closed Loop'
                      });
                      socket.emit('/v1.0/iot-control/get_closed_loop', {message: 'Closed Loop'});
                      }}>
                    {cerrarLazo ? "Abrir Lazo" : "Cerrar Lazo"} 
                    </button>
                </div>
                  <div className="col-sm-4 mx-auto text-right">                  
                    <p className='mr-6'>Salida de la planta: {data} V</p>
                      <button className="btn btn-dark mr-6 mb-3" onClick={() => {                        
                          if (!start) {
                            startTransmission();
                          }
                          else {
                            stopTransmission();
                          }
                        }}>
                        {start ? <FontAwesomeIcon icon={faStop} /> : <FontAwesomeIcon icon={faPlay} />} 
                      </button>
                  </div>
              </div>

                <Plot
                  useResizeHandler={true}
                  data={[
                    {
                      y: plantaIn,
                      type: "line",
                      name: 'Entrada'
                    },
                    
                    {
                      y: plantaOut,
                      type: "line",
                      name: 'Salida'
                    },
                    {
                      y: muK,
                      type: "line",
                      name: 'Esfuerzo de control'
                    }

                  ]}
                  layout={{
                    width: "50%",
                    height: "50%",
                    title: "Respuesta de la planta",
                    xaxis: {
                      title: "Tiempo (x 0.01 s)",
                      titlefont: {                        
                        size: 15,
                        color: "#7f7f7f"
                      }},
                    yaxis: {
                      range: [-10, 10],
                      title: "Tensión (V)",
                      titlefont: {                        
                        size: 15,
                        color: "#7f7f7f"
                      }}            
                  }}
                />
              </div>
            </div>
          </div>
        </div>       

        <div className="card-deck pt-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Relevador 1</h5>
              <p className="card-text">
                El relevador se encuentra{" "}
                {relay_1 === 0 ? " apagado" : " encendido"}
              </p>
              <button
                onClick={() => {
                  socket.emit("/v1.0/iot-control/change_relay", {
                    message: "1",
                  });
                  socket.on("/v1.0/iot-control/get_status_relay", (res) => {
                    setRelay_1(res.status_relay_1);
                  });
                }}
                className="btn btn-dark"
              >
                {relay_1 === 0 ? "Encender" : "Apagar"}
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Relevador 2</h5>
              <p className="card-text">
                El relevador se encuentra{" "}
                {relay_2 === 0 ? " apagado" : " encendido"}
              </p>
              <button
                onClick={() => {
                  socket.emit("/v1.0/iot-control/change_relay", {
                    message: "2",
                  });
                  socket.on("/v1.0/iot-control/get_status_relay", (res) => {
                    setRelay_2(res.status_relay_2);
                  });
                }}
                className="btn btn-dark"
              >
                {relay_2 === 0 ? "Encender" : "Apagar"}
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Relevador 3</h5>
              <p className="card-text">
                El relevador se encuentra{" "}
                {relay_3 === 0 ? " apagado" : " encendido"}
              </p>
              <button
                onClick={() => {
                  socket.emit("/v1.0/iot-control/change_relay", {
                    message: "3",
                  });
                  socket.on("/v1.0/iot-control/get_status_relay", (res) => {
                    setRelay_3(res.status_relay_3);
                  });
                }}
                className="btn btn-dark"
              >
                {relay_3 === 0 ? "Encender" : "Apagar"}
              </button>
            </div>
          </div>
        </div>
      </div>
      

    </>
  );

  
    
  }

export default App;
