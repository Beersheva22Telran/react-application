import { NavLink, Outlet} from 'react-router-dom'
export type RouteType = {
    to: string, label: string
}
const Navigator: React.FC<{ routes: RouteType[] }> = ({routes}) => {
    
    return <div >
        <nav>
            <ul className="navigator-list">
                {routes.map(r => <li key={r.label} className="navigator-item">
                        <NavLink to={r.to}>{r.label}</NavLink>
                </li>)}
            </ul>
        </nav>
        <Outlet></Outlet>
    </div>
}
export default Navigator;