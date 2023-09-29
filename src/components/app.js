import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApiComponent = () => {
    const [autos, setAutos] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [filterdResults, setfilterdResults] = useState([])


    useEffect(() => {
        async function cargarAutosApi() {
            try {
                const resp = await fetch('https://api-cars-jb0r.onrender.com/autos');
                //console.log(await resp.json())
                const data = await resp.json();
                setAutos(data.results)
                setIsLoaded(true);


            } catch (error) {
                setIsLoaded(true);
                setError(error);
            }
        }
        cargarAutosApi();
    }, [])

    const SearchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = autos.filter((item) => {
                return Object.values(item).join('').toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
            })
            setfilterdResults(filteredData)
        }
        else {
            setfilterdResults(autos)
        }


    }


    if (error) {
        return <>{error.message}</>
    } else if (!isLoaded) {
        return <><h2>Estamos Preparando Todo</h2></>
    } else {
        return (
            <div style={{ padding: 20 }}>
                Busca tu auto
                <div className='container'>
                    <input icon="search"
                        placeholder='Buscar..'
                        onChange={(e) => SearchItems(e.target.value)}
                    />
                </div>
                <div className="container">
                    <div className='row' style={{ padding: '2erm' }}>
                        {searchInput.length > 1 ? (
                            filterdResults.map((item) => {
                                return (
                                    <div className="col-md-4" key={item.auto}>
                                        <Card style={{ width: '18erm' }}>
                                            <Card.Img variant="top" src={item.imagen} alt={item.nombre}></Card.Img>
                                            <Card.Body>
                                                <Card.Title>Modelo:{item.nombre}</Card.Title>
                                                <Card.Text>${new Intl.NumberFormat('es-mx').format(item.precio)}</Card.Text>
                                                <Button variant="primary">Ver Detalle</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })

                        ) : (
                            autos.map((item) => {
                                return (
                                    <div className="col-md-4" key={item.auto}>
                                    <Card style={{ width: '18erm' }}>
                                        <Card.Img variant="top" src={item.imagen} alt={item.nombre}></Card.Img>
                                        <Card.Body>
                                            <Card.Title>Modelo:{item.nombre}</Card.Title>
                                            <Card.Text>${new Intl.NumberFormat('es-mx').format(item.precio)}</Card.Text>
                                            <Button variant="primary">Ver Detalle</Button>

                                        </Card.Body>
                                    </Card>
                                    </div>

                                )
                            })

                        )}

                    </div>

                </div>
            </div>
        )
    }
}

export default ApiComponent;