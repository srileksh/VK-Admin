"use client"
export default function createModules() {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">

        {/* Title */}
        <h2 className="text-lg font-semibold mb-6">Create modules</h2>

        {/* Upload promo video */}
        <div className="flex justify-between items-center border rounded-lg px-4 py-3 mb-6">
          <span className="text-sm text-gray-700">Upload promo video</span>
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-lg">
            +
          </div>
        </div>

        {/* Section */}
        <div className="   p-5 mb-6">

          {/* Section Header */}
          <div className="flex justify-between items-center border-b-1 mb-4">
            <div className="flex items-center gap-2 mb-2 ">
              <span className="text-sm font-medium ">Section 1</span>
              <span className="text-gray-400">✎</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
              −
            </div>
          </div>

          {/* Video title */}
           <label className="text-sm text-gray-700 block mb-1">
              Video title
            </label>
          <div className="mb-4 flex justify-between items-center ">
           
            <div className="">
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Title of the video"
                className="border rounded-lg px-4 py-2 "
              />
              <input
                type="text"
                placeholder="Short description"
                className="border rounded-lg px-4 py-2 "
              />
            </div>

             <div className="flex gap-6 items-start">

            {/* Video upload */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 border rounded flex items-center justify-center text-xs text-gray-400">
                No Video
              </div>
              <span className="text-sm text-gray-700">+ Upload Video</span>
            </div>

            {/* Upload status */}
            <div className="flex-1 text-center text-sm text-gray-400">
              Upload status
              <div className="border-b mt-1"></div>
              <div className="flex justify-center gap-6 mt-2">
                <span className="text-gray-500">Replace Video</span>
                <span className="text-gray-500">Remove Video</span>
              </div>
            </div>
            </div>
            </div>


             <div>
              <div className="w-32 h-20 bg-gray-300 rounded-lg flex flex-col items-center justify-center text-xs text-gray-700">
              Add thumbnail
              
            </div>
            <span className="text-[10px] mt-1 flex justify-center text-center">
                Resolution - X × X Px
              </span>
             </div>

          </div>

          {/* Video upload + thumbnail */}
         

            {/* Thumbnail
            */}
          

          {/* Add new video */}
         
        </div>
         <div className="mt-4 text-center text-sm text-gray-400">
            + Add new video
          </div>

        {/* Add new section */}
        <div className="flex justify-end mb-6">
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm">
            Add new Section
            <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              +
            </span>
          </button>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-center gap-6">
          <button className="bg-gray-300 px-12 py-3 rounded-xl text-gray-700">
            Cancel
          </button>
          <button className="bg-gray-700 px-12 py-3 rounded-xl text-white">
            Finish
          </button>
        </div>

      </div>
    </div>
  );
}
