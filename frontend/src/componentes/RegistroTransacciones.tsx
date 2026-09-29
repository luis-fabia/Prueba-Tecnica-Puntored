import { useEffect, useState } from "react";

export function RegistroTransacciones({ transaccion }) {

    const [allTransaccion, setAllTransaccion] = useState([]);

    useEffect(() => {

        async function GetAllTransactions() {

            const resultado = await fetch(
                "http://localhost:3000/transactions"
            );

            const datos = await resultado.json();

            setAllTransaccion(datos);
        }

        GetAllTransactions();

    }, [transaccion]);

    return (
        <>
            {allTransaccion.map((valor) => (
                <div key={valor.id}>

                    <div>
                        <h2>Ticket</h2>
                        <p>{valor.transactionalID}</p>
                    </div>

                    <div>
                        <h2>Celular</h2>
                        <p>{valor.cellPhone}</p>
                    </div>

                    <div>
                        <h2>Valor</h2>
                        <p>{valor.value}</p>
                    </div>

                    <div>
                        <h2>Realizada</h2>
                        <p>{valor.createdAt}</p>
                    </div>

                </div>
            ))}
        </>
    );
}