//import '../../styles.css';
import Link from 'next/link';
import ImageGrid from '../../components/molecules/ImageGrid/index';
import Banner from '../../components/atoms/banner/index';
import Banner2 from '../../components/atoms/banner2/index';
import Search from '../../components/molecules/search/index';


export function Home() {

    const handleBackButton = () => {

    }

    return (
        <div>
            <h1 className="px-6">Welcome to Home page</h1>
            Know <Link href="/about"><a> About us!</a></Link>
            <br />
            Sample Atom:
            <section>
                <Search heading="Find a local florist for your wedding" />
            </section>
            <section>
                <Banner imageURL="static/images/banner1.png" alt="banner1" settings="w-1/2 absolute top-0 py-20 px-10"
                    heading="Let FTD Help You Find a Local Wedding Florist For Your Special Day"
                    content=" Wedding flowers can set the stage for your big day, so you’ll want to be sure you’re getting the best flowers from a local florist. But you’re probably wondering, “Where’s the best wedding florist near me?” Well, that’s where FTD comes in! Allow FTD to help you find the best local wedding florists in your area to make sure your big day is as beautiful and picture-perfect as you have always dreamed. From dramatic and bold to romantic and understated, the vision you have for your perfect wedding needs to be reflected in the wedding flowers on display in your ceremony, the wedding centerpieces, bridal bouquets, boutonnieres and everything else." />
            </section>
            <section class="mt-0">
                <Banner2 heading="The FTD Florist Satisfaction Guarantee" content="When you are ordering flowers online, it’s important to trust the florist’s work and quality. As professional FTD wedding florists, we guarantee  consumer satisfaction with every floral order sent through FTD for delivery and on all FTD branded products purchased from an FTD Member Florist." />
            </section>
            <section class="flex flex-row justify-around px-20 ">
                <ImageGrid class="w-1/2" />
                <ImageGrid class="w-1/2" />
                <ImageGrid class="w-1/2" />
                <ImageGrid class="w-1/2" />
            </section>
            <button className="px-6 py-4" onClick={handleBackButton}>
                <span className="px-6" > &lt; BACK </span>
            </button>
        </div>
    )
}

export default Home;