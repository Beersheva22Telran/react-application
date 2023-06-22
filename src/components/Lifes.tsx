import { useEffect } from "react";
import { useSelectorDirection } from "../redux/store"
import { useDispatch } from "react-redux";
import { countActions } from "../redux/slices/lifesCountSlice";
import LifeGame from "./LifeGame";

const Lifes: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(countActions.setCount(5));
    }, [])
    const flexDirection = useSelectorDirection();
    return <section style={{display: 'flex', flexDirection,alignItems: 'center',
     justifyContent: 'space-around', height: '100vh'}}>
            <LifeGame/><LifeGame/><LifeGame/><LifeGame/><LifeGame/>
    </section>
}
export default Lifes;