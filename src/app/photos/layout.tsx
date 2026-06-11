import type { Metadata } from "next";
import PhotosHeader from "@/components/PhotosHeader";
import PhotosFooter from "@/components/PhotosFooter";

export const metadata: Metadata = {
  icons: { icon: "/icon-dark.png" },
};

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="wing wing--night">
      <PhotosHeader />
      <main>{children}</main>
      <PhotosFooter />
    </div>
  );
}
