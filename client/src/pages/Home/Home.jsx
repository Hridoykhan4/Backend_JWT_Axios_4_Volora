import Banner from "../../components/Banner";
import MeetTheTeam from "../../components/MeetTheTeam";
import Reviews from "../../components/Reviews";
import VolunteerNeeds from "../../components/VolunteerNeeds";

const Home = () => {
  return (
    <section>
        <Banner></Banner>
        <VolunteerNeeds></VolunteerNeeds>
        <MeetTheTeam></MeetTheTeam>
        <Reviews></Reviews>
    </section>
  );
};

export default Home;
