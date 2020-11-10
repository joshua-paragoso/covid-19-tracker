import React from 'react';
import numeral from 'numeral';
import "./Table.css"
function Table({countries}) {
    return (
        <div className="table">
            {/*for every country, split the country */}
            {countries.map(({country,cases}) => (
               <tr>
                   <td>{country}</td>
                   <td>
                    <strong>
                        {/* {cases} */}
                        {numeral(cases).format("0,0")}
                    </strong>
                   </td>
               </tr>
            ))}
        </div>
    )
}
export default Table;
