import Link from 'next/link'

export function Test() {
    return ( 
        <div>
            <h1>This is Test page</h1>
            Go to <Link href="/home"><a> Home!</a></Link>
        </div>
    )
}

export default Test;