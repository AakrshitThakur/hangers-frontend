import { Trash2 } from "lucide-react";
import type { SetStateAction } from "react";

interface PreviewFormImagesProps<T1, T2, T3> {
  id: string;
  name: string;
  url: string;
  set: {
    setPreviewFiles: React.Dispatch<SetStateAction<T1>>;
    setFormData: React.Dispatch<SetStateAction<T2>>;
    setPublicIds?: React.Dispatch<SetStateAction<T3>>;
  };
}

function PreviewFormImages<T1, T2, T3 = string[]>(
  props: PreviewFormImagesProps<T1, T2, T3>
) {
  // delete file from states
  function deleteFile() {
    props.set.setPreviewFiles((curr: T1) => {
      if (Array.isArray(curr)) {
        return curr.filter((f) => props.id !== f.id) as T1;
      }
      return curr;
    });
    props.set.setFormData((curr: T2) => {
      if (Array.isArray((curr as any).clothImages)) {
        return {
          ...curr,
          clothImages: (curr as any).clothImages.filter(
            (f: any) => f.lastModified.toString() !== props.id
          ) as T2,
        };
      }
      return curr;
    });
    // this set is called for updation operation
    props.set.setPublicIds &&
      props.set.setPublicIds((curr: T3) => {
        if (Array.isArray(curr as T3)) {
          return (curr as any).filter((p: string) => p !== props.id);
        }
        return curr;
      });
  }
  return (
    <section
      id="priview-form-images"
      className="relative color-info color-info-content w-full p-1 rounded-lg flex justify-between"
    >
      <div className="flex justify-center items-center gap-1">
        <img
          src={props.url}
          className="w-10 aspect-[9/12] rounded-md object-cover"
          alt="Preview selected cloth-images"
        />
        <p className="text-base">{props.name}</p>
      </div>
      <span
        className="absolute top-1 right-1 cursor-pointer"
        onClick={deleteFile}
      >
        <Trash2 strokeWidth={1.25} className="w-4 h-4 text-red-600" />
      </span>
    </section>
  );
}

export default PreviewFormImages;
