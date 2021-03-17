import React, { useState ,useEffect,useRef,createContext,useContext} from 'react'
import { Component } from 'react';

const Mycontext = createContext();

const ChildContext = () =>{
  let count= useContext(Mycontext);
  return(
    <h3>子组件接收父组件的值{count}</h3>
  )
}

const Index = () => {
  

  const inputEl = useRef(1)
  const save = useRef({name:"123"})

  const [count, setCount] = useState(0);
  const [obj, setObj] = useState({ name: "ycc" })
  const [arr, setarr] = useState([1, 2, 3]);
  const [func, setfunc] = useState(()=>{
    return [1,2,33242];
  })

  


  return (
    <>
    <Mycontext.Provider value={count}>
      <ChildContext></ChildContext>
    </Mycontext.Provider>
      <input type="text" ref={inputEl}/>
      <button onClick={()=>{console.log(inputEl.current.value)
      save.current.value=inputEl.current.value;
      console.log(save)
      }}>change</button>


      <h2>{count}</h2>
      <button onClick={() => { setCount(count + 1) }}>change</button>

      <h2>{obj.name}----{obj.age}</h2>
      <button onClick={() => {
        setObj({
          ...obj,
          age: "lisi"
        })
      }}>change</button>

      <h2>{arr}</h2>
      {/* 当state 的值为数组还是对象值都可更改 */}
      <button onClick={() => { setarr(() => { 
        arr.push(4);
        return [...arr]
      }) }}>change</button>

      <h2>{func}</h2>

    </>
  )
}
export default Index





