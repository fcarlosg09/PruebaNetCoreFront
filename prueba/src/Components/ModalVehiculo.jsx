import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap';

export const ModalVehiculo = ({
    show,
    handleClose,
    placa,
    setplaca,
    marca,
    setmarca,
    modelo,
    setmodelo,
    titular,
    settitular,
    puertas,
    setpuertas,
    listadoMarcas,
    listadoTitulares,
    FnConsultarVehiculos
}) => {
  const Fn_CrearVehiculo = () =>{

    if(placa?.length == 0)
    {
      alert('Por favor diligencia la placa');
      return;
    }

    if(marca == 0)
    {
      alert('Por favor selecciona la marca');
      return;
    }

    if(modelo?.length == 0)
    {
      alert('Por favor diligencia el modelo');
      return;
    }

    if(titular == 0)
    {
      alert('Por favor selecciona el titular');
      return;
    }

    if(puertas?.length == 0)
    {
      alert('Por favor diligencia la cantidad de puertas');
      return;
    }

    fetch('https://localhost:7108/api/Vehiculos',
    {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        placa: placa,
        marca: marca,
        modelo: modelo,
        puertas: puertas,
        titular: titular
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data?.mensaje == 'Se creó el vehículo correctamente')
      {
        FnConsultarVehiculos();  
        alert(data?.mensaje);
        handleClose();
      }
      else
      {
        alert(data?.mensaje);
      }
    })
    .catch(err => {
        alert(err)
    })
  }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Vehículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Placa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Placa"
              value={placa}
              onChange={(e)=>setplaca(e.target.value)}  
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Select value={marca} onChange={(e)=>setmarca(e.target.value)}>
              <option value={0}>Selecciona una</option>
              {
                listadoMarcas?.map(marca => (
                  <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                ))
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Modelo"
              value={modelo}
              onChange={(e)=>setmodelo(e.target.value)}  
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Titular</Form.Label>
            <Form.Select value={titular} onChange={(e)=> settitular(e.target.value)}>
              <option value={0} key={0}>Selecciona uno</option>
              {
                listadoTitulares?.map(titular => (
                  <option key={titular.nombre} value={titular.nombre}>{titular.nombre}</option>
                ))
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Puertas</Form.Label>
            <Form.Control
              type="text"
              placeholder="Puertas"
              value={puertas}
              onChange={(e)=>setpuertas(e.target.value)}  
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={Fn_CrearVehiculo}>
            Guardar
          </Button>
        </Modal.Footer>
    </Modal>
  )
}