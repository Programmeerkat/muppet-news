import { useParams } from "react-router-dom"

export default function News() {
    const { id } = useParams()
    return(
        <div>
            <p>News id: {id}</p>
        </div>
    )
}