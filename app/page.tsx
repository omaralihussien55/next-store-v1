import Header from "./_ui/header/Header";
import SectionBrands from "./_ui/home/SectionBrands";
import SectionCategory from "./_ui/home/SectionCategory";
import SectionProduct from "./_ui/home/SectionProduct";

export default function Home() {
  return (
    <div className="">
      <Header />
      <SectionProduct />
      <SectionCategory />
      <SectionBrands />
    </div>
  );
}
