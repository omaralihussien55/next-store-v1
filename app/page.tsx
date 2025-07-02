import SectionBrands from "./_ui/home/SectionBrands";
import SectionCategory from "./_ui/home/SectionCategory";
import SectionProduct from "./_ui/home/SectionProduct";

export default function Home() {
  return (
    <div className="">
      <SectionProduct />
      <SectionCategory />
      <SectionBrands />
    </div>
  );
}
