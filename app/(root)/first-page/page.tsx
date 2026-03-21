import { 
    Container, 
    Header, 
    HeroSection, 
    HowItWorksSection, 
    AdvantagesSection,
    FeaturesSection,
    Footer } from "@/shared/components/shared/first-page/index";


export default function FirstPage() {

    return (
        <Container>
            <Header/>
            <HeroSection/>

            <HowItWorksSection />

            <AdvantagesSection/>

            <FeaturesSection/>

            <Footer/>
            
        </Container>
    )
}