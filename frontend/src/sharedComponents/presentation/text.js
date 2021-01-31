import React from 'react'

const Text = ({ content=null, size="15px", color="white", Component=null , backgroundColor="transparent", weight="normal" }) => {

    const style={
       fontSize: size,
       color,
       backgroundColor,
       fontWeight: weight
    }

    return (
       content ? <p style={style}>{content}</p> : (
           <Component style={style} />
       )
    )
}

export default Text
