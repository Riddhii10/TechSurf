import React, { useState, useEffect } from "react";
import { Image } from "../typescript/action";
import { getImages } from "../helper";

interface ImageType {
  uid: string;
  title: string;
  url: string;
  filename: string;
}

interface ImageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (image: ImageType) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getImages();
        console.log(response.status);
      const {assets} = await response.data;   
      console.log(assets);
      const imageAssets: ImageType[] = assets.map((asset: any) => ({
        uid: asset.uid,
        title: asset.title || asset.filename, // Use filename as fallback if title is empty
        url: asset.url,
        filename: asset.filename,
      }));

      setImages(imageAssets);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch images");
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  useEffect(() => {
    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Sample images - replace with your actual image data
//   const sampleImages: ImageType[] = [
//     {
//       uid: "img1",
//       title: "Sample Image 1",
//       url: "/api/placeholder/300/200",
//       filename: "sample1.jpg",
//     },
//     {
//       uid: "img2",
//       title: "Sample Image 2",
//       url: "/api/placeholder/300/200",
//       filename: "sample2.jpg",
//     },
//     // Add more sample images as needed
//   ];

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg w-[90%] max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Select Image</h2>
          <button 
            onClick={onClose}
            className="text-2xl p-2 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading images...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchImages}
                className="ml-4 text-blue-500 hover:text-blue-600"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.uid}
                  className="relative group cursor-pointer border rounded-lg overflow-hidden hover:border-blue-500 transition-all"
                  onClick={() => {
                    onSelect(image);
                    onClose();
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
                    <p className="text-white text-sm font-medium truncate">
                      {image.title}
                    </p>
                    <p className="text-white text-xs opacity-75 truncate">
                      {image.filename}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



// Modified renderImageEditor function to use the new ImageSelector
const renderImageEditor = (
  image: Image,
  path: string,
  handleChange: (path: string, value: any) => void
) => {
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);

  const handleImageSelect = (selectedImage: ImageType) => {
    handleChange(path, {
      uid: selectedImage.uid,
      title: selectedImage.title,
      url: selectedImage.url,
      filename: selectedImage.filename,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <h4 className="font-medium mb-2">Image</h4>
          {image?.url ? (
            <div className="relative group">
              <img
                src={image.url}
                alt={image.filename}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => setIsImageSelectorOpen(true)}
                  className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium"
                >
                  Change Image
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsImageSelectorOpen(true)}
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              Click to select image
            </button>
          )}
        </div>
      </div>

      <ImageSelector
        isOpen={isImageSelectorOpen}
        onClose={() => setIsImageSelectorOpen(false)}
        onSelect={handleImageSelect}
      />

      <div className="field-container">
        <label>Alt Text</label>
        <input
          type="text"
          value={image?.filename || ""}
          onChange={(e) => handleChange(`${path}.filename`, e.target.value)}
        />
      </div>
    </div>
  );
};

export { ImageSelector, renderImageEditor };
