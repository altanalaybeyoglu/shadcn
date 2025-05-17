import DogPage from "@/components/Dogs";

const Homepage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <DogPage></DogPage>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        bbb
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        cccc
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">dddd</div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        eeee
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        ffff
      </div>
    </div>
  );
};

export default Homepage;
