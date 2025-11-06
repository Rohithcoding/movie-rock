import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
};

const AboutPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            About Me
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <p className="text-center text-lg text-gray-600">
              Rohith Kumar D
            </p>
            <p className="text-center text-gray-600">
              ISE Department
            </p>
            <p className="text-center text-gray-600">
              Bapuji Institute of Engineering and Technology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
