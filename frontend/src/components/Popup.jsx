
function Popup(props) {
  return (props.trigger) ? (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="bg-white p-2 rounded w-72 justify-between p-6">
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Site currently unavailable
        </h1>
        <p className="text-justify text-gray-700 mb-5">The AI model is currently unavailable! The cloud virtual machine bill was kinda getting me broke! 💸</p>
        
      </div>
    </div>
  ): "";
}

export default Popup;