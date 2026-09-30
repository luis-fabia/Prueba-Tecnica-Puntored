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
    const [cargando, setcargando] = useState(false)

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
            setError("")

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

            <div className="contenedor__general">
                <main className="modulo-recargas">
                    <h1 className='Titulo'>Puntored</h1>

                    <h2>Recargas</h2>

                    <select
                        className="select-operador"
                        value={DatosCompra.supplierId}
                        onChange={(e) => {
                            setDatosCompra({
                                ...DatosCompra,
                                supplierId: e.target.value
                            });

                            setSeleccion(true);
                        }}
                    >
                        <option value="">Seleccionar operador</option>

                        {suppliers.map((valor) => (
                            <option key={valor.id} value={valor.id}>
                                {valor.name}
                            </option>
                        ))}
                    </select>

                    {seleccion && (
                        <form className="form-recarga" onSubmit={CompraTX}>

                            <input
                                className="input-recarga"
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
                                className="input-recarga"
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

                            <button className="btn-comprar" type="submit">
                                {cargando ? "Procesando" : "Comprar"}
                            </button>

                        </form>
                    )}
                </main>

                {error && (
                    <p className="mensaje-error">{error}</p>
                )}

                {ticket && (
                    <div className="modal-overlay">

                        <div className="ticket">

                            <h2>Recarga exitosa</h2>


                            <div className="ticket-dato">
                                <span>Celular</span>
                                <strong>{transaccion.cellPhone}</strong>
                            </div>

                            <div className="ticket-dato">
                                <span>Valor</span>
                                <strong>${transaccion.value}</strong>
                            </div>

                            <div className="ticket-dato">
                                <span>Ticket</span>
                                <strong>{transaccion.transactionalID}</strong>
                            </div>

                            <button
                                className="btn-continuar"
                                onClick={() => setTicket(false)}
                            >
                                Continuar
                            </button>

                        </div>

                    </div>
                )}

                <section className="seccion-transacciones">
                    <RegistroTransacciones />
                </section>

            </div>
        </>
    );
}