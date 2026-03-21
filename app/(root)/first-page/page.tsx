import { 
    Container, 
    Header, 
    HeroSection, 
    HowItWorksSection, 
    AdvantagesSection,
    FeaturesSection,
    Footer } from "@/shared/components/shared/first-page/index";


export function FirstPage() {

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