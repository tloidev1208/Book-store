
import Table from "./table/table";
const Page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Tất cả người dùng</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <Table />
      </div>
    </section>
  );
};

export default Page;