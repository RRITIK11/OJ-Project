import Signup from '@/components/Signup'
import { Toaster } from 'react-hot-toast'

export default function SignupPage(){

  return (
    <div>
        <div><Toaster/></div>
        <Signup title = "Registor for AlgoGalaxy Account"/>
    </div>
  )
}