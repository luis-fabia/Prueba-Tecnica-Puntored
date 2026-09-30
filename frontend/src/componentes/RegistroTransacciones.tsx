import { useState } from "react";

export function RegistroTransacciones() {

    const [allTransaccion, setAllTransaccion] = useState([]);
    const [mostrar, setMostrar] = useState(false);

    async function GetAllTransactions() {
        try {
            const resultado = await fetch(
                "http://localhost:3000/transactions"
            );

            const datos = await resultado.json();

            if (!resultado.ok) {
                throw new Error(
                    datos.message || "No fue posible obtener las transacciones"
                );
            }

            setAllTransaccion(datos);

        } catch (error) {
            console.error(error);
        }
    }

    function manejarTransacciones() {

        if (!mostrar) {
            GetAllTransactions();
        } else {
            setAllTransaccion([]);
        }

        setMostrar(!mostrar);
    }

    return (
        <div className="historial">

            <button className="btn-transacciones"onClick={manejarTransacciones}>
                {mostrar
                    ? "Ocultar transacciones"
                    : "Ver transacciones"
                }
            </button>

            {mostrar && (
                <div className="transacciones-contenedor">

                    <h2>Transacciones realizadas</h2>

                    {allTransaccion.length === 0 ? (
                        <p className="sin-transacciones">
                            No hay transacciones registradas.
                        </p>
                    ) : (

                        <div className="tabla-wrapper">

                            <table className="tabla-transacciones">

                                <thead>
                                    <tr>
                                        <th>Ticket</th>
                                        <th>Celular</th>
                                        <th>Valor</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {allTransaccion.map((valor) => (
                                        <tr key={valor.id}>

                                            <td>
                                                {valor.transactionalID}
                                            </td>

                                            <td>
                                                {valor.cellPhone}
                                            </td>

                                            <td>
                                                ${valor.value}
                                            </td>

                                            <td>
                                                {new Date(
                                                    valor.createdAt
                                                ).toLocaleString()}
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>
            )}

        </div>
    );
}