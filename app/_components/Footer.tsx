import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <div className="h-[280px] bg-indigo-500 flex mt-[71px] py-10">
      <div className="flex px-20 justify-between w-full">
        <div className="flex flex-col text-white gap-3">
          <img alt="logo" src="/Logo (1).png" className="h-5 w-[92px]" />
          <div className="text-sm">© 2024 Movie Z. All Rights Reserved.</div>
        </div>
        <div className="flex gap-24">
          <div className="flex flex-col text-sm text-white gap-3">
            <div className="">Contact Information</div>
            <div className="flex gap-3 items-center">
              <Mail />
              <div className="flex flex-col">
                <div className="">Email:</div>
                <div className="">support@movieZ.com</div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Phone />
              <div className="flex flex-col">
                <div className="">Phone:</div>
                <div className="">+976 (11) 123-4567</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-sm text-white gap-3">
            <div className="">Follow us </div>
            <div className="flex gap-3">
              <div className="">Facebook</div>
              <div className="">Instagram</div>
              <div className="">Twitter</div>
              <div className="">Youtube</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};