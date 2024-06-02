import React, { useEffect, useRef } from "react";

function KinoboxPlayer(value) {
  const containerRef = useRef(null);
  const kpId = value.value;

  useEffect(() => {
    if (containerRef.current) {
      window.kbox(containerRef.current, { search: { kinopoisk: kpId } });
    }
  }, [kpId]);

  return <div ref={containerRef} className="kinobox_player"></div>;
}

export default KinoboxPlayer;
