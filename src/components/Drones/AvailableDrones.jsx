import classes from './AvailableDrones.module.scss'
import Card from '../UI/Card';
import DroneItem from './DroneItem/DroneItem';
import {useEffect, useState} from 'react';


const AvailableDrones = () => {

    const [drones, setDrones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(()=>{

        const fetchDrones = async () => {
        const response = await fetch('https://ecommerce-e3d5d-default-rtdb.europe-west1.firebasedatabase.app/Drones.json');

        if(!response.ok) {
            throw new Error('Something went wrong!');
        }



        const responseData = await response.json();

        const loadedDrones = [];

        for(const key in responseData) {
            loadedDrones.push({
                id: key,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price
            })
        }
        setDrones(loadedDrones);
        setIsLoading(false);
        }

        fetchDrones().catch((error) => {
            setIsLoading(false);
    setHttpError(error.message)
        });
    },[])


    //showing loading state until the data loads.

    if(isLoading) {
        return <section className={classes.loading}>
            <p>Loading...</p>
        </section>
    }

    if(httpError) {
        return <section className={classes.loadingError}>
        <p>{httpError}</p>
    </section>
    }


    const dronesList = drones.map(drone => <DroneItem key={drone.id}
        id={drone.id}
        name={drone.name}
        description={drone.description}
        price={drone.price} />)
    return (
        <section className={classes.drones}>
            <Card>
                <ul>{dronesList}</ul>
            </Card>
        </section>

    );
};

export default AvailableDrones;