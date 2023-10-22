/* eslint-disable react/prop-types */


function Notification({ message, type }) {
    
    // Set the notification color based on type
    let bgColor;
    switch(type) {
        case 'danger':
            bgColor = 'bg-red-500 text-white';
            break;
        case 'warning':
            bgColor = 'bg-yellow-500 text-black';
            break;
        case 'success':
            bgColor = 'bg-green-500 text-white';
            break;
        default:
            bgColor = 'bg-gray-500 text-white';
    }

   

    return (
        <div className={`fixed top-2 w-4/5 mx-auto left-1/2 transform -translate-x-1/2 p-4 z-50 rounded-lg ${bgColor}  border border-black`}>
            <h1 className="text-lg text-center font-bold">{message}</h1>
        </div>
    );
}

export default Notification;
