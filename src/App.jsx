import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoPacientes from './components/ListadoPacientes'
import Formulario from './components/Formulario'

function App() {
 
  const[pacientes, setPacientes]=useState([])
  const[paciente,setPaciente]=useState({})
  
  //se ejecuta solo una vez al cargar la pagina al tener [] vacio
  useEffect( ()=>{
    const obtenerLs= ()=>{
      //obtiene el pacientesLS de local storage y lo carga en setPacientes ,si no existe lo carga vacio
       const pacientesLS=JSON.parse(localStorage.getItem("pacienteslss"))??[];
       setPacientes(pacientesLS)      
     }      
     obtenerLs();
    },[])

  useEffect(()=>{
      localStorage.setItem('pacienteslss',JSON.stringify(pacientes));
    },[pacientes]);
    
    


  const eliminarPaciente =(id)=>{
    // filter es inmutable 
    const pacientesActulizados=pacientes.filter(paciente=> paciente.id !==id)
    setPacientes(pacientesActulizados)
  }

  return (
    <div className="container mx-auto mt-20">
     <Header />

      <div className="mt-12 md:flex">
        <Formulario 
         pacientes={pacientes}
         setPacientes={setPacientes}
         paciente={paciente}
         setPaciente={setPaciente}
        />
        <ListadoPacientes 
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
            />     
      </div>

    </div>
  )
}

export default App
