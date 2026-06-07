//App.tsx
import './App.css'
import LeftSideBar from './components/Card_LeftSideBar'
import RightSideBar from './components/Card_RightSideBar'
import Header from './components/Card_Header'
import Footer from './components/Card_Footer'
// import Middle from './components/Card_Middle'
import Middle_Home from "./components/Card_Middle_Home"

function App() {

  return (
    <>
      <div>
           {/* <LeftSideBar />    */}
           {/* <RightSideBar />  */}
           <Header />
           <Middle_Home />
           <Footer />
      </div>
     
    </>
  )
}

export default App