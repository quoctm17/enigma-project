import CallList from "../_components/CallList";

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-enm-main-text">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 via-pink-400 to-pink-400 inline-block text-transparent bg-clip-text">Upcoming Meeting</h1>

      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage;