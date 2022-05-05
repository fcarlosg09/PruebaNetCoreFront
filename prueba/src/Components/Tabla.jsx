import React, {useEffect} from 'react'

export const Tabla = ({
    FnConsultarVehiculos,
    listadoVehiculos
}) => {

    useEffect(() => {
        FnConsultarVehiculos();
    }, [listadoVehiculos]);
    
  return (
    <table className='table table-striped my-5 text-center'>
        <thead>
            <tr>
                <th>Placa</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Titular</th>
                <th>Puertas</th>
            </tr>
        </thead>
        <tbody>
            {
                listadoVehiculos?.map(vehiculo => {
                    const {marcaNombre, modelo, placa, puertas, titular} = vehiculo;
                    return (
                        <tr key={placa}>
                            <td>{placa}</td>
                            <td>{marcaNombre}</td>
                            <td>{modelo}</td>
                            <td>{titular}</td>
                            <td>{puertas}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}
