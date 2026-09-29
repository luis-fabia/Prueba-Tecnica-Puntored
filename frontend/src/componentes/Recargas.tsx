import React, { useEffect, useState } from "react";
import { RegistroTransacciones } from './RegistroTransacciones'

export default function ModuloRecargas() {

    const [seleccion, setSeleccion] = useState(false);

    const [suppliers, setSuppliers] = useState([]);

    const [DatosCompra, setDatosCompra] = useState({
        supplierId: "",
        cellPhone: "",
        value: 0
    });

    const [transaccion, setTransaccion] = useState({
        cellPhone: "",
        message: "",
        transactionalID: "",
        value: 0
    })

    const [ticket, setTicket] = useState(false)
    const [error, setError] = useState("")
    const [cargando , setcargando ] = useState(false)

    async function CompraTX(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setcargando(true)
            const request = await fetch("http://localhost:3000/buy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosCompra)
            });
            
            const datos = await request.json();
            if (!request.ok) {
                setError(datos.message || "No fue Posible realizar la Recarga")
                return;
            }


            setTransaccion(datos)
            setTicket(true)
            setDatosCompra({
                supplierId: "",
                cellPhone: "",
                value: 0
            });
            setcargando(false)

        }
        catch (errro) {
            setError("No fue posible comunicarse con el servidor")
        }

        
    }

    useEffect(() => {

        async function obtenerSuppliers() {

            const response = await fetch(
                "http://localhost:3000/getSuppliers"
            );
            const datos = await response.json();
            setSuppliers(datos);
        }

        obtenerSuppliers();

    }, []);

    return (
        <>
            <h2>Recargas</h2>

            <select
                value={DatosCompra.supplierId}
                onChange={(e) => {

                    setDatosCompra({
                        ...DatosCompra,
                        supplierId: e.target.value
                    });

                    setSeleccion(true);
                }}
            >

                <option value="">
                    Seleccionar operador
                </option>

                {suppliers.map((valor) => (
                    <option
                        key={valor.id}
                        value={valor.id}
                    >
                        {valor.name}
                    </option>
                ))}

            </select>

            {seleccion && (
                <form onSubmit={CompraTX}>

                    <input
                        type="text"
                        placeholder="Celular"
                        value={DatosCompra.cellPhone}
                        onChange={(e) =>
                            setDatosCompra({
                                ...DatosCompra,
                                cellPhone: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Valor"
                        value={DatosCompra.value || ""}
                        onChange={(e) =>
                            setDatosCompra({
                                ...DatosCompra,
                                value: Number(e.target.value)
                            })
                        }
                    />

                    <button type="submit">
                        {cargando  ? "Procesando" : "Comprar"}
                    </button>


                </form>
            )}

            {error && 
                <p>{error}</p>
            }

    
            {ticket && (
                <div> <div>
                    <h2>Recarga Exitosa</h2>
                    <p>{transaccion.message}</p>
                    <p>{transaccion.cellPhone}</p>
                    <p>{transaccion.value}</p>
                    <p>{transaccion.transactionalID}</p>
                    <p></p>
                </div>

                    <button onClick={() => setTicket(false)}>Continuar</button>
                </div>
            )}

            <RegistroTransacciones
                transaccion={transaccion}
            />




        </>
    );
}