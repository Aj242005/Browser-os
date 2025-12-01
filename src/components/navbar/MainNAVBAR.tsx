import { useCallback } from "react"
import { useNavigate } from "react-router"


export const MainNavBar = () => {
    const navigator = useNavigate()
    return (
        <>
            <ul>
                <li><button className="font-bold" onClick={useCallback( () => {navigator('/home/finder')},[navigator])} >Finder</button></li>
                <li><button>File</button></li>
                <li><button>Edit</button></li>
                <li><button>View</button></li>
                <li><button>Go</button></li>
                <li><button>Window</button></li>
                <li><button>Help</button></li>
            </ul>
        </>
    )
}