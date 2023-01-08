import { Fragment } from 'react';
import DronesSummary from "./DronesSummary";
import AvailableDrones from "./AvailableDrones";


const Drones = () => {
return (<Fragment>
<DronesSummary />
<AvailableDrones />
</Fragment>
);
};


export default Drones;