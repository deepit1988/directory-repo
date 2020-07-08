
import Link from 'next/link'


export function Home() {

    const handleBackButton = () => {

    }
    return (
        <div>
            <h1>Welcome to Home page</h1>
            Know <Link href="/about"><a> About us!</a></Link>
            <br />
            Sample Atom:  
            <button className={ 'pdp-back-button' } onClick={ handleBackButton }>
                <span className={ 'test' }> &lt; BACK </span>
            </button>
        </div>
    )
  }

export default Home;