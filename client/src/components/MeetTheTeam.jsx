import { Link } from "react-router-dom";

const MeetTheTeam = () => {
    return (
        <div style={{ backgroundImage: "url('https://i.ibb.co/6XGsRd8/A-photo-of-a-group-of-people-in-a-rehab-facility.jpg')" }} className="flex flex-col md:flex-row mt-2 max-w-[1600px] w-[100%] mx-auto bg-fixed bg-cover bg-no-repeat shadow-lg text-white">
            <div className="flex-1 space-y-4 py-12 md:py-32 px-8 md:px-20" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6))" }}>
                <h1 className="flex items-center gap-1"><p className="w-[60px] h-[2px] bg-[#00df9a]"></p>MEET THE TEAM</h1>
                <h1 className="text-5xl font-bold">Get To Know The <br /> Passionate Individuals <br />  Behind Organization.</h1>
                <p>Discover the faces and stories behind [Organization]. Learn about our team members backgrounds, expertise, and what inspires them to contribute to our cause.</p>
                <Link to={"/allVolunteers"} className="bg-[#00df9a] btn outline-none border-none text-black">Our Volunteer</Link>
            </div>
            <div className="flex-1"></div>
        </div>
    );
};

export default MeetTheTeam;