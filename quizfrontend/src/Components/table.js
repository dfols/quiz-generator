import React from 'react';

function table({ list, colNames, width = "auto", height = "auto"}) {
  return (
    <div style={{ width: "100%", boxShadow: "6px 6px 12px 6px black", fontSize: "1.6rem" }}>
        {list.length > 0 && (
            <table 
            cellSpacing="0" 
            style={{ width: "100%", height: height, padding: "10px 15px"}}
            >
                
                <thead style={{backgroundColor: "black", color: "white" }}>
                    <tr >
                        {colNames.map((headerItem, index) => (
                            <th key={index}>{headerItem.toUpperCase()}  </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.values(list).map((obj, index) => (
                   <tr key={index}>
                       {Object.values(obj).map((value, index2) => (
                           <td key={index2}>{value}</td>
                        
                       ))}
                   </tr>
                    ))}
                </tbody>
                <div className="creation-button-container">
                </div>
        </table>
        )}

        {list.length === 0 && (
            <table 
            cellSpacing="0" 
            style={{ width: "100%", height: height, padding: "10px 15px"}}
            >
                
                <thead style={{backgroundColor: "black", color: "white" }}>
                    <tr >
                        {colNames.map((headerItem, index) => (
                            <th key={index}>{headerItem.toUpperCase()}  </th>
                        ))}
                    </tr>
                </thead>
                
        </table>
        )}
    </div>
  )
}

export default table
