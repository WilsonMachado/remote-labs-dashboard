import React, { useState, useEffect} from 'react';
import io from 'socket.io-client';
import Plot from 'react-plotly.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

import Navbar from './components/Navbar';
const socket = io.connect('http://192.168.1.100:5001');

function App() {  

  const [data, setData] = useState(0.0);
  const [referencia, setReferencia] = useState([]);
  
  const [relay_1, setRelay_1] = useState(0);
  const [relay_2, setRelay_2] = useState(0);
  const [relay_3, setRelay_3] = useState(0);

  const [start, setStart] = useState(false);

  const [reference, setReference] = useState('');

  // 1. listen for data from the server (Raspberry Pi)
  useEffect(() => {
    socket.on('/v1.0/iot-control/get_status_controller', (res) => {
      setReferencia(currentData => [...currentData, res.adc_value]);
      setData(res.adc_value);
      setStart(res.transmition_status);
    });   
  }, []);

  

  const startTransmission = () => {
    socket.emit('/v1.0/iot-control/get_status_controller', {
      message: 'Iniciando transmisición'});      
  }

  const stopTransmission = () => {
    socket.emit('/v1.0/iot-control/stop_get_status_controller', {
      message: 'Deteniendo transmisición'
    });
  }

  return (
    <>
      <Navbar />     

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
                  <input type="text" className="form-control" placeholder="Kp" aria-label="Username" aria-describedby="addon-wrapping" />                 
                  
                  <input type="text" className="form-control" placeholder="Ki" aria-label="Username" aria-describedby="addon-wrapping" />
                  
                  <input type="text" className="form-control" placeholder="Kd" aria-label="Username" aria-describedby="addon-wrapping" />
                  <div className="input-group-prepend">
                  <button type="button" id="button-addon2" onClick={() => {console.log("Melo")}}  className="btb btn-dark">Establecer</button>
                  </div>

                </div>

                <h5 className="card-title pt-3 mx-auto">Visualización de la planta </h5>

                <img className='mx-auto' alt="" src="http://192.168.1.100:5000/video" width={300} height={275} />

              </div>               
                
              </div>
            </div>
          </div>

          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                
              <div className="row text-right">
                <div className="col-sm-4 mx-auto">
                  <p>Salida de la planta: {data} V</p>
                </div>
                <div className="col-sm-4 mx-auto">
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
                      y: referencia,
                      type: "line",
                    },
                  ]}
                  layout={{
                    width: "50%",
                    height: "50%",
                    title: "Respuesta de la planta",
                    xaxis: {
                      title: "Tiempo (x 0.1 s)",
                      titlefont: {                        
                        size: 15,
                        color: "#7f7f7f"
                      }},
                    yaxis: {
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
