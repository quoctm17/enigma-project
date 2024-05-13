import CallList from "../_components/CallList";

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-enm-main-text">
      <h1 className="text-3xl font-bold">Recordings</h1>

      <CallList type="recordings" />
    </section>
  );
};

export default PreviousPage;