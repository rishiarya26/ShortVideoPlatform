const CardRibbon = ({ribbonData})=>{
    const positionRibbon = {
        1:"label_top_left" ,
        2:"label_bottom_left",
        3:"label_bottom_right",
        4:"label_top_right"
     }
    return(
        ribbonData?.length > 0 && ribbonData?.map((item,id)=>(
            <div key={id} className={`${positionRibbon[item?.postion]} text-ellipsis flex justify-center overflow-hidden`} >{item?.label}</div>
            ))
    )
}

export default CardRibbon;