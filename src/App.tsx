

import './App.css'
import AllRoutes from './Routes/AllRoutes'
import './styles/index.css'
import HeroSection from "./components/HeroSection";
import TaskCategories from "./components/TaskCategories";
import Navbar from "./components/Navbar";
import Stats from "./Layout/Stats";
import Service from "./Layout/Service";
import TasksNearYou from "./components/TasksNearYou";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./Layout/Testimonials";
import Footer from "./components/Footer";


const App: React.FC = () => {

  return (
   
    

      <>
      <AllRoutes />
       <Navbar />
    <HeroSection />
    <TaskCategories />
    <HowItWorks />
    <Stats/>
    <Service />
  
  <TasksNearYou />
  
  <Testimonials/>
  <div className="min-h-screen flex flex-col justify-between">
    <Footer/>
</div>

      </>
          
      
    
  )
}

export default App
