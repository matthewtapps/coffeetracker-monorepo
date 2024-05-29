import { getDummyData } from "../../test/dummyData"
import { Charts } from "./charts"



export default function CoffeeDashboard() {
    return (
        <div>
            <Charts data={getDummyData()}/>
        </div>
    )
}
