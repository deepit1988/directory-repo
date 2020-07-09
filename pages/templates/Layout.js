//import '../../styles.css';
import Header from '../../components/organisms/header';
import Footer from '../../components/organisms/footer';

export function Layout({ children }) {       

    return (
        <React.Fragment>

            <Header />                          
            <main className='' id='main-content'>{ children }</main>
            <Footer />

        </React.Fragment>
                    
    )
  }

export default Layout;