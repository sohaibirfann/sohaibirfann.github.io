import PhotosHeader from "@/components/PhotosHeader";
import PhotosFooter from "@/components/PhotosFooter";

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
