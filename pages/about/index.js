import Link from 'next/link'

export function About() {
    return ( 
        <div>
            <h1>This is About page</h1>
            Go to <Link href="/home"><a> Home!</a></Link>
        </div>
    )
}

export default About;