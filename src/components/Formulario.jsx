import {useEffect,useState} from 'react'
import Error from "./Error"

const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {
   const [nombre,setNombre]=useState('')
   const [propietario,setPropietario]=useState('')
   const [email,setEmail]=useState('')
   const [alta,setAlta]=useState('')
   const [sintomas,setSintomas]=useState('')

   const[error, setError]=useState(false)
   
   useEffect(()=>{
     if(Object.keys(paciente).length>0){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setAlta(paciente.alta)
        setSintomas(paciente.sintomas)
     }
   },[paciente])

   const generarId=()=>{
      const random= Math.random().toString(36).substring(2);
      const fecha=Date.now().toString(36);

      return random+fecha;
   }
   const handleSubmit = (e) =>{
      e.preventDefault()
      
      if([nombre,propietario,email,alta,sintomas].includes('')){
         setError(true)
         return
      }
      setError(false)

      const objectPaciente={
         nombre,
         propietario,
         email,
         alta,
         sintomas
      }

      if(paciente.id){
         //editar paciente 
         objectPaciente.id=paciente.id
         const pacinetesActualizados=pacientes.map(
            pacienteState=>
            pacienteState.id===paciente.id ? objectPaciente: pacienteState
         )
         //guarda un nuevo arreglo de pacientes
         setPacientes(pacinetesActualizados)
         // se limpia set paciente 
         setPaciente({})
         
      }else{

         //nuevo registro
         objectPaciente.id=generarId()
         setPacientes([...pacientes,objectPaciente])
      }
      
      
       

      //limpiar el formulario
      setNombre("")
      setPropietario("")
      setEmail("")
      setAlta("")
      setSintomas("")
      
   }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5 my-10">
          <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>

          <p className="text-lg nt-5  text-center mb-10">
             Añade Pacientes y {''}
             <span className="text-indigo-600 font-bold">Administralo</span>
          </p>

          <form 
            onSubmit={handleSubmit}
            className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>

              {error && 
               <Error  mensaje={"Todos Los campos son obligatorios"}/>
              
              }

              <div className='mb-5'>
                  <label htmlFor='mascota' className="block text-gray-700 uppercase">Nombre Mascota</label>
                  <input 
                     id="mascota"
                     type="text"
                     placeholder="Nombre de la Mascota"
                     className="borde-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                     value={nombre}
                     onChange={(e)=>setNombre(e.target.value)}
                  />
              </div>

              <div className='mb-5'>
                  <label htmlFor='propietario' className="block text-gray-700 uppercase">Nombre Propietario</label>
                  <input 
                     id="propietario"
                     type="text"
                     placeholder="Nombre del propietario"
                     className="borde-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                     value={propietario}
                     onChange={(e)=>setPropietario(e.target.value)}
                  />
              </div>

              <div className='mb-5'>
                  <label htmlFor='email' className="block text-gray-700 uppercase">Email</label>
                  <input 
                     id="email"
                     type="email"
                     placeholder="email"
                     className="borde-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                  />
              </div>

              <div className='mb-5'>
                  <label htmlFor='alta' className="block text-gray-700 uppercase">Alta</label>
                  <input 
                     id="alta"
                     type="date"
                     className="borde-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                     value={alta}
                     onChange={(e)=>setAlta(e.target.value)}
                  />
              </div>
              

              <div className='mb-5'>
                  <label htmlFor='sintomas' className="block text-gray-700 uppercase">Sintomas</label>
                  <textarea 
                     id="sintomas"
                     className="borde-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                     placeholder='Describe los Sintomas'
                     value={sintomas}
                     onChange={(e)=>setSintomas(e.target.value)}
                  />
              </div>


              <input 
                 type="submit"
                 className="bg-indigo-600 w-full p-3 hover:bg-indigo-700  cursor-pointer transition-all"
                 value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
              
              />

          </form>
    </div>
  )
}

export default Formulario
