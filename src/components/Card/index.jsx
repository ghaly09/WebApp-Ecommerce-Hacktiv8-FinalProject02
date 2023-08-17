import Link from "next/link";
import { useSelector } from "react-redux";
import CardItem from "./CardItem";
import CardDetails from "../CardDetails";
import SkeletonCard from "../Skeleton/Card";

export default function Card({ type }) {
  const { data } = useSelector((state) => state.products);

  return (
    <div className="container mx-auto max-w-[1000px] mt-5">
      {type !== "shop" ? (
        <div className="flex justify-end mb-6">
          <Link href="/shop" className="text-lg font-semibold">
            {" "}
            See All
          </Link>
        </div>
      ) : (
        <></>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <SkeletonCard />
        {type === "shop"
          ? data?.map((item, index) => {
              return (
                <div key={index}>
                  <CardItem card={item} key={item?.id} />
                  <CardDetails data={item} key={index} />
                </div>
              );
            })
          : data?.slice(0, 8).map((item, index) => {
              return (
                <div key={index}>
                  <CardItem card={item} key={item?.id} />
                  <CardDetails data={item} key={index} />
                </div>
              );
            })}
      </div>
    </div>
  );
}
