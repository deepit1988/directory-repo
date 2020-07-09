//import '../../styles.css';
import Link from 'next/link';
import Layout from '../templates/Layout';


export function Home() {

    const handleBackButton = () => {

    }   

    return (
        <Layout>
            <h1 className= "px-6">Welcome to Home page</h1>
            Know <Link href="/about"><a> About us!</a></Link>
            <br />
            Sample Atom:
             
            <button className= "px-6 py-4" onClick={ handleBackButton }>
                <span className="px-6" > &lt; BACK </span>
            </button>
        </Layout>
    )
  }

export default Home;