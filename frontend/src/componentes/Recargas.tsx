import {  useEffect, useState } from "react";

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

    async function CompraTX(e) {
        e.preventDefault();

        const request = await fetch("http://localhost:3000/buy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(DatosCompra)
        });

        const datos = await request.json();

        setTransaccion(datos)
    }

    useEffect(() => {

        async function obtenerSuppliers() {

            const response = await fetch(
                "http://localhost:3000/getSuppliers"
            );

            const datos = await response.json();
            console.log(response)

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
                        Comprar
                    </button>


                </form>
            )}
            {transaccion.transactionalID && (
                <div> <div>
                    <h2>Recarga Exitosa</h2>
                    <p>{transaccion.message}</p>
                    <p>{transaccion.cellPhone}</p>
                    <p>{transaccion.value}</p>
                    <p>{transaccion.transactionalID}</p>
                    <p></p>
                </div>

                    <button>Continuar</button>
                </div>
            )}


            

        

        </>
    );
}