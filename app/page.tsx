import Image from "next/image";
import Navbar from "@/components/Navbar";
import Title from "@/components/Title";
import History from "@/components/History";
import Popular from "@/components/Popular";
import EventCarousel from "@/components/Section";
import VideoCard from "@/components/VideoCard";
import Contact from "@/components/Contact";
import TeamCarousel from "@/components/TeamCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-1 justify-center items-center">
        <Title />
      </div>
      <div className="">
        <History/>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <Popular/>
      </div>
      <div>
        <EventCarousel/>
      </div>
      {/*<div className="flex flex-1 justify-center items-center">
        <VideoCard/>
      </div>*/}
      <div className="flex flex-1 justify-center items-center">
        <Contact/>
      </div>
      <div>
        <TeamCarousel/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}