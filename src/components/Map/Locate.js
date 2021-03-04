import React from 'react'
function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
        document.getElementById('auto_focus').focus();
      }}
    >
      <img src="/current-location.svg" alt="myLocation" />
    </button>
  );
}
  export default Locate
  