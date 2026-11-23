import { useState, useEffect } from "react"
import OpportunityCard from "../components/OpportunityCard"

function Opportunities (){
const [opportunities, setOpportunities] = useState([])
useEffect(() => {
async function fetchOpportunities() { const response = await fetch("https://devglobaljobs.com/api/v1/jobs?limit=100");

const data = await response.json();setOpportunities(data.jobs);}
fetchOpportunities();


}, [])
    return(<div>
    <h1>Explore Opportunities</h1>
    {opportunities.map((job) => (
  <OpportunityCard opportunity={job} />
))}</div>)
}
export default Opportunities