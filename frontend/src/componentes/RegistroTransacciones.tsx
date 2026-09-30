import { useState } from "react";

export function RegistroTransacciones() {

    const [allTransaccion, setAllTransaccion] = useState([]);


    async function GetAllTransactions() {

        const resultado = await fetch(
            "http://localhost:3000/transactions"
        );

        const datos = await resultado.json();

        setAllTransaccion(datos);
    }



    return (
        <>

            {allTransaccion.map((valor) => (
                <div key={valor.id}>
                    <p>Ticket: {valor.transactionalID}</p>
                    <p>Celular: {valor.cellPhone}</p>
                    <p>Valor: {valor.value}</p>
                    <p>Fecha: {valor.createdAt}</p>
                </div>
            ))}

            <button onClick={GetAllTransactions}>Ver Transacciones</button>
        </>
    );
}