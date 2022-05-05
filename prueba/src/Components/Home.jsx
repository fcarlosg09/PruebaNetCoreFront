import React, {useState, useEffect} from 'react'
import { ModalVehiculo } from './ModalVehiculo'
import { Tabla } from './Tabla';


export const Home = () => {
  const [show, setshow] = useState(false);
  const [placa, setplaca] = useState('');
  const [marca, setmarca] = useState(0);
  const [modelo, setmodelo] = useState('');
  const [titular, settitular] = useState(0);
  const [puertas, setpuertas] = useState('');
  const [listadoMarcas, setlistadoMarcas] = useState([]);
  const [listadoTitulares, setlistadoTitulares] = useState([]);
  const [listadoVehiculos, setlistadoVehiculos] = useState([]);

  const Fn_AbrirModal = () =>{
    setplaca('');
    setmarca(0);
    setmodelo('');
    settitular(0);
    setpuertas('');
    FnConsultarMarcas();
    FnConsultarTitulares();
    setshow(true);
  }

  const FnConsultarVehiculos = () =>{
    fetch('https://localhost:7108/api/Vehiculos')
    .then(res => res.json())
    .then(data => {
        setlistadoVehiculos(data);
    })
    .catch(err => {
        console.log(err)
    })
  }

  const FnConsultarMarcas = () =>{
    fetch('https://localhost:7108/api/Marcas')
    .then(res => res.json())
    .then(data => {
        setlistadoMarcas(data);
    })
    .catch(err => {
        console.log(err)
    })
  }

  const FnConsultarTitulares = () =>{
    fetch('https://localhost:7108/api/Vehiculos/Usuarios')
    .then(res => res.json())
    .then(data => {
        setlistadoTitulares(data);
    })
    .catch(err => {
        console.log(err)
    })
  }

  return (
    <div className='container my-5'>
        <div className='row justify-content-center'>
            <div className='col-10'>
                <button 
                    className='btn btn-primary'
                    onClick={Fn_AbrirModal}
                >Crear vehículo</button>
                <Tabla listadoVehiculos={listadoVehiculos} FnConsultarVehiculos={FnConsultarVehiculos} />
            </div> 
        </div>

        <ModalVehiculo
            show={show}
            handleClose={()=>{setshow(false)}}
            placa={placa}
            setplaca={setplaca}
            marca={marca}
            setmarca={setmarca}
            modelo={modelo}
            setmodelo={setmodelo}
            titular={titular}
            settitular={settitular}
            puertas={puertas}
            setpuertas={setpuertas}
            listadoMarcas={listadoMarcas}
            listadoTitulares={listadoTitulares}
            FnConsultarVehiculos={FnConsultarVehiculos}
        />
    </div>
  )
}