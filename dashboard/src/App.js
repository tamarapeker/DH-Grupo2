import './App.css';
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import PageContent from './components/PageContent'
import Footer from './components/Footer'

function App() {
  return (
    <div id="wrapper">
      <Sidebar/>
      <div id="content-wrapper" className="d-flex flex-column">
			  <div id="content">
         <Topbar/>
          <PageContent/>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
