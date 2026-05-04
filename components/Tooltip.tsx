'use client'
import { useState } from 'react'

export default function Tooltip({ text, children }) {

  const [show, setShow] = useState(false)

  return (
    <span
      style={{ position:'relative', cursor:'help' }}
      onMouseEnter={()=>setShow(true)}
      onMouseLeave={()=>setShow(false)}
    >

      {children}

      {show && (
        <div style={tooltip}>
          {text}
        </div>
      )}

    </span>
  )
}

const tooltip = {
  position:'absolute',
  bottom:'120%',
  left:0,
  background:'#0f172a',
  color:'#fff',
  padding:'8px 10px',
  borderRadius:6,
  fontSize:12,
  whiteSpace:'nowrap',
  boxShadow:'0 4px 12px rgba(0,0,0,0.4)',
  zIndex:1000
}
