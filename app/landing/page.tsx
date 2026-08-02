import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import ProductPreview from "@/components/landing/ProductPreview";
import Pricing from "@/components/landing/Pricing";
import FinalCTA from "@/components/landing/FinalCTA";

export default function Landing(){

    return(

        <main>

            <HeroSection/>

            <HowItWorks/>

            <Benefits/>

            <ProductPreview/>

            <Pricing/>

            <FinalCTA/>

        </main>

    );

}
