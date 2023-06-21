import { useEffect } from "react";
import LifeGame from "./components/LifeGame";
import { useDispatch } from "react-redux";
import { getSize, sizeActions } from "./redux/slices/cellSizeSlice";


 const App: React.FC = () => {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    window.addEventListener('resize', () =>
     dispatch(sizeActions.setSize(getSize())))
  })
  return <div><LifeGame /> 
    </div>
}
export default App;