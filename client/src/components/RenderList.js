import React from 'react'

const RenderList = ({selectId, objects, onChange}) => {
    return(
        <select key={selectId} onChange={onChange}>
            {objects.map(obj => {return (
                <option key={obj.id} value={obj.name}>{obj.name}</option>
            )
            })}
        </select>
    )
}

export default RenderList;