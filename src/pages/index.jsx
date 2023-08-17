import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import { DashboardInfo } from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import { fetchDataProduct } from "@/redux/slice/slice-products";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchDataProduct("/products"));
  }, [dispatch]);

  return (
    <section className="container mx-auto max-w-[1000px] mt-5 px-3">
      <Navbar />
      {token && role === "admin" ? (
        <DashboardInfo />
      ) : (
        <>
          <Carousel />
          <Card />
        </>
      )}
    </section>
  );
}
