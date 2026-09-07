import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LeftIntroComponent from '../components/HomePageComponent/leftIntroComponent'
import RightLoginComponent from '../components/HomePageComponent/rightLOginComponent'

function Home() {
  const navigate = useNavigate()

  const [role, setRole] = useState('owner')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    console.log('Login Data:', {
      role,
      email,
      password,
      remember,
    })

    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      {/* Main Content */}
      <div className="flex-1 flex items-stretch">
        <LeftIntroComponent />

        <RightLoginComponent
          role={role}
          setRole={setRole}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          remember={remember}
          setRemember={setRemember}
          handleSubmit={handleSubmit}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-5 flex-wrap px-8 py-4 border-t border-rule bg-paper-2 text-[11.5px] text-ink-soft">
        <a href="#" className="hover:text-stamp">
          Help
        </a>

        <span className="text-rule">•</span>

        <a href="#" className="hover:text-stamp">
          Privacy
        </a>

        <span className="text-rule">•</span>

        <a href="#" className="hover:text-stamp">
          Terms
        </a>
      </div>
    </div>
  )
}

export default Home